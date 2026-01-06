#!/usr/bin/env python3
import argparse
import json
import os
import subprocess
import sys
import tarfile
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOOLS_DIR = ROOT / "tools"
DATA_DIR = ROOT / "data"

MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"
JRE_URL = "https://api.adoptium.net/v3/binary/latest/21/ga/mac/aarch64/jre/hotspot/normal/eclipse"


def download(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp, open(dest, "wb") as out:
        out.write(resp.read())


def load_manifest():
    with urllib.request.urlopen(MANIFEST_URL) as resp:
        return json.load(resp)


def find_java(jre_dir):
    for path in jre_dir.rglob("bin/java"):
        return path
    return None


def ensure_java(force):
    jre_dir = TOOLS_DIR / "jre"
    java_bin = find_java(jre_dir)
    if java_bin and not force:
        return java_bin

    archive = TOOLS_DIR / "jre.tar.gz"
    download(JRE_URL, archive)
    with tarfile.open(archive, "r:gz") as tar:
        tar.extractall(jre_dir)
    archive.unlink()

    java_bin = find_java(jre_dir)
    if not java_bin:
        raise RuntimeError("Java binary not found after extracting JRE.")
    return java_bin


def ensure_server(version, force):
    server_dir = TOOLS_DIR / "server"
    server_dir.mkdir(parents=True, exist_ok=True)
    server_jar = server_dir / "server.jar"

    if server_jar.exists() and not force:
        return server_jar

    manifest = load_manifest()
    version_info = next((v for v in manifest["versions"] if v["id"] == version), None)
    if not version_info:
        raise RuntimeError(f"Version {version} not found in manifest.")

    meta = json.load(urllib.request.urlopen(version_info["url"]))
    server_url = meta["downloads"]["server"]["url"]
    download(server_url, server_jar)
    return server_jar


def run_server_unpack(java_bin, server_jar, server_dir):
    subprocess.run(
        [str(java_bin), "-jar", str(server_jar), "--help"],
        cwd=str(server_dir),
        check=True,
    )


def build_classpath(server_dir, version):
    versioned = server_dir / "versions" / version / f"server-{version}.jar"
    jar = versioned if versioned.exists() else (server_dir / "server.jar")
    libs = list((server_dir / "libraries").rglob("*.jar"))
    if not libs:
        raise RuntimeError("Server libraries not found. Did the server unpack run?")
    classpath = os.pathsep.join([str(jar)] + [str(lib) for lib in libs])
    return classpath


def run_data_generator(java_bin, classpath, output_dir, server_dir):
    output_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            str(java_bin),
            "-cp",
            classpath,
            "net.minecraft.data.Main",
            "--reports",
            "--server",
            "--output",
            str(output_dir),
        ],
        cwd=str(server_dir),
        check=True,
    )


def run_python(script):
    subprocess.run([sys.executable, str(script)], cwd=str(ROOT), check=True)

def summarize_outputs():
    command_path = DATA_DIR / "java-official-commands.json"
    registry_path = DATA_DIR / "java-official-registries.json"
    wiki_path = DATA_DIR / "wiki-command-descriptions.json"

    if command_path.exists():
        with open(command_path, "r", encoding="utf-8") as handle:
            commands = json.load(handle)
        count = len(commands.get("commands", []))
        branches = sum(len(cmd.get("syntax", [])) for cmd in commands.get("commands", []))
        print(f"Java commands: {count} (branches: {branches})")

    if registry_path.exists():
        with open(registry_path, "r", encoding="utf-8") as handle:
            registries = json.load(handle)
        item_count = len(registries.get("items", []))
        block_count = len(registries.get("blocks", []))
        entity_count = len(registries.get("entities", []))
        print(f"Registries: {item_count} items, {block_count} blocks, {entity_count} entities")

    if wiki_path.exists():
        with open(wiki_path, "r", encoding="utf-8") as handle:
            wiki = json.load(handle)
        entry_count = len(wiki.get("entries", []))
        unique_count = len(wiki.get("lookup", {}))
        print(f"Wiki entries: {entry_count} (unique: {unique_count})")


def main():
    parser = argparse.ArgumentParser(description="Download Java + server jar and generate Mojang data snapshots.")
    parser.add_argument("--version", help="Minecraft version (default: latest release)")
    parser.add_argument("--force", action="store_true", help="Re-download Java/server even if present")
    args = parser.parse_args()

    manifest = load_manifest()
    version = args.version or manifest["latest"]["release"]

    java_bin = ensure_java(args.force)
    server_jar = ensure_server(version, args.force)

    server_dir = TOOLS_DIR / "server"
    run_server_unpack(java_bin, server_jar, server_dir)

    classpath = build_classpath(server_dir, version)
    output_dir = DATA_DIR / f"mojang-{version}"
    run_data_generator(java_bin, classpath, output_dir, server_dir)

    run_python(ROOT / "scripts" / "build_mojang_snapshot.py")
    run_python(ROOT / "scripts" / "fetch_mc_data.py")

    print("Generated Mojang reports and refreshed snapshots.")
    print("Reports:", output_dir / "reports")
    print("Snapshots:", DATA_DIR / "java-official-commands.json")
    summarize_outputs()


if __name__ == "__main__":
    main()
