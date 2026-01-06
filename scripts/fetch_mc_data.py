#!/usr/bin/env python3
import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"
PRISMARINE_DATA_PATHS = "https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/dataPaths.json"
WIKI_COMMANDS_URL = "https://minecraft.wiki/w/Commands"


def fetch_json(url):
    with urllib.request.urlopen(url) as resp:
        return json.load(resp)


def pick_latest_prismarine_version():
    data_paths = fetch_json(PRISMARINE_DATA_PATHS)
    versions = []
    for key in data_paths.get("pc", {}):
        if re.match(r"^\d+\.\d+(?:\.\d+)?$", key):
            parts = tuple(int(p) for p in key.split("."))
            versions.append((parts, key))
    if not versions:
        raise RuntimeError("No stable pc versions found in Prismarine dataPaths.")
    versions.sort()
    return versions[-1][1]


def fetch_prismarine_file(version, filename):
    url = f"https://raw.githubusercontent.com/PrismarineJS/minecraft-data/master/data/pc/{version}/{filename}"
    with urllib.request.urlopen(url) as resp:
        return json.load(resp)


def normalize_namespace(name):
    if name.startswith("minecraft:"):
        return name
    return f"minecraft:{name}"


def build_registries(version):
    items = fetch_prismarine_file(version, "items.json")
    entities = fetch_prismarine_file(version, "entities.json")

    item_rows = []
    for item in items:
        item_rows.append({
            "id": normalize_namespace(item["name"]),
            "displayName": item.get("displayName", item["name"]),
            "stackSize": item.get("stackSize"),
        })

    entity_rows = []
    for entity in entities:
        entity_rows.append({
            "id": normalize_namespace(entity["name"]),
            "displayName": entity.get("displayName", entity["name"]),
            "category": entity.get("category"),
            "type": entity.get("type"),
        })

    return {
        "version": version,
        "source": "PrismarineJS minecraft-data",
        "items": item_rows,
        "entities": entity_rows,
    }


def strip_tags(value):
    text = re.sub(r"<br\s*/?>", "\n", value)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\[\d+\]", "", text)
    return " ".join(text.replace("\xa0", " ").split())


def extract_wiki_commands(html):
    tables = re.findall(r"<table class=\"wikitable[\s\S]*?</table>", html)
    entries = []

    for idx, table in enumerate(tables):
        headers = re.findall(r"<th[^>]*>(.*?)</th>", table, flags=re.S)
        headers = [strip_tags(h) for h in headers]
        if "Command" not in headers or "Description" not in headers:
            continue
        edition = "unknown"
        header_set = {h.lower() for h in headers}
        if "be" in header_set or "edu" in header_set:
            edition = "bedrock"
        else:
            edition = "java"
        rows = re.findall(r"<tr>([\s\S]*?)</tr>", table)
        for row in rows[1:]:
            cells = re.findall(r"<t[dh][^>]*>([\s\S]*?)</t[dh]>", row)
            if len(cells) < 2:
                continue
            command_raw = strip_tags(cells[0])
            description = strip_tags(cells[1])
            if not command_raw:
                continue
            command_candidates = [c.strip() for c in command_raw.split("\n") if c.strip()]
            for command in command_candidates:
                cleaned = command.replace("/", "").strip()
                if cleaned:
                    entries.append({
                        "command": cleaned,
                        "description": description,
                        "edition": edition,
                        "sourceTable": idx,
                    })
    return entries


def build_wiki_snapshot():
    with urllib.request.urlopen(WIKI_COMMANDS_URL) as resp:
        html = resp.read().decode("utf-8")
    entries = extract_wiki_commands(html)
    mapping = {}
    for entry in entries:
        key = entry["command"]
        if key not in mapping:
            mapping[key] = entry["description"]
    return {
        "source": WIKI_COMMANDS_URL,
        "entries": entries,
        "lookup": mapping,
    }


def main():
    manifest = fetch_json(MANIFEST_URL)
    latest_release = manifest["latest"]["release"]
    prismarine_version = pick_latest_prismarine_version()

    registries = build_registries(prismarine_version)
    registries["latestRelease"] = latest_release

    wiki_snapshot = build_wiki_snapshot()
    wiki_snapshot["latestRelease"] = latest_release

    (DATA_DIR / "java-latest-registries.json").write_text(
        json.dumps(registries, indent=2), encoding="utf-8"
    )
    (DATA_DIR / "wiki-command-descriptions.json").write_text(
        json.dumps(wiki_snapshot, indent=2), encoding="utf-8"
    )

    print("Latest Mojang release:", latest_release)
    print("Prismarine data version:", prismarine_version)
    print("Wrote:", DATA_DIR / "java-latest-registries.json")
    print("Wrote:", DATA_DIR / "wiki-command-descriptions.json")


if __name__ == "__main__":
    main()
