#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

MANIFEST_URL = "https://launchermeta.mojang.com/mc/game/version_manifest_v2.json"

CATEGORY_OVERRIDES = {
    "advancement": "Player",
    "attribute": "Entities",
    "ban": "Admin",
    "ban-ip": "Admin",
    "banlist": "Admin",
    "kick": "Admin",
    "op": "Admin",
    "deop": "Admin",
    "pardon": "Admin",
    "pardon-ip": "Admin",
    "whitelist": "Admin",
    "allowlist": "Admin",
    "stop": "Admin",
    "save-all": "Admin",
    "save-off": "Admin",
    "save-on": "Admin",
    "reload": "Admin",
    "publish": "Admin",
    "gamerule": "World",
    "time": "World",
    "weather": "World",
    "setblock": "World",
    "fill": "World",
    "clone": "World",
    "locate": "World",
    "locatebiome": "World",
    "worldborder": "World",
    "summon": "Entities",
    "tp": "Entities",
    "teleport": "Entities",
    "kill": "Entities",
    "effect": "Entities",
    "particle": "Entities",
    "ride": "Entities",
    "damage": "Entities",
    "spreadplayers": "Entities",
    "give": "Items",
    "clear": "Items",
    "item": "Items",
    "loot": "Items",
    "recipe": "Items",
    "enchant": "Items",
    "experience": "Player",
    "xp": "Player",
    "gamemode": "Player",
    "spawnpoint": "Player",
    "title": "Player",
    "tellraw": "Player",
    "say": "Server",
    "me": "Server",
    "tell": "Server",
    "msg": "Server",
    "w": "Server",
    "scoreboard": "Scoreboard",
    "bossbar": "Scoreboard",
    "function": "Data",
    "schedule": "Data",
    "datapack": "Data",
    "data": "Data",
}

PARSER_TYPE_MAP = {
    "minecraft:entity": "selector",
    "minecraft:game_profile": "selector",
    "minecraft:vec3": "position",
    "minecraft:block_pos": "position",
    "minecraft:vec2": "position",
    "minecraft:rotation": "position",
    "minecraft:item_stack": "item",
    "minecraft:item": "item",
    "minecraft:block_state": "block",
    "minecraft:block_predicate": "block",
    "minecraft:resource_key": "resource",
    "minecraft:resource_location": "resource",
    "minecraft:message": "longtext",
    "minecraft:component": "longtext",
    "minecraft:nbt_tag": "longtext",
    "minecraft:nbt_path": "string",
    "minecraft:score_holder": "string",
    "minecraft:objective": "string",
    "minecraft:objective_criteria": "string",
    "minecraft:team": "string",
    "minecraft:time": "enum",
    "minecraft:operation": "enum",
    "minecraft:gamemode": "enum",
    "minecraft:entity_anchor": "enum",
    "minecraft:heightmap": "enum",
    "minecraft:swizzle": "enum",
    "minecraft:slot": "enum",
    "brigadier:integer": "number",
    "brigadier:float": "number",
    "brigadier:double": "number",
    "brigadier:bool": "enum",
    "brigadier:string": "string",
}

ENUM_OPTIONS = {
    "minecraft:gamemode": ["survival", "creative", "adventure", "spectator"],
    "minecraft:time": ["day", "noon", "night", "midnight"],
    "minecraft:operation": ["=", "+=", "-=", "*=", "/=", "%=", "<", ">", "><"],
    "minecraft:entity_anchor": ["feet", "eyes"],
    "minecraft:heightmap": ["world_surface", "ocean_floor", "motion_blocking"],
    "minecraft:swizzle": ["x", "y", "z", "xy", "xz", "yz", "xyz"],
    "minecraft:slot": ["mainhand", "offhand", "head", "chest", "legs", "feet"],
}

BOOL_OPTIONS = ["true", "false"]


def title_from_id(value):
    if ":" in value:
        value = value.split(":", 1)[1]
    return value.replace("_", " ").title()


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def build_registry_snapshot(reports_dir, version):
    registries = load_json(reports_dir / "registries.json")
    registry_entries = {}
    for registry_key, data in registries.items():
        registry_entries[registry_key] = sorted(data.get("entries", {}).keys())

    items = [
        {"id": item_id, "displayName": title_from_id(item_id)}
        for item_id in registry_entries.get("minecraft:item", [])
    ]
    blocks = [
        {"id": block_id, "displayName": title_from_id(block_id)}
        for block_id in registry_entries.get("minecraft:block", [])
    ]
    entities = [
        {"id": ent_id, "displayName": title_from_id(ent_id)}
        for ent_id in registry_entries.get("minecraft:entity_type", [])
    ]

    return {
        "version": version,
        "source": "Mojang data generator",
        "items": items,
        "blocks": blocks,
        "entities": entities,
        "registries": registry_entries,
    }


