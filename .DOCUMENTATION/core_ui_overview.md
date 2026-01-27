# Core UI

PLUCK's core UI system is modular and flexible, providing the foundational structure for any interface.  
All core layout elements are defined in `core/`, while reusable widgets live in `components/`.

---

## Overview

The core UI consists of:

* **Header** – Top-level bar for branding, navigation, controls, or info.
* **Footer** – Bottom bar for action buttons, keybinds, and status text.
* **Sidebar** – Optional vertical navigation menu with expandable categories.
* **Content** – Main working area for actual UI logic and components.
* **Tooltip** – Dynamic hover-based info system for cards, inputs, and more.

All layout zones are flexible and support freely positioned components - you are not locked to any fixed arrangement.

---

## Header

Typically used for:

* Branding (logo, title)
* Navigation tabs or breadcrumb trails
* Controls (Save, Exit, etc.)
* Player info (e.g., name, avatar)

All header areas are modular - you can add, remove, or reposition elements as needed.

---

## Content

The main UI area.  
Supports flexible layouts and dynamic components. Two core content types are included:

### Cards

* Grid layout
* Supports:
  * Image
  * Labels
  * Tooltips
  * Click actions
* Ideal for:
  * Crafting menus
  * Vehicle shops
  * Inventory viewers

### Input Groups

* Grouped form-style elements
* Supports collapsible containers
* Ideal for:
  * Clothing editors
  * Customization panels
  * Admin input forms

You can build your own layouts or extend these base types.

---

## Tooltip

Reusable hover info box.  
Originally designed for inventory UIs, now global.

* Shows:
  * Description
  * Metadata
  * Value pairs
  * Tags/rarity
* Also supports hover actions (e.g., press E to use)
* Works with any component, not just cards

---

## Sidebar

Optional vertical menu system.  
Ideal for tools, editors, or admin interfaces.

* Labeled sections
* Each section includes items
* Each item can:
  * Trigger actions
  * Open submenus
  * Switch views

Designed for deep toolsets and nested options.

---

## Footer

Bottom action bar. Common uses:

* Action buttons (Save, Cancel, Deploy)
* Status messages or indicators
* Keybinds like:
  * ESC = Close
  * E = Confirm

All content is modular - buttons, text, and keybind displays can be added or removed freely.

---

## Layout Recap

| Area     | Purpose                             |
|----------|-------------------------------------|
| Header   | Branding, nav, controls             |
| Footer   | Actions, keybinds, messaging        |
| Content  | Main interface view (multi-pane)    |
| Sidebar  | Optional expandable nav/menu        |
| Tooltip  | Hover-driven info display           |

All sections are fully modular and support custom components.