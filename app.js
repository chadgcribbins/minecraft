const DATA = {
  Java: {
    commands: [
      {
        id: "give",
        name: "/give",
        category: "Items",
        tags: ["popular", "creative"],
        description: "Gives an item to one or more targets.",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["grant item", "inventory"],
        syntax: [
          {
            id: "give_basic",
            label: "/give <targets> <item> [count]",
            description: "Give an item to one or more targets, optionally with a count.",
            args: [
              {
                key: "targets",
                label: "Targets",
                type: "selector",
                required: true,
                placeholder: "@p",
                constraints: "Player selector",
                examples: ["@p", "@a", "@s"]
              },
              {
                key: "item",
                label: "Item",
                type: "item",
                required: true,
                placeholder: "minecraft:diamond",
                constraints: "Valid item id",
                examples: ["minecraft:diamond", "minecraft:oak_log"]
              },
              {
                key: "count",
                label: "Count",
                type: "number",
                required: false,
                placeholder: "1",
                constraints: "1-64",
                examples: ["1", "32", "64"]
              }
            ]
          }
        ],
        examples: [
          "/give @p minecraft:diamond 3",
          "/give @a minecraft:oak_log 16"
        ],
        commandBlock: {
          recommended: "Impulse",
          notes: "Use Chain if part of a sequence."
        }
      },
      {
        id: "tp",
        name: "/tp",
        category: "Entities",
        tags: ["popular"],
        description: "Teleports entities to a location or to another entity.",
        permissions: "Requires OP or cheats enabled.",
        aliases: ["teleport"],
        intentTags: ["move", "teleport"],
        syntax: [
          {
            id: "tp_self",
            label: "/tp <destination>",
            description: "Teleport yourself to a location or another entity.",
            args: [
              {
                key: "destination",
                label: "Destination",
                type: "position",
                required: true,
                placeholder: "~ ~ ~",
                constraints: "Coordinates or entity selector",
                examples: ["0 64 0", "@p", "~ ~5 ~"]
              }
            ]
          },
          {
            id: "tp_target",
            label: "/tp <target> <destination>",
            description: "Teleport a specific target to a destination.",
            args: [
              {
                key: "target",
                label: "Target",
                type: "selector",
                required: true,
                placeholder: "@e[type=creeper,limit=1]",
                constraints: "Entity selector",
                examples: ["@s", "@p", "@e[type=creeper,limit=1]"]
              },
              {
                key: "destination",
                label: "Destination",
                type: "position",
                required: true,
                placeholder: "0 80 0",
                constraints: "Coordinates or entity selector",
                examples: ["0 80 0", "@p", "~ ~ ~"]
              }
            ]
          }
        ],
        examples: [
          "/tp 0 64 0",
          "/tp @p @e[type=villager,limit=1]"
        ],
        commandBlock: {
          recommended: "Chain",
          notes: "Pair with Repeat for tracking entities."
        }
      },
      {
        id: "summon",
        name: "/summon",
        category: "Entities",
        tags: ["creative"],
        description: "Summons an entity at a location.",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["spawn", "entity"],
        syntax: [
          {
            id: "summon_basic",
            label: "/summon <entity> [pos]",
            description: "Summon an entity at the given position.",
            args: [
              {
                key: "entity",
                label: "Entity",
                type: "entity",
                required: true,
                placeholder: "minecraft:zombie",
                constraints: "Valid entity id",
                examples: ["minecraft:zombie", "minecraft:villager"]
              },
              {
                key: "pos",
                label: "Position",
                type: "position",
                required: false,
                placeholder: "~ ~ ~",
                constraints: "Optional coordinates",
                examples: ["~ ~ ~", "10 70 -5"]
              }
            ]
          }
        ],
        examples: [
          "/summon minecraft:zombie",
          "/summon minecraft:villager ~ ~1 ~"
        ],
        commandBlock: {
          recommended: "Repeat",
          notes: "Control spawn rate with redstone delay."
        }
      },
      {
        id: "advancement",
        name: "/advancement",
        category: "Admin",
        tags: ["admin"],
        description: "Grants or revokes player advancements.",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["progress", "rewards"],
        syntax: [
          {
            id: "advancement_basic",
            label: "/advancement <grant|revoke> <targets> <advancement> [criterion]",
            description: "Grant or revoke advancement progress for targets.",
            args: [
              {
                key: "action",
                label: "Action",
                type: "enum",
                required: true,
                options: ["grant", "revoke"],
                constraints: "Grant or revoke",
                examples: ["grant", "revoke"]
              },
              {
                key: "targets",
                label: "Targets",
                type: "selector",
                required: true,
                placeholder: "@p",
                constraints: "Player selector",
                examples: ["@p", "@a"]
              },
              {
                key: "advancement",
                label: "Advancement",
                type: "string",
                required: true,
                placeholder: "story/mine_diamond",
                constraints: "Advancement id",
                examples: ["story/mine_diamond"]
              },
              {
                key: "criterion",
                label: "Criterion",
                type: "string",
                required: false,
                placeholder: "diamond",
                constraints: "Optional criterion",
                examples: ["diamond"]
              }
            ]
          }
        ],
        examples: [
          "/advancement grant @p only story/mine_diamond",
          "/advancement revoke @a everything"
        ],
        commandBlock: {
          recommended: "Impulse",
          notes: "Use for rewards after objectives."
        }
      }
    ]
  },
  Bedrock: {
    commands: [
      {
        id: "give",
        name: "/give",
        category: "Items",
        tags: ["popular", "creative"],
        description: "Gives an item to one or more targets (Bedrock syntax).",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["grant item", "inventory"],
        syntax: [
          {
            id: "give_basic",
            label: "/give <target> <item> [amount] [data]",
            description: "Give items to a target with optional amount or data.",
            args: [
              {
                key: "targets",
                label: "Target",
                type: "selector",
                required: true,
                placeholder: "@p",
                constraints: "Player selector",
                examples: ["@p", "@a", "@s"]
              },
              {
                key: "item",
                label: "Item",
                type: "item",
                required: true,
                placeholder: "minecraft:diamond",
                constraints: "Valid item id",
                examples: ["minecraft:diamond", "minecraft:oak_log"]
              },
              {
                key: "amount",
                label: "Amount",
                type: "number",
                required: false,
                placeholder: "1",
                constraints: "1-64",
                examples: ["1", "16", "64"]
              }
            ]
          }
        ],
        examples: [
          "/give @p minecraft:diamond 3",
          "/give @a minecraft:oak_log 16"
        ],
        commandBlock: {
          recommended: "Impulse",
          notes: "Use Chain if part of a sequence."
        }
      },
      {
        id: "tp",
        name: "/tp",
        category: "Entities",
        tags: ["popular"],
        description: "Teleports entities to a location or to another entity.",
        permissions: "Requires OP or cheats enabled.",
        aliases: ["teleport"],
        intentTags: ["move", "teleport"],
        syntax: [
          {
            id: "tp_target",
            label: "/tp <target> <destination>",
            description: "Teleport a target to a destination.",
            args: [
              {
                key: "target",
                label: "Target",
                type: "selector",
                required: true,
                placeholder: "@p",
                constraints: "Entity selector",
                examples: ["@s", "@p", "@e[type=creeper,limit=1]"]
              },
              {
                key: "destination",
                label: "Destination",
                type: "position",
                required: true,
                placeholder: "0 80 0",
                constraints: "Coordinates or entity selector",
                examples: ["0 80 0", "@p", "~ ~ ~"]
              }
            ]
          }
        ],
        examples: [
          "/tp @p 0 64 0",
          "/tp @e[type=cow,limit=1] @p"
        ],
        commandBlock: {
          recommended: "Chain",
          notes: "Pair with Repeat for tracking entities."
        }
      },
      {
        id: "summon",
        name: "/summon",
        category: "Entities",
        tags: ["creative"],
        description: "Summons an entity (Bedrock flavor).",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["spawn", "entity"],
        syntax: [
          {
            id: "summon_basic",
            label: "/summon <entity> [nameTag] [pos]",
            description: "Summon an entity with an optional name tag and position.",
            args: [
              {
                key: "entity",
                label: "Entity",
                type: "entity",
                required: true,
                placeholder: "minecraft:zombie",
                constraints: "Valid entity id",
                examples: ["minecraft:zombie", "minecraft:villager"]
              },
              {
                key: "nameTag",
                label: "Name Tag",
                type: "string",
                required: false,
                placeholder: "Guardian",
                constraints: "Optional name tag",
                examples: ["Guardian", "Builder", "Merchant", "Boss", "TestDummy"]
              },
              {
                key: "pos",
                label: "Position",
                type: "position",
                required: false,
                placeholder: "~ ~ ~",
                constraints: "Optional coordinates",
                examples: ["~ ~ ~", "10 70 -5", "0 64 0", "^ ^ ^1", "~ ~5 ~"]
              }
            ]
          }
        ],
        examples: [
          "/summon minecraft:zombie",
          "/summon minecraft:villager \"Builder\" ~ ~1 ~"
        ],
        commandBlock: {
          recommended: "Repeat",
          notes: "Control spawn rate with redstone delay."
        }
      },
      {
        id: "ability",
        name: "/ability",
        category: "Admin",
        tags: ["admin"],
        description: "Grants or revokes player abilities.",
        permissions: "Requires OP or cheats enabled.",
        aliases: [],
        intentTags: ["permissions", "admin"],
        syntax: [
          {
            id: "ability_basic",
            label: "/ability <player> <ability> <true|false>",
            description: "Toggle a player ability on or off.",
            args: [
              {
                key: "player",
                label: "Player",
                type: "selector",
                required: true,
                placeholder: "@p",
                constraints: "Player selector",
                examples: ["@p", "@a"]
              },
              {
                key: "ability",
                label: "Ability",
                type: "enum",
                required: true,
                options: ["mayfly", "mute"],
                constraints: "Ability flag",
                examples: ["mayfly", "mute"]
              },
              {
                key: "value",
                label: "Value",
                type: "enum",
                required: true,
                options: ["true", "false"],
                constraints: "Enable or disable",
                examples: ["true", "false"]
              }
            ]
          }
        ],
        examples: [
          "/ability @p mayfly true",
          "/ability @a mute false"
        ],
        commandBlock: {
          recommended: "Impulse",
          notes: "Use for classroom or server control."
        }
      }
    ]
  }
};

