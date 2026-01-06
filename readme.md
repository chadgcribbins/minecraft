# Minecraft Command Explorer (Prototype)

A static, offline-friendly prototype for exploring Minecraft commands with a guided, step-by-step builder. Java commands are sourced from Mojang's official data reports when available, with wiki-only data used primarily for Bedrock descriptions and coverage gaps.

## Scripts and When to Run Them

### Quickstart (one command)
Run this when you want to refresh everything in one go (JRE + server jar + Mojang reports + snapshots + wiki).

```bash
python3 ./scripts/bootstrap_official_data.py
```

Use `--version 1.21.11` to target a specific release, or `--force` to re-download Java and the server jar.

### 1) Generate Mojang official reports (Java)
Run this when Mojang ships a new release or when you want the most authoritative command tree and registries.

Prereqs:
- Java 21 runtime
- Latest server jar

Command (run from the repo root):

```bash
# Example: generate reports for the latest release
JAVA=./tools/jre/jdk-21.0.9+10-jre/Contents/Home/bin/java
SERVER=./tools/server/versions/1.21.11/server-1.21.11.jar
LIBS=$(find ./tools/server/libraries -name "*.jar" | tr '\n' ':')
CP="$SERVER:$LIBS"
$JAVA -cp "$CP" net.minecraft.data.Main --reports --server --output ./data/mojang-1.21.11
```

Note: update the Java path, server jar path, and output folder when you bump the Minecraft version.

Outputs (inside `data/mojang-<version>/reports`):
- `commands.json` (official command tree)
- `registries.json` (canonical registries)
- `items.json`, `blocks.json`, etc.

### 2) Convert Mojang reports into app snapshots
Run this after generating Mojang reports to build the JSON files the app loads.

```bash
python3 ./scripts/build_mojang_snapshot.py
```

Outputs:
- `data/java-official-commands.json`
- `data/java-official-registries.json`

### 3) Refresh wiki + registry fallback data
Run this if you want updated wiki descriptions or a lightweight fallback registry snapshot.

```bash
python3 ./scripts/fetch_mc_data.py
```

Outputs:
- `data/java-latest-registries.json`
- `data/wiki-command-descriptions.json`

Notes:
- The app prefers `java-official-commands.json` and `java-official-registries.json` when present.
- Wiki data is used for Bedrock coverage and command descriptions when official data is unavailable.

## Running the prototype

```bash
python3 -m http.server 4173
```
Open `http://localhost:4173` in your browser.
