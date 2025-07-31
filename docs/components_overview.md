# Components

**PLUCK** includes a modular set of UI components that can be used across all layout regions - headers, footers, sidebars, and main content areas.
All components are reusable and position-independent unless otherwise stated.

---

## Cards (Column)

Cards are visual containers for presenting information or actions.

They support:

* Images, labels, and descriptions
* Embedded buttons and modal triggers
* Hover tooltips for additional info
* Column-based layout by default

**Usage:** Content only

---

## Input Groups

Grouped form elements organized under collapsible headers.

Features:

* Toggleable group headers
* Supports all common input types
* Pre-styled and responsive

**Usage:** Content only

---

## Cards (Row)

A horizontally scrolling variant of standard cards.

To enable:

* Set `layout.flex = "row"`
* Useful for carousels, item browsers, or horizontal menus

**Usage:** Content only

---

## Namecard

A compact identity block used to show player info.

Includes:

* Player name or title
* Optional avatar, tier, or badge
* Can appear in any layout region that supports user data

**Usage:** Header or Footer

---

## Notifications

Floating system alerts triggered by scripts or UI actions.

Supports:

* Visual theming by type or rarity
* Optional icons, shadows, and dismiss logic
* Can auto-hide or persist

**Usage:** Global only

---

## Modal

A centered popup for input, confirmation, or interaction.

Features:

* Custom title, fields, and buttons
* Dataset support for advanced logic
* Can be triggered from buttons or hotkeys

**Usage:** Global only (triggered from components)

---

## Buttons

Versatile action elements usable in any region.

Supports:

* Callback or dataset handling
* Inline modal triggers
* `should_close` flag to auto-close UI

**Usage:** Header, Footer, Content, Sidebar, Modals

---

## Usage Summary

| Component    | Header | Footer | Content | Sidebar |
| ------------ | ------ | ------ | ------- | ------- |
| Cards        | ✖️     | ✖️     | ✅       | ✖️      |
| Input Groups | ✖️     | ✖️     | ✅       | ✖️      |
| Namecard     | ✅      | ✅      | ✖️      | ✖️      |
| Buttons      | ✅      | ✅      | ✅       | ✅       |

> **Note:** Notifications and Modals are global - they are not placed within layout sections directly.