const ARG_KEY_HELP = {
  targets: "Who receives the command effect.",
  target: "Specific entity to affect.",
  player: "Player selector to modify.",
  destination: "Where to move or teleport the target.",
  pos: "Position where the entity appears.",
  entity: "Entity id to spawn.",
  item: "Item id to give.",
  count: "How many items to give.",
  amount: "How many items to give.",
  nameTag: "Optional display name applied to the entity.",
  advancement: "Advancement id to grant or revoke.",
  criterion: "Optional advancement criterion id.",
  ability: "Ability flag to toggle.",
  value: "Enable or disable the ability."
};

const ARG_ENUM_DESCRIPTIONS = {
  grant: "Give advancement progress.",
  revoke: "Remove advancement progress.",
  mayfly: "Allow the player to fly.",
  mute: "Disable player chat.",
  true: "Enable the ability.",
  false: "Disable the ability."
};

const ARG_TYPE_OPTIONS = {
  selector: [
    { value: "@p", description: "Nearest player." },
    { value: "@a", description: "All players." },
    { value: "@r", description: "Random player." },
    { value: "@s", description: "The command executor." },
    { value: "@e", description: "All entities." },
    { value: "@e[type=creeper,limit=1]", description: "First creeper found." },
    { value: "@e[type=villager,sort=nearest,limit=1]", description: "Nearest villager." }
  ],
  position: [
    { value: "0 64 0", description: "Absolute coordinates (x y z)." },
    { value: "~ ~ ~", description: "Relative to current position." },
    { value: "~ ~5 ~", description: "Five blocks above current position." },
    { value: "^ ^ ^1", description: "Local coords: one block forward." },
    { value: "@p", description: "Use another entity as destination." }
  ],
  item: [
    { value: "minecraft:diamond", description: "Diamond item." },
    { value: "minecraft:oak_log", description: "Oak log block." },
    { value: "minecraft:command_block", description: "Command block." },
    { value: "minecraft:elytra", description: "Elytra wings." },
    { value: "minecraft:shield", description: "Shield item." }
  ],
  entity: [
    { value: "minecraft:zombie", description: "Hostile mob." },
    { value: "minecraft:villager", description: "NPC villager." },
    { value: "minecraft:creeper", description: "Explosive mob." },
    { value: "minecraft:armor_stand", description: "Display stand." },
    { value: "minecraft:cow", description: "Passive mob." }
  ],
  number: [
    { value: "1", description: "Single item." },
    { value: "16", description: "Small stack." },
    { value: "64", description: "Full stack." }
  ],
  block: [
    { value: "minecraft:stone", description: "Stone block." },
    { value: "minecraft:oak_log", description: "Oak log block." },
    { value: "minecraft:glass", description: "Glass block." }
  ]
};

const ARG_KEY_OPTIONS = {
  advancement: [{ value: "story/mine_diamond", description: "Example advancement id." }],
  criterion: [{ value: "diamond", description: "Example criterion id." }],
  nameTag: [
    { value: "Guardian", description: "Example name tag." },
    { value: "Builder", description: "Example name tag." },
    { value: "Merchant", description: "Example name tag." }
  ]
};

const externalData = {
  registry: null,
  wiki: null,
  commandsByEdition: {
    Java: [],
    Bedrock: []
  }
};

const ARG_KEY_DEFAULT_SELECTOR_BASE = {
  targets: "@p",
  target: "@e",
  player: "@p"
};

