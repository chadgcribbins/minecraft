# Minecraft Command Explorer  
**Product Descriptor Document (Pre-PRD)**

---

## 1. Product Overview

**Minecraft Command Explorer** is a web-based, offline-capable interactive reference and builder for Minecraft commands.  
It supports both **Java** and **Bedrock** editions, starting with the **latest versions**, and allows users to explore, understand, and construct valid commands through a deeply Minecraft-native interface.

The product is not a static wiki. It is a **living command system explorer**, combining exhaustive command coverage, syntax trees, a guided builder, and command-block–ready outputs, all wrapped in a cohesive “Minecraft universe” UI.

---

## 2. Core Goals

- Provide an **exhaustive, accurate command reference** per edition and version
- Make complex commands **discoverable, explorable, and understandable**
- Enable users to **build valid commands step-by-step**
- Support **offline-first usage** with online syncing
- Feel unmistakably like part of the **Minecraft universe**, not a generic dev tool

---

## 3. Target Users

- Advanced players and redstone engineers
- Server admins and operators
- Datapack creators
- Educators teaching Minecraft logic or commands
- Curious players transitioning from basic to advanced command use

---

## 4. Platform & Delivery

- **Primary platform:** Web app
- **Offline-first:** Yes
  - Works fully offline once loaded
  - Syncs datasets online when updates are available
- **Installable:** Progressive Web App (PWA-style experience)

---

## 5. Editions & Versions

### Editions
- Java Edition
- Bedrock Edition

### Versioning
- Start with **Latest** only
- Architecture supports historical versions later
- Version selector is present from day one, even if initially populated with only “Latest”

---

## 6. Global Context Model

Two global selectors define the entire app state:

1. **Edition Selector**
   - Java | Bedrock
   - Re-orients all commands, syntax, examples, and builders

2. **Version Selector**
   - Latest (initially)
   - Later supports historical versions and diffs

Both selectors:
- Persist across navigation
- Affect search, browsing, and command output
- Are encoded in routing so URLs are shareable

---

## 7. Command Coverage Philosophy

Commands are treated as **trees**, not flat lists.

Each command includes:
- All valid subcommand branches
- Argument positions and types
- Constraints, enums, and requirements
- Edition- and version-specific behavior

The system favors **authoritative, structured sources** over narrative-only documentation.

---

## 8. Command Data Model (Conceptual)

Each command node may include:

- Canonical name
- Aliases
- Edition(s)
- Version range
- Permission requirements
- Syntax tree (branches + arguments)
- Argument definitions:
  - type
  - constraints
  - valid values
  - examples
- Behavioral notes
- Common usage patterns
- Known gotchas
- Related commands
- Intent tags (semantic meaning)

---

## 9. “Closest Equivalent” Behavior (Edition Switching)

When switching between Java and Bedrock:

### Mapping Strategy (Hybrid)
1. **Heuristic matching**
   - Exact name match
   - Alias match
   - Shared intent tags
   - Similar argument structures

2. **Curated overrides**
   - Hand-maintained mappings for important edge cases
   - Small, high-impact list

3. **Graceful fallback**
   - If no equivalent exists:
     - Show an in-universe notification
     - Redirect to closest related command or category
     - Never dead-end the user

### UX Principle
Switching editions should feel **intelligent and respectful of user intent**, not disruptive.

---

## 10. Navigation & Information Architecture

### Global Layout
- **Top Bar**
  - Edition selector
  - Version selector
  - Search bar

- **Left Panel**
  - Command categories (Admin, World, Entities, Items, Time, Scoreboard, etc.)

- **Center Panel**
  - Command list or syntax tree branches
  - Displayed as inventory-style tiles

- **Right Panel**
  - Command details and builder

---

## 11. Visual & Interaction Design

### Core UI Metaphor
**Enchanting Table / Book UI** as the primary metaphor  
**Inventory UI** as a secondary, interactive metaphor

### Rationale
- Commands represent knowledge and power, not objects
- The enchanting/book metaphor supports depth, focus, and discovery
- Inventory slots work well for modular selection and construction

---

## 12. Visual System

### Typography
- Pixel or Minecraft-style font for headers
- Highly readable sans-serif for body text
- Monospace for command syntax

### Panels & Components
- 9-slice framed panels
- Chunky Minecraft-style buttons
- Inventory slot tiles
- Tooltip cards styled like item tooltips
- Subtle “enchantment glint” highlight for active selections

### Iconography
Pixel-style icons for:
- Command domains (world, entities, players, items, time)
- Argument types (selector, position, enum, range)
- Warnings and requirements (OP-only, cheats required)

---

## 13. Command Detail View

Each command page includes:

- **Description**
- **Permission & requirements**
- **Syntax Tree Explorer**
  - Clickable branch tiles
  - Breadcrumb path display
- **Argument Inspector**
  - One card per argument
  - Type, rules, and examples
- **Examples**
  - Minimal
  - Common patterns
  - Copy-to-clipboard actions

---

## 14. Command Builder

### Builder Philosophy
- Guided, step-by-step construction
- No invalid states
- Context-aware inputs

### Builder Flow
1. Select a syntax branch
2. Fill argument slots
3. Review generated output

### Argument Inputs
- Selector builders for `@p`, `@e[...]`
- Coordinate helpers for absolute and relative positions
- Dropdowns for enums
- Numeric fields or sliders for ranges

---

## 15. Output Modes

Builder outputs support multiple formats:

### 1. Chat Command
- Single-line, paste-ready

### 2. Command Block Mode
- Same command plus:
  - Recommended block type (Impulse, Repeat, Chain)
  - Notes on redstone or chaining
  - Optional chain-friendly formatting

### 3. Future (Optional)
- `.mcfunction` file output for datapacks

---

## 16. Offline-First Architecture

### Local Storage
- Command datasets
- Search index
- UI assets
- Favorites and recent commands

### Sync Strategy
- Lightweight online manifest check
- Dataset hash comparison
- Background update download
- Swap in new data on next session or via prompt

---

## 17. Search & Discovery

- Instant search across:
  - Command names
  - Aliases
  - Intent tags
- Autocomplete suggestions
- Edition- and version-aware results
- Search results displayed as inventory tiles

---

## 18. MVP Scope

### MVP 1
- Web app shell
- Edition + Version selectors
- Command list and search
- Command detail pages
- Syntax tree explorer
- Examples with copy

### MVP 2
- Command builder for most-used commands
- Command block output tab
- Favorites (local)

### MVP 3
- Full builder coverage
- Validator (paste a command, highlight errors)
- Version history selector and diffs

---

## 19. Non-Goals (Initial)

- Multiplayer or account features
- In-game mod integration
- Real-time server execution
- Tutorials or walkthrough campaigns

---

## 20. Success Criteria

- Users can discover valid command syntax without external references
- Edition switching feels “smart” and trustworthy
- Advanced users trust the tool for correctness
- App feels unmistakably Minecraft-native
- Works reliably offline

---

## 21. Open Questions (For PRD Refinement)

- Exact visual inspiration weighting (lectern vs enchanting table)
- Sound effects on interactions (on/off)
- Depth of validator logic in early versions
- How aggressively to surface version differences

---