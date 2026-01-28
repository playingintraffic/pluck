# Slots

The **Slots** system is a flexible, inventory-ready UI component designed to handle
**items, equipment, loadouts, containers, and world storage**.

It is the same system used in my paid **Inventory System** resource, released here as a
standalone class for free use.  
Everything shown here is production-proven and actively used.

Slots are intentionally **data-driven** — interaction logic (dragging, using, swapping, keybinds)
is expected to be handled externally.

---

## Overview

Slots support:

- Grid-based inventories
- Grouped containers (bags, vests, pockets, etc.)
- World / vicinity inventories
- Paper-doll / positioned loadouts
- Item metadata (quantity, progress, rarity, hover info)
- Collapsible sections
- Mixed layouts in the same page

They can be placed in **any content region** (`left`, `center`, `right`).

---

## Basic Structure

```lua
{
    type = "slots",
    title = { text = "Inventory" },
    slot_count = 24,
    columns = 6,
    slot_size = "80px",
    items = {}
}
```

---

## Slot Container Fields

| Key                 | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `type`              | Must be `"slots"`.                                      |
| `title`             | Optional header `{ text, span }`.                       |
| `layout`            | Optional layout overrides (columns, slot size, scroll). |
| `slot_count`        | Total number of slots in the container.                 |
| `columns`           | Number of columns in the grid.                          |
| `slot_size`         | CSS size of each slot (`"64px"`, `"80px"`, etc).        |
| `groups`            | Optional array of slot groups.                          |
| `items`             | Table of items keyed by slot index.                     |
| `show_slot_numbers` | Optional: Displays slot indices.                        |

---

## Items

Items are assigned to slots using **string-based indices**:

```lua
items = {
    ["1"] = {
        id = "water",
        image = "/pluck/ui/assets/items/water.png",
        quantity = 5
    }
}
```

### Item Fields

| Key        | Description                                 |
| ---------- | ------------------------------------------- |
| `id`       | Unique item identifier.                     |
| `image`    | Image path for the item icon.               |
| `quantity` | Optional stack count.                       |
| `category` | Optional category string (used externally). |
| `progress` | Optional progress bar `{ value = number }`. |
| `on_hover` | Optional hover tooltip configuration.       |

---

## Hover Data

```lua
on_hover = {
    title = "9mm Pistol",
    description = {
        "Standard sidearm",
        "Caliber: 9mm"
    },
    rarity = "uncommon"
}
```

Hover data is purely visual and can include:

* Title
* Multi-line descriptions
* Rarity styling
* Value lists (if supported by UI theme)

---

## Grouped Slots

Slot groups are used for **containers within containers**:
bags, vests, pockets, belts, etc.

```lua
{
    type = "slots",
    title = { text = "Equipment" },
    groups = {
        {
            id = "backpack",
            title = "Backpack",
            span = "20/20",
            slot_count = 24,
            columns = 6,
            slot_size = "80px",
            collapsible = true,
            collapsed = false,
            items = {}
        }
    }
}
```

### Group Fields

| Key           | Description                                     |
| ------------- | ----------------------------------------------- |
| `id`          | Unique group ID.                                |
| `title`       | Group header text.                              |
| `span`        | Optional secondary header text (weight, count). |
| `slot_count`  | Number of slots in the group.                   |
| `columns`     | Grid columns for the group.                     |
| `slot_size`   | Slot size override.                             |
| `collapsible` | Allows collapsing the group.                    |
| `collapsed`   | Initial collapsed state.                        |
| `items`       | Items within this group.                        |

---

## Positioned Slots (Paper-Doll)

Positioned slots are used for **loadouts or character equipment layouts**.

```lua
{
    type = "slots",
    groups = {
        {
            id = "loadout",
            layout_type = "positioned",
            collapsible = false,
            slots = {
                {
                    id = "hat",
                    label = "Hat",
                    position = { top = "0%", left = "0%" },
                    size = "80px"
                },
                {
                    id = "shoes",
                    label = "Shoes",
                    position = { bottom = "0%", right = "0%" },
                    size = "80px"
                }
            },
            items = {}
        }
    }
}
```

### Positioned Slot Fields

| Key        | Description                              |
| ---------- | ---------------------------------------- |
| `id`       | Slot identifier (not numeric).           |
| `label`    | Optional display label.                  |
| `position` | CSS-style position (`top`, `left`, etc). |
| `size`     | Slot size override.                      |

Used commonly for:

* Clothing
* Loadouts
* Equipment toggles

---

## Layout Overrides

Slots respect the parent content layout but can override:

```lua
layout = {
    columns = 6,
    scroll_y = "scroll"
}
```

---

## Interaction Model (Important)

Slots **do not** enforce gameplay rules.

They only provide:

* Visual structure
* Item placement
* Hover metadata
* State rendering

You are expected to handle:

* Drag & drop logic
* Swapping items
* Using items
* Validation rules
* Networking

This keeps the system:

* Framework-agnostic
* Easy to integrate
* Extremely flexible

---

## Performance Notes

* Slot updates are diffed internally
* Large inventories are safe
* Collapsing groups reduces render cost
* Designed for frequent updates

---

## Notes

* Used in production inventory systems
* Supports inventories, loadouts, containers, and world items
* Can coexist with **Interaction Hints**, **Options Selector**, and **DUI**
* One system — many inventory styles
* Fully UI-driven, logic-agnostic by design

---

## Example (Simple Inventory)

```lua
{
    type = "slots",
    title = { text = "Backpack" },
    slot_count = 16,
    columns = 4,
    items = {
        ["1"] = { id = "bread", image = "/pluck/ui/assets/items/bread.png", quantity = 3 },
        ["2"] = { id = "water", image = "/pluck/ui/assets/items/water.png", quantity = 1 }
    }
}
```