const SELECTOR_BASE_OPTIONS = [
  { value: "@p", description: "Nearest player." },
  { value: "@a", description: "All players." },
  { value: "@r", description: "Random player." },
  { value: "@s", description: "The command executor." },
  { value: "@e", description: "All entities." }
];

const SELECTOR_FILTER_OPTIONS = [
  { key: "type", value: "creeper", description: "Filter by entity type id." },
  { key: "type", value: "!player", description: "Exclude an entity type." },
  { key: "name", value: "Builder", description: "Match exact name tag (use quotes for spaces)." },
  { key: "tag", value: "boss", description: "Match scoreboard/tag value." },
  { key: "tag", value: "!boss", description: "Exclude entities with a tag." },
  { key: "team", value: "red", description: "Match team name." },
  { key: "gamemode", value: "creative", description: "Player gamemode filter." },
  { key: "level", value: "5..", description: "Player level range." },
  { key: "distance", value: "..10", description: "Distance range from origin." },
  { key: "distance", value: "5..15", description: "Distance range (min..max)." },
  { key: "limit", value: "1", description: "Limit number of results." },
  { key: "sort", value: "nearest", description: "Sort order for results." },
  { key: "sort", value: "furthest", description: "Sort order for results." },
  { key: "sort", value: "random", description: "Randomize results." },
  { key: "x", value: "0", description: "Origin X coordinate." },
  { key: "y", value: "64", description: "Origin Y coordinate." },
  { key: "z", value: "0", description: "Origin Z coordinate." },
  { key: "dx", value: "10", description: "Volume width from origin." },
  { key: "dy", value: "5", description: "Volume height from origin." },
  { key: "dz", value: "10", description: "Volume depth from origin." },
  { key: "scores", value: "kills=5..", description: "Scoreboard filter." },
  { key: "nbt", value: "{OnGround:1b}", description: "Java-only NBT filter." },
  { key: "predicate", value: "minecraft:example", description: "Java-only predicate filter." },
  { key: "hasitem", value: "{item=minecraft:diamond}", description: "Bedrock-only item filter." }
];

const EDITION_EQUIVALENTS = {
  "Java:advancement": "ability",
  "Bedrock:ability": "advancement"
};

const state = {
  edition: localStorage.getItem("mce.edition") || "Java",
  version: "Latest",
  search: "",
  category: localStorage.getItem("mce.category") || "All",
  quickFilter: null,
  selectedCommandId: null,
  selectedBranchId: null,
  builderInputs: {},
  selectorDrafts: {},
  optionSearch: {},
  activeArgKey: null,
  outputMode: localStorage.getItem("mce.outputMode") || "chat",
  offlineSimulated: localStorage.getItem("mce.offline") === "true",
  notice: null
};

const elements = {
  editionButtons: document.querySelectorAll("[data-edition]"),
  versionSelect: document.getElementById("version"),
  searchInput: document.getElementById("search"),
  searchSuggestions: document.getElementById("command-suggestions"),
  offlineToggle: document.getElementById("offline-toggle"),
  categoryList: document.getElementById("category-list"),
  commandGrid: document.getElementById("command-grid"),
  commandSummary: document.getElementById("command-summary"),
  syntaxTree: document.getElementById("syntax-tree"),
  discoveryList: document.getElementById("discovery-list"),
  discoveryShuffle: document.getElementById("discovery-shuffle"),
  guidedSteps: document.getElementById("guided-steps"),
  guidedOptions: document.getElementById("guided-options"),
  commandDetail: document.getElementById("command-detail"),
  builder: document.getElementById("builder"),
  resultCount: document.getElementById("result-count"),
  editionNote: document.getElementById("edition-note"),
  builderTabs: document.querySelectorAll(".builder-tabs .chip"),
  quickFilters: document.querySelectorAll("[data-filter]"),
  viewCommands: document.getElementById("view-commands"),
  viewSyntax: document.getElementById("view-syntax")
};

function init() {
  const commands = getEditionCommands(state.edition);
  const baseCommands = DATA[state.edition].commands;
  const fallback = baseCommands[0] || commands[0];
  const storedCommand = localStorage.getItem("mce.commandId");

  state.selectedCommandId =
    storedCommand && commands.some((command) => command.id === storedCommand)
      ? storedCommand
      : fallback.id;

  state.selectedBranchId = null;
  setInitialActiveArg();
  updateEditionUI();
  updateOfflineUI();
  renderAll();
  attachListeners();
  loadExternalData();
}

async function loadExternalData() {
  try {
    const registryResponse = await fetch("data/java-official-registries.json");
    if (registryResponse.ok) {
      externalData.registry = await registryResponse.json();
    } else {
      const fallbackRegistry = await fetch("data/java-latest-registries.json");
      if (fallbackRegistry.ok) {
        externalData.registry = await fallbackRegistry.json();
      }
    }
  } catch (error) {
    console.warn("Registry data unavailable", error);
  }

  try {
    const commandsResponse = await fetch("data/java-official-commands.json");
    if (commandsResponse.ok) {
      const data = await commandsResponse.json();
      externalData.commandsByEdition.Java = data.commands || [];
    }
  } catch (error) {
    console.warn("Official commands unavailable", error);
  }

  try {
    const wikiResponse = await fetch("data/wiki-command-descriptions.json");
    if (wikiResponse.ok) {
      externalData.wiki = await wikiResponse.json();
      buildWikiCommands();
    }
  } catch (error) {
    console.warn("Wiki data unavailable", error);
  }

  renderAll();
}

function buildWikiCommands() {
  if (!externalData.wiki || !externalData.wiki.entries) return;
  const entries = externalData.wiki.entries;
  const byEdition = { Java: externalData.commandsByEdition.Java || [], Bedrock: [] };

  entries.forEach((entry) => {
    const editionKey = entry.edition === "bedrock" ? "Bedrock" : "Java";
    if (editionKey === "Java") {
      return;
    }
    const id = entry.command.toLowerCase();
    byEdition[editionKey].push({
      id,
      name: `/${entry.command}`,
      category: "General",
      tags: [],
      description: entry.description || "No description available.",
      permissions: "Varies by command.",
      aliases: [],
      intentTags: [],
      syntax: [],
      examples: [],
      source: "Wiki",
      commandBlock: {
        recommended: "Impulse",
        notes: "See command documentation for details."
      }
    });
  });

  externalData.commandsByEdition = byEdition;
}