def load_wiki_descriptions():
    wiki_path = DATA_DIR / "wiki-command-descriptions.json"
    if not wiki_path.exists():
        return {}
    wiki = load_json(wiki_path)
    lookup = {}
    for entry in wiki.get("entries", []):
        if entry.get("edition") != "java":
            continue
        key = entry.get("command", "").lower()
        if key and key not in lookup:
            lookup[key] = entry.get("description")
    return lookup


def build_arg(name, node):
    parser = node.get("parser")
    props = node.get("properties", {})
    arg_type = PARSER_TYPE_MAP.get(parser, "string")
    arg = {
        "key": name,
        "label": title_from_id(name),
        "type": arg_type,
        "required": True,
        "parser": parser,
        "properties": props,
    }

    constraints = []
    if parser == "minecraft:entity":
        ent_type = props.get("type")
        amount = props.get("amount")
        if ent_type:
            constraints.append(ent_type)
        if amount:
            constraints.append(amount)
    if parser in ("brigadier:integer", "brigadier:float", "brigadier:double"):
        if "min" in props:
            constraints.append(f"min {props['min']}")
        if "max" in props:
            constraints.append(f"max {props['max']}")
    if parser == "brigadier:string" and props.get("type"):
        constraints.append(props["type"])
    if parser == "minecraft:resource_key" and "registry" in props:
        arg["registry"] = props["registry"]
    if constraints:
        arg["constraints"] = " · ".join(constraints)

    if parser == "brigadier:bool":
        arg["type"] = "enum"
        arg["options"] = BOOL_OPTIONS
    elif parser in ENUM_OPTIONS:
        arg["type"] = "enum"
        arg["options"] = ENUM_OPTIONS[parser]

    return arg


def collect_branches(command_name, node):
    branches = []

    def walk(curr, tokens, args):
        if curr.get("executable"):
            label = "/" + " ".join([command_name] + tokens)
            branches.append({
                "id": f"{command_name}_{len(branches)}",
                "label": label,
                "description": None,
                "args": args,
            })
        for child_name, child in curr.get("children", {}).items():
            if child.get("type") == "literal":
                walk(child, tokens + [child_name], args)
            elif child.get("type") == "argument":
                arg = build_arg(child_name, child)
                walk(child, tokens + [f"<{child_name}>"], args + [arg])

    walk(node, [], [])
    return branches


def collect_aliases(root):
    aliases = {}
    for name, node in root.get("children", {}).items():
        if "redirect" in node:
            target = node["redirect"][-1]
            aliases.setdefault(target, []).append(name)
    return aliases


def build_commands(reports_dir, version):
    root = load_json(reports_dir / "commands.json")
    wiki_lookup = load_wiki_descriptions()
    aliases = collect_aliases(root)

    commands = []
    for name, node in root.get("children", {}).items():
        if "redirect" in node and not node.get("children"):
            continue
        if node.get("type") != "literal":
            continue

        branches = collect_branches(name, node)
        description = wiki_lookup.get(name, "")
        category = CATEGORY_OVERRIDES.get(name, "General")
        permissions = node.get("permissions")
        perm_text = f"OP level {permissions}" if permissions is not None else "Varies by command."

        commands.append({
            "id": name,
            "name": f"/{name}",
            "category": category,
            "tags": [],
            "description": description or "No description available.",
            "permissions": perm_text,
            "aliases": aliases.get(name, []),
            "intentTags": [],
            "syntax": branches,
            "examples": [],
            "source": "Mojang",
            "commandBlock": {
                "recommended": "Impulse",
                "notes": "See command documentation for details.",
            },
        })

    return {
        "version": version,
        "source": "Mojang data generator",
        "commands": commands,
    }


def main():
    cache_path = Path.home() / ".cache" / "minecraft-version-manifest.json"
    manifest = None
    if cache_path.exists():
        manifest = load_json(cache_path)
    if not manifest:
        import urllib.request
        manifest = json.load(urllib.request.urlopen(MANIFEST_URL))
        cache_path.parent.mkdir(exist_ok=True)
        cache_path.write_text(json.dumps(manifest), encoding="utf-8")

    latest = manifest["latest"]["release"]
    reports_dir = DATA_DIR / f"mojang-{latest}" / "reports"
    if not reports_dir.exists():
        raise SystemExit(f"Missing reports at {reports_dir}. Run data generator first.")

    registry_snapshot = build_registry_snapshot(reports_dir, latest)
    commands_snapshot = build_commands(reports_dir, latest)

    (DATA_DIR / "java-official-registries.json").write_text(
        json.dumps(registry_snapshot, indent=2), encoding="utf-8"
    )
    (DATA_DIR / "java-official-commands.json").write_text(
        json.dumps(commands_snapshot, indent=2), encoding="utf-8"
    )

    print("Wrote java-official-registries.json")
    print("Wrote java-official-commands.json")


if __name__ == "__main__":
    main()