function attachListeners() {
  elements.editionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setEdition(button.dataset.edition);
    });
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim();
    renderCommandGrid();
  });

  elements.categoryList.addEventListener("click", (event) => {
    const item = event.target.closest(".category-item");
    if (!item) return;
    state.category = item.dataset.category;
    localStorage.setItem("mce.category", state.category);
    renderCategoryList();
    renderCommandGrid();
  });

  elements.commandGrid.addEventListener("click", (event) => {
    const tile = event.target.closest(".command-tile");
    if (!tile) return;
    setSelectedCommand(tile.dataset.commandId);
  });

  elements.discoveryList.addEventListener("click", (event) => {
    const item = event.target.closest(".discovery-item");
    if (!item) return;
    setSelectedCommand(item.dataset.commandId);
  });

  elements.discoveryShuffle.addEventListener("click", () => {
    renderDiscovery();
  });

  elements.syntaxTree.addEventListener("click", (event) => {
    const branch = event.target.closest(".syntax-branch");
    if (!branch) return;
    setSelectedBranch(branch.dataset.branchId);
  });

  elements.guidedSteps.addEventListener("click", (event) => {
    const step = event.target.closest(".step-item");
    if (!step) return;
    setActiveArgKey(step.dataset.step);
  });

  elements.guidedOptions.addEventListener("click", (event) => {
    const baseOption = event.target.closest("[data-selector-base]");
    if (baseOption) {
      setSelectorBase(baseOption.dataset.arg, baseOption.dataset.selectorBase);
      renderGuidedBuilder();
      return;
    }

    const filterOption = event.target.closest("[data-selector-filter]");
    if (filterOption) {
      addSelectorFilter(
        filterOption.dataset.arg,
        filterOption.dataset.filterKey,
        filterOption.dataset.filterValue
      );
      renderGuidedBuilder();
      return;
    }

    const removeFilter = event.target.closest("[data-selector-remove]");
    if (removeFilter) {
      removeSelectorFilter(removeFilter.dataset.arg, removeFilter.dataset.filterKey);
      renderGuidedBuilder();
      return;
    }

    const applySelector = event.target.closest("[data-selector-apply]");
    if (applySelector) {
      const argKey = applySelector.dataset.arg;
      const draft = getSelectorDraft(argKey);
      const selectorValue = buildSelectorFromDraft(draft);
      if (selectorValue) {
        setArgValue(argKey, selectorValue, true);
      }
      return;
    }

    const customSelector = event.target.closest("[data-selector-custom]");
    if (customSelector) {
      const argKey = customSelector.dataset.arg;
      const input = elements.guidedOptions.querySelector(`[data-guided-input][data-arg="${argKey}"]`);
      if (!input) return;
      setArgValue(argKey, input.value.trim(), true);
      return;
    }

    const option = event.target.closest("[data-option]");
    if (option) {
      setArgValue(option.dataset.arg, option.dataset.option, true);
      return;
    }

    if (event.target.dataset.action === "use-custom") {
      const argKey = event.target.dataset.arg;
      const input = elements.guidedOptions.querySelector(`[data-guided-input][data-arg="${argKey}"]`);
      if (!input) return;
      setArgValue(argKey, input.value.trim(), true);
    }

    if (event.target.dataset.action === "clear-search") {
      const argKey = event.target.dataset.arg;
      state.optionSearch[argKey] = "";
      renderGuidedBuilder();
    }
  });

  elements.guidedOptions.addEventListener("input", (event) => {
    if (event.target.matches("[data-filter-input]")) {
      updateSelectorFilterValue(
        event.target.dataset.arg,
        event.target.dataset.filterKey,
        event.target.value
      );
      renderGuidedBuilder();
    }

    if (event.target.matches("[data-option-search]")) {
      state.optionSearch[event.target.dataset.arg] = event.target.value;
      renderGuidedBuilder();
    }
  });

  elements.builder.addEventListener("input", (event) => {
    if (!event.target.matches("[data-arg]")) return;
    state.builderInputs[event.target.dataset.arg] = event.target.value;
    updateBuilderOutput();
    renderGuidedBuilder();
  });

  elements.builder.addEventListener("change", (event) => {
    if (!event.target.matches("[data-arg]")) return;
    state.builderInputs[event.target.dataset.arg] = event.target.value;
    updateBuilderOutput();
    renderGuidedBuilder();
  });

  elements.builder.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    const suggestion = event.target.dataset.suggestion;

    if (suggestion) {
      const argKey = event.target.dataset.arg;
      state.builderInputs[argKey] = suggestion;
      const input = elements.builder.querySelector(`[data-arg="${argKey}"]`);
      if (input) {
        input.value = suggestion;
      }
      updateBuilderOutput();
      return;
    }

    if (!action) return;

    if (action === "copy") {
      copyOutput();
    }

    if (action === "reset") {
      resetBuilderInputs();
      setInitialActiveArg();
      renderBuilder();
      renderGuidedBuilder();
      renderCommandDetail();
    }
  });

  elements.builderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.outputMode = tab.dataset.output;
      localStorage.setItem("mce.outputMode", state.outputMode);
      renderBuilder();
    });
  });

  elements.quickFilters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      state.quickFilter = state.quickFilter === filter ? null : filter;
      elements.quickFilters.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === state.quickFilter);
      });
      renderCommandGrid();
    });
  });

  elements.offlineToggle.addEventListener("click", () => {
    state.offlineSimulated = !state.offlineSimulated;
    localStorage.setItem("mce.offline", state.offlineSimulated);
    updateOfflineUI();
    renderNotice();
  });

  elements.viewCommands.addEventListener("click", () => {
    elements.commandGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  elements.viewSyntax.addEventListener("click", () => {
    elements.syntaxTree.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setEdition(edition) {
  if (state.edition === edition) return;
  const previousEdition = state.edition;
  state.edition = edition;
  localStorage.setItem("mce.edition", edition);

  const mapResult = mapCommandId(previousEdition, edition, state.selectedCommandId);
  state.selectedCommandId = mapResult.id;
  state.selectedBranchId = null;
  resetBuilderInputs();
  setInitialActiveArg();

  if (mapResult.message) {
    setNotice(mapResult.message, mapResult.tone);
  }

  updateEditionUI();
  renderAll();
}

function mapCommandId(fromEdition, toEdition, commandId) {
  const targetCommands = getEditionCommands(toEdition);
  const targetHasCommand = targetCommands.some((command) => command.id === commandId);

  if (targetHasCommand) {
    return { id: commandId, message: null, tone: null };
  }

  const mapKey = `${fromEdition}:${commandId}`;
  const mappedId = EDITION_EQUIVALENTS[mapKey];
  if (mappedId && targetCommands.some((command) => command.id === mappedId)) {
    return {
      id: mappedId,
      message: `Mapped ${getCommandName(fromEdition, commandId)} to ${getCommandName(
        toEdition,
        mappedId
      )}.`,
      tone: "success"
    };
  }

  const fallback = targetCommands[0];
  return {
    id: fallback.id,
    message: `No equivalent found for ${getCommandName(
      fromEdition,
      commandId
    )}. Showing ${fallback.name} instead.`,
    tone: "warn"
  };
}

function setSelectedCommand(commandId) {
  state.selectedCommandId = commandId;
  localStorage.setItem("mce.commandId", commandId);
  state.selectedBranchId = null;
  resetBuilderInputs();
  setInitialActiveArg();
  renderAll();
}

function setSelectedBranch(branchId) {
  state.selectedBranchId = branchId;
  resetBuilderInputs();
  setInitialActiveArg();
  renderAll();
}

function resetBuilderInputs() {
  state.builderInputs = {};
  state.selectorDrafts = {};
  state.optionSearch = {};
}

function setInitialActiveArg() {
  const branch = getActiveBranch();
  state.activeArgKey = branch && branch.args.length ? branch.args[0].key : null;
}

function getSelectorDraft(argKey) {
  if (!state.selectorDrafts[argKey]) {
    const defaultBase = ARG_KEY_DEFAULT_SELECTOR_BASE[argKey] || "@p";
    state.selectorDrafts[argKey] = { base: defaultBase, filters: [] };
  }
  return state.selectorDrafts[argKey];
}

function setSelectorBase(argKey, base) {
  if (!argKey || !base) return;
  const draft = getSelectorDraft(argKey);
  draft.base = base;
}

function addSelectorFilter(argKey, key, value) {
  if (!argKey || !key) return;
  const draft = getSelectorDraft(argKey);
  const existing = draft.filters.find((filter) => filter.key === key);
  const nextValue = value || "";
  if (existing) {
    existing.value = nextValue;
  } else {
    draft.filters.push({ key, value: nextValue });
  }
}

function removeSelectorFilter(argKey, key) {
  if (!argKey || !key) return;
  const draft = getSelectorDraft(argKey);
  draft.filters = draft.filters.filter((filter) => filter.key !== key);
}

function updateSelectorFilterValue(argKey, key, value) {
  if (!argKey || !key) return;
  const draft = getSelectorDraft(argKey);
  const filter = draft.filters.find((entry) => entry.key === key);
  if (filter) {
    filter.value = value;
  }
}

function buildSelectorFromDraft(draft) {
  if (!draft || !draft.base) return "";
  if (!draft.filters.length) {
    return draft.base;
  }
  const filters = draft.filters
    .filter((filter) => filter.value && filter.value.trim())
    .map((filter) => `${filter.key}=${filter.value.trim()}`)
    .join(",");
  if (!filters) {
    return draft.base;
  }
  return `${draft.base}[${filters}]`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function titleFromId(value) {
  const parts = String(value).split(":");
  const raw = parts.length > 1 ? parts[1] : parts[0];
  return raw
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function setActiveArgKey(argKey) {
  state.activeArgKey = argKey;
  renderGuidedBuilder();
}

function setArgValue(argKey, value, advance) {
  if (!argKey) return;
  if (!value) return;
  state.builderInputs[argKey] = value;
  const input = elements.builder.querySelector(`[data-arg="${argKey}"]`);
  if (input) {
    input.value = value;
  }
  if (advance) {
    advanceActiveArg(argKey);
  }
  updateBuilderOutput();
  renderGuidedBuilder();
  renderCommandDetail();
}

function advanceActiveArg(argKey) {
  const branch = getActiveBranch();
  if (!branch) return;
  const index = branch.args.findIndex((arg) => arg.key === argKey);
  if (index === -1) return;
  const next = branch.args[index + 1];
  if (next) {
    state.activeArgKey = next.key;
  }
}
function getEditionCommands(edition) {
  const base = DATA[edition].commands;
  const extras = externalData.commandsByEdition[edition] || [];
  if (!extras.length) {
    return base;
  }
  const map = new Map(base.map((command) => [command.id, command]));
  extras.forEach((command) => {
    if (!map.has(command.id)) {
      map.set(command.id, command);
    }
  });
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function getCommandById(edition, commandId) {
  return getEditionCommands(edition).find((command) => command.id === commandId);
}

function getCommandName(edition, commandId) {
  const command = getCommandById(edition, commandId);
  return command ? command.name : `/${commandId}`;
}

function getActiveCommand() {
  return getCommandById(state.edition, state.selectedCommandId);
}

function getActiveBranch() {
  const command = getActiveCommand();
  if (!command || !command.syntax || !command.syntax.length) return null;
  if (!state.selectedBranchId) {
    return command.syntax[0];
  }
  return command.syntax.find((branch) => branch.id === state.selectedBranchId) || command.syntax[0];
}

function renderAll() {
  renderCategoryList();
  renderDiscovery();
  renderCommandGrid();
  renderCommandSummary();
  renderSyntaxTree();
  renderGuidedBuilder();
  renderCommandDetail();
  renderBuilder();
  renderSuggestions();
  renderNotice();
}

function renderCategoryList() {
  const commands = getEditionCommands(state.edition);
  const categories = commands.reduce((acc, command) => {
    acc[command.category] = (acc[command.category] || 0) + 1;
    return acc;
  }, {});

  const validCategories = new Set(["All", ...Object.keys(categories)]);
  if (!validCategories.has(state.category)) {
    state.category = "All";
    localStorage.setItem("mce.category", state.category);
  }

  const items = [
    { name: "All", count: commands.length },
    ...Object.keys(categories)
      .sort()
      .map((name) => ({ name, count: categories[name] }))
  ];

  elements.categoryList.innerHTML = items
    .map((item) => {
      const active = state.category === item.name ? "active" : "";
      return `
        <div class="category-item ${active}" data-category="${item.name}">
          <div>${item.name}</div>
          <span>${item.count}</span>
        </div>
      `;
    })
    .join("");
}

function applyFilters(commands) {
  let filtered = [...commands];

  if (state.category && state.category !== "All") {
    filtered = filtered.filter((command) => command.category === state.category);
  }

  if (state.quickFilter) {
    filtered = filtered.filter((command) => command.tags.includes(state.quickFilter));
  }

  if (state.search) {
    const query = state.search.toLowerCase();
    filtered = filtered.filter((command) => {
      const haystack = [
        command.name,
        command.id,
        command.description,
        ...command.aliases,
        ...command.intentTags
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }

  return filtered;
}

function renderDiscovery() {
  const commands = getEditionCommands(state.edition);
  if (!commands.length) {
    elements.discoveryList.innerHTML = "<div class=\"panel-sub\">No commands yet.</div>";
    return;
  }

  const sample = pickDiscoveryCommands(commands, 6);
  elements.discoveryList.innerHTML = sample
    .map((command) => {
      const active = command.id === state.selectedCommandId ? "active" : "";
      return `
        <button class="discovery-item ${active}" data-command-id="${command.id}" type="button">
          <div class="discovery-title">${command.name}</div>
          <div class="discovery-desc">${command.description || "No description available."}</div>
        </button>
      `;
    })
    .join("");
}

function pickDiscoveryCommands(commands, count) {
  const pool = commands.filter((command) => !command.tags.includes("popular"));
  const source = pool.length ? pool : commands;
  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderCommandGrid() {
  const commands = getEditionCommands(state.edition);
  const filtered = applyFilters(commands);

  elements.resultCount.textContent = `${filtered.length} results`;

  if (!filtered.length) {
    elements.commandGrid.innerHTML = "<div class=\"panel-sub\">No commands match that search.</div>";
    return;
  }

  elements.commandGrid.innerHTML = filtered
    .map((command) => {
      const active = command.id === state.selectedCommandId ? "active" : "";
      return `
        <div class="command-tile ${active}" data-command-id="${command.id}">
          <div class="command-tag">${command.category}</div>
          <h3>${command.name}</h3>
          <p>${command.description || "No description available."}</p>
        </div>
      `;
    })
    .join("");
}

function renderSyntaxTree() {
  const command = getActiveCommand();
  if (!command) {
    elements.syntaxTree.innerHTML = "<div class=\"panel-sub\">Select a command to see syntax.</div>";
    return;
  }
  if (!command.syntax || !command.syntax.length) {
    elements.syntaxTree.innerHTML =
      "<div class=\"panel-sub\">Syntax data not loaded yet for this command.</div>";
    return;
  }

  const activeBranch = getActiveBranch();
  elements.syntaxTree.innerHTML = command.syntax
    .map((branch) => {
      const active = branch.id === activeBranch.id ? "active" : "";
      const description = branch.description
        ? `<div class="syntax-desc">${branch.description}</div>`
        : "";
      const argSummary = !branch.description && branch.args.length
        ? `<div class="syntax-desc">Args: ${branch.args.map((arg) => arg.label).join(", ")}</div>`
        : "";
      return `
        <div class="syntax-branch ${active}" data-branch-id="${branch.id}">
          ${branch.label}
          ${description || argSummary}
        </div>
      `;
    })
    .join("");
}

function renderCommandSummary() {
  const command = getActiveCommand();
  if (!command) {
    elements.commandSummary.innerHTML =
      "<div class=\"panel-sub\">Pick a command to see what it does.</div>";
    return;
  }

  const intents = command.intentTags.length ? command.intentTags.join(", ") : "None";
  elements.commandSummary.innerHTML = `
    <div><strong>${command.name}</strong> ${command.description || "No description available."}</div>
    <div>Intent: ${intents}</div>
  `;
}

function renderGuidedBuilder() {
  const command = getActiveCommand();
  const branch = getActiveBranch();
  if (!command || !branch) {
    elements.guidedSteps.innerHTML =
      "<div class=\"panel-sub\">Select a command with syntax data to build.</div>";
    elements.guidedOptions.innerHTML =
      "<div class=\"panel-sub\">No guided steps available yet.</div>";
    return;
  }

  if (!branch.args || !branch.args.length) {
    elements.guidedSteps.innerHTML =
      "<div class=\"panel-sub\">This command has no arguments. Ready to run.</div>";
    elements.guidedOptions.innerHTML =
      "<div class=\"panel-sub\">No argument options needed for this command.</div>";
    return;
  }

  if (!state.activeArgKey || !branch.args.some((arg) => arg.key === state.activeArgKey)) {
    state.activeArgKey = branch.args[0]?.key || null;
  }

  const activeArg = branch.args.find((arg) => arg.key === state.activeArgKey) || branch.args[0];
  const activeIndex = branch.args.findIndex((arg) => arg.key === activeArg.key);
  const totalSteps = branch.args.length;
  const progressPercent = totalSteps ? Math.round(((activeIndex + 1) / totalSteps) * 100) : 0;

  elements.guidedSteps.innerHTML = branch.args
    .map((arg, index) => {
      const value = state.builderInputs[arg.key];
      const active = arg.key === activeArg.key ? "active" : "";
      const complete = value ? "complete" : "";
      return `
        <button class="step-item ${active} ${complete}" data-step="${arg.key}" type="button">
          <div class="step-title">${index + 1}. ${arg.label}</div>
          <div class="step-meta">${arg.type}${arg.required ? " · required" : " · optional"}</div>
          <div class="step-value">${value || "Select a value"}</div>
        </button>
      `;
    })
    .join("");

  const helpText = ARG_KEY_HELP[activeArg.key] || activeArg.constraints || "";
  const placeholder = activeArg.placeholder || "";
  const currentValue = state.builderInputs[activeArg.key] || "";
  const progressBlock = `
    <div class="guided-progress">
      <div class="guided-progress-label">Step ${activeIndex + 1} of ${totalSteps}</div>
      <div class="guided-bar"><div class="guided-bar-fill" style="width: ${progressPercent}%"></div></div>
    </div>
  `;

  if (activeArg.type === "item" || activeArg.type === "entity" || activeArg.type === "block" || activeArg.type === "resource") {
    const registryOptions = getRegistryOptionsForArg(activeArg);
    if (!registryOptions.length) {
      const fallbackOptions = getOptionSetForArg(activeArg);
      const fallbackCards = fallbackOptions.length
        ? fallbackOptions
            .map(
              (option) => `
                <button class="option-card" data-option="${option.value}" data-arg="${activeArg.key}" type="button">
                  <div class="option-title">${option.value}</div>
                  <div class="option-desc">${option.description}</div>
                </button>
              `
            )
            .join("")
        : "<div class=\"panel-sub\">No preset options. Use a custom value.</div>";

      elements.guidedOptions.innerHTML = `
        <div class="guided-header">
          <div class="guided-title">Step ${activeIndex + 1}: ${activeArg.label}</div>
          <div class="guided-meta">${helpText}</div>
        </div>
        <div class="option-grid">${fallbackCards}</div>
        <div class="guided-custom">
          <label>Custom value</label>
          <div class="guided-custom-row">
            <input data-guided-input="true" data-arg="${activeArg.key}" value="${currentValue}" placeholder="${placeholder}" />
            <button class="chip" data-action="use-custom" data-arg="${activeArg.key}" type="button">Use</button>
          </div>
        </div>
      `;
      return;
    }

    const searchValue = state.optionSearch[activeArg.key] || "";
    const filtered = filterOptionList(registryOptions, searchValue);
    const limit = 80;
    const limited = filtered.slice(0, limit);
    const optionCards = limited.length
      ? limited
          .map(
            (option) => `
              <button class="option-card" data-option="${option.value}" data-arg="${activeArg.key}" type="button">
                <div class="option-title">${option.value}</div>
                <div class="option-desc">${option.description}</div>
              </button>
            `
          )
          .join("")
      : "<div class=\"panel-sub\">No matches. Adjust your search.</div>";

    elements.guidedOptions.innerHTML = `
      <div class="guided-header">
        <div class="guided-title">Step ${activeIndex + 1}: ${activeArg.label}</div>
        <div class="guided-meta">${helpText}</div>
      </div>
      ${progressBlock}
      <div class="guided-custom">
        <label>Search ${activeArg.type}</label>
        <div class="guided-custom-row">
          <input data-option-search="true" data-arg="${activeArg.key}" value="${escapeHtml(
            searchValue
          )}" placeholder="minecraft:diamond or Diamond" />
          <button class="chip chip-secondary" data-action="clear-search" data-arg="${activeArg.key}" type="button">Clear</button>
        </div>
        <div class="panel-sub">Showing ${Math.min(limit, filtered.length)} of ${filtered.length} results.</div>
      </div>
      <div class="option-grid scrollable">${optionCards}</div>
      <div class="guided-custom">
        <label>Custom value</label>
        <div class="guided-custom-row">
          <input data-guided-input="true" data-arg="${activeArg.key}" value="${currentValue}" placeholder="${placeholder}" />
          <button class="chip" data-action="use-custom" data-arg="${activeArg.key}" type="button">Use</button>
        </div>
      </div>
    `;
    return;
  }

  if (activeArg.type === "selector") {
    const draft = getSelectorDraft(activeArg.key);
    const selectorValue = buildSelectorFromDraft(draft);
    const baseCards = SELECTOR_BASE_OPTIONS.map(
      (option) => `
        <button class="option-card" data-selector-base="${option.value}" data-arg="${activeArg.key}" type="button">
          <div class="option-title">${option.value}</div>
          <div class="option-desc">${option.description}</div>
        </button>
      `
    ).join("");

    const filterCards = SELECTOR_FILTER_OPTIONS.map(
      (filter) => `
        <button class="option-card" data-selector-filter="true" data-arg="${activeArg.key}" data-filter-key="${filter.key}" data-filter-value="${filter.value}" type="button">
          <div class="option-title">${filter.key}=${filter.value}</div>
          <div class="option-desc">${filter.description}</div>
        </button>
      `
    ).join("");

    const filterRows = draft.filters.length
      ? draft.filters
          .map(
            (filter) => `
              <div class="filter-row">
                <div>${filter.key}=</div>
                <input data-filter-input="true" data-arg="${activeArg.key}" data-filter-key="${filter.key}" value="${filter.value}" />
                <button class="filter-remove" data-selector-remove="true" data-arg="${activeArg.key}" data-filter-key="${filter.key}" type="button">Remove</button>
              </div>
            `
          )
          .join("")
      : "<div class=\"panel-sub\">No filters applied yet.</div>";

    elements.guidedOptions.innerHTML = `
      <div class="guided-header">
        <div class="guided-title">Step ${activeIndex + 1}: ${activeArg.label}</div>
        <div class="guided-meta">${helpText}</div>
      </div>
      ${progressBlock}
      <div class="option-section">
        <div class="option-section-title">Base Selector</div>
        <div class="option-grid">${baseCards}</div>
      </div>
      <div class="option-section">
        <div class="option-section-title">Filters (all keys + examples)</div>
        <div class="option-grid">${filterCards}</div>
      </div>
      <div class="option-section">
        <div class="option-section-title">Current Selector</div>
        <div class="selector-preview">${escapeHtml(selectorValue || draft.base)}</div>
        <div class="filter-list">${filterRows}</div>
        <button class="chip" data-selector-apply="true" data-arg="${activeArg.key}" type="button">Use Selector</button>
      </div>
      <div class="guided-custom">
        <label>Custom selector</label>
        <div class="guided-custom-row">
          <input data-guided-input="true" data-arg="${activeArg.key}" value="${currentValue}" placeholder="${placeholder}" />
          <button class="chip" data-selector-custom="true" data-arg="${activeArg.key}" type="button">Use</button>
        </div>
      </div>
    `;
    return;
  }

  const options = getOptionSetForArg(activeArg);
  const optionCards = options.length
    ? options
        .map(
          (option) => `
            <button class="option-card" data-option="${option.value}" data-arg="${activeArg.key}" type="button">
              <div class="option-title">${option.value}</div>
              <div class="option-desc">${option.description}</div>
            </button>
          `
        )
        .join("")
    : "<div class=\"panel-sub\">No preset options. Use a custom value.</div>";

    elements.guidedOptions.innerHTML = `
      <div class="guided-header">
        <div class="guided-title">Step ${activeIndex + 1}: ${activeArg.label}</div>
        <div class="guided-meta">${helpText}</div>
      </div>
      ${progressBlock}
      <div class="option-grid">${optionCards}</div>
      <div class="guided-custom">
      <label>Custom value</label>
      <div class="guided-custom-row">
        <input data-guided-input="true" data-arg="${activeArg.key}" value="${currentValue}" placeholder="${placeholder}" />
        <button class="chip" data-action="use-custom" data-arg="${activeArg.key}" type="button">Use</button>
      </div>
    </div>
  `;
}

function getRegistryOptionsForArg(arg) {
  if (!externalData.registry) return [];
  const registry = externalData.registry;

  if (arg.registry && registry.registries && registry.registries[arg.registry]) {
    return registry.registries[arg.registry].map((value) => ({
      value,
      description: titleFromId(value)
    }));
  }

  if (arg.type === "item" && registry.items) {
    return registry.items.map((item) => ({
      value: item.id,
      description: item.displayName || item.id
    }));
  }

  if (arg.type === "entity" && registry.entities) {
    return registry.entities.map((entity) => ({
      value: entity.id,
      description: entity.displayName || entity.id
    }));
  }

  if (arg.type === "block" && registry.blocks) {
    return registry.blocks.map((block) => ({
      value: block.id,
      description: block.displayName || block.id
    }));
  }

  return [];
}

function filterOptionList(options, query) {
  if (!query) return options;
  const normalized = query.toLowerCase();
  return options.filter((option) => {
    return (
      option.value.toLowerCase().includes(normalized) ||
      option.description.toLowerCase().includes(normalized)
    );
  });
}

function getOptionSetForArg(arg) {
  if (arg.type === "enum") {
    return arg.options.map((value) => ({
      value,
      description: ARG_ENUM_DESCRIPTIONS[value] || "Select this option."
    }));
  }

  if (ARG_KEY_OPTIONS[arg.key]) {
    return ARG_KEY_OPTIONS[arg.key];
  }

  if (ARG_TYPE_OPTIONS[arg.type]) {
    return ARG_TYPE_OPTIONS[arg.type];
  }

  if (arg.examples && arg.examples.length) {
    return arg.examples.map((value) => ({ value, description: "Example value." }));
  }

  return [];
}

function renderSuggestions() {
  const options = new Set();
  getEditionCommands(state.edition).forEach((command) => {
    options.add(command.name);
    command.aliases.forEach((alias) => {
      options.add(alias.startsWith("/") ? alias : `/${alias}`);
    });
  });

  elements.searchSuggestions.innerHTML = [...options]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => `<option value="${value}"></option>`)
    .join("");
}

function renderCommandDetail() {
  const command = getActiveCommand();
  const branch = getActiveBranch();
  if (!command) {
    elements.commandDetail.innerHTML = "<div class=\"panel-sub\">Select a command to see details.</div>";
    return;
  }

  if (!branch) {
    elements.commandDetail.innerHTML = `
      <div class="detail-title">${command.name}</div>
      <div class="detail-meta">
        <span>Category: ${command.category}</span>
        <span>Permissions: ${command.permissions}</span>
        <span>Edition: ${state.edition}</span>
        <span>Source: ${command.source || "Local"}</span>
      </div>
      <div class="detail-description">${command.description || "No description available."}</div>
      <div class="panel-sub">Syntax data not loaded yet for this command.</div>
    `;
    return;
  }

  const summaryRows = branch.args
    .map((arg) => {
      const value = state.builderInputs[arg.key];
      const missing = arg.required && !value;
      const fallback = value || (arg.required ? `<${arg.key}>` : "[optional]");
      const help = ARG_KEY_HELP[arg.key] || arg.constraints || "";
      return `
        <div class="summary-row ${missing ? "missing" : ""}">
          <div class="summary-label">${arg.label} (${arg.type})</div>
          <div class="summary-desc">${help}</div>
          <div class="summary-value">${escapeHtml(fallback)}</div>
          ${missing ? `<div class="summary-status">Missing</div>` : ""}
        </div>
      `;
    })
    .join("");

  const branchNote = branch.description ? `<div class="detail-description">${branch.description}</div>` : "";
  const branchLabel = `<div class="detail-description"><strong>Syntax:</strong> ${escapeHtml(
    branch.label
  )}</div>`;
  const missingCount = branch.args.filter(
    (arg) => arg.required && !state.builderInputs[arg.key]
  ).length;
  const missingNote = missingCount
    ? `<div class="detail-description">Missing required fields: ${missingCount}</div>`
    : `<div class="detail-description">All required fields filled.</div>`;

  elements.commandDetail.innerHTML = `
    <div class="detail-title">${command.name}</div>
    <div class="detail-meta">
      <span>Category: ${command.category}</span>
      <span>Permissions: ${command.permissions}</span>
      <span>Edition: ${state.edition}</span>
      <span>Source: ${command.source || "Local"}</span>
    </div>
    <div class="detail-description">${command.description || "No description available."}</div>
    ${branchLabel}
    ${branchNote}
    ${missingNote}
    <div class="detail-section-title">Current Build</div>
    <div class="summary-list">${summaryRows}</div>
  `;
}

function renderBuilder() {
  const command = getActiveCommand();
  const branch = getActiveBranch();
  if (!command || !branch) {
    elements.builder.innerHTML = "<div class=\"panel-sub\">Pick a command to start building.</div>";
    return;
  }

  const output = buildOutput(command, branch);
  const outputClass = output.incomplete ? "builder-output incomplete" : "builder-output";
  const blockInfo =
    state.outputMode === "block"
      ? `
        <div class="output-note">
          Recommended block: <strong>${command.commandBlock.recommended}</strong><br />
          ${command.commandBlock.notes}
        </div>
      `
      : "";

  const copyDisabled = output.incomplete ? "disabled" : "";

  elements.builder.innerHTML = `
    <div class="${outputClass}" id="builder-output">${escapeHtml(output.text)}</div>
    <div class="builder-actions">
      <button class="chip" data-action="copy" ${copyDisabled}>Copy</button>
      <button class="chip chip-secondary" data-action="reset">Reset</button>
      <div class="output-note">${output.incomplete ? "Fill required fields." : "Ready to copy."}</div>
    </div>
    ${blockInfo}
  `;

  elements.builderTabs.forEach((tab) => {
    tab.setAttribute("aria-pressed", tab.dataset.output === state.outputMode ? "true" : "false");
  });
}

function renderBuilderInput(arg) {
  const value = state.builderInputs[arg.key] || "";
  let inputControl = "";
  const suggestions = (arg.options && arg.options.length ? arg.options : arg.examples) || [];

  if (arg.type === "enum") {
    const options = arg.options
      .map((option) => {
        const selected = option === value ? "selected" : "";
        return `<option value="${option}" ${selected}>${option}</option>`;
      })
      .join("");
    inputControl = `
      <select data-arg="${arg.key}">
        <option value="">Select...</option>
        ${options}
      </select>
    `;
  } else if (arg.type === "number") {
    inputControl = `<input type="number" data-arg="${arg.key}" value="${value}" placeholder="${
      arg.placeholder || ""
    }" />`;
  } else if (arg.type === "longtext") {
    inputControl = `<textarea rows="2" data-arg="${arg.key}" placeholder="${
      arg.placeholder || ""
    }">${value}</textarea>`;
  } else {
    inputControl = `<input type="text" data-arg="${arg.key}" value="${value}" placeholder="${ 
      arg.placeholder || ""
    }" />`;
  }

  const suggestionChips = suggestions.length
    ? `<div class="suggestion-chips">
        ${suggestions
          .map(
            (item) =>
              `<button type="button" class="suggestion-chip" data-arg="${arg.key}" data-suggestion="${item}">${item}</button>`
          )
          .join("")}
      </div>`
    : "";

  return `
    <div class="builder-input">
      <label>${arg.label}${arg.required ? " *" : ""}</label>
      ${inputControl}
      ${suggestionChips}
    </div>
  `;
}

function buildOutput(command, branch) {
  let incomplete = false;
  const parts = [command.name];

  branch.args.forEach((arg) => {
    const value = (state.builderInputs[arg.key] || "").trim();
    if (value) {
      parts.push(value);
    } else if (arg.required) {
      parts.push(`<${arg.key}>`);
      incomplete = true;
    }
  });

  return { text: parts.join(" "), incomplete };
}

function updateBuilderOutput() {
  const command = getActiveCommand();
  const branch = getActiveBranch();
  if (!command || !branch) return;

  const output = buildOutput(command, branch);
  const outputEl = document.getElementById("builder-output");
  if (!outputEl) return;

  outputEl.textContent = output.text;
  outputEl.classList.toggle("incomplete", output.incomplete);

  const copyButton = elements.builder.querySelector("[data-action='copy']");
  if (copyButton) {
    copyButton.disabled = output.incomplete;
  }

  renderCommandDetail();
}

function copyOutput() {
  const outputEl = document.getElementById("builder-output");
  if (!outputEl) return;
  const text = outputEl.textContent;
  navigator.clipboard.writeText(text).then(() => {
    setNotice("Copied command to clipboard.", "success");
  });
}

function updateEditionUI() {
  elements.editionButtons.forEach((button) => {
    const active = button.dataset.edition === state.edition;
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function updateOfflineUI() {
  elements.offlineToggle.setAttribute("aria-pressed", state.offlineSimulated ? "true" : "false");
  elements.offlineToggle.classList.toggle("active", state.offlineSimulated);
}

function setNotice(message, tone) {
  if (!message) return;
  state.notice = { message, tone };
  renderNotice();
  if (setNotice.timeout) {
    clearTimeout(setNotice.timeout);
  }
  setNotice.timeout = setTimeout(() => {
    state.notice = null;
    renderNotice();
  }, 4000);
}

function renderNotice() {
  const noteEl = elements.editionNote;
  noteEl.classList.remove("warn", "success");

  if (state.notice) {
    noteEl.textContent = state.notice.message;
    if (state.notice.tone) {
      noteEl.classList.add(state.notice.tone);
    }
    return;
  }

  if (state.offlineSimulated) {
    noteEl.textContent = "Offline mode: cached dataset loaded. Sync paused.";
    noteEl.classList.add("success");
    return;
  }

  noteEl.textContent = `Edition: ${state.edition} | Version: ${state.version}`;
}

init();
