# Slot Popup

The **Slot Popup** is a lightweight, animated notification component designed to visually
indicate **item changes** in slot-based systems.

It matches the visual style of the **Slots** inventory component and is intended for
**non-intrusive feedback**, such as item pickups, removals, or transfers.

This component is **display-only** and does not handle interaction or input.

---

## Overview

Slot Popups:
- Appear briefly on screen (top-center by default)
- Animate in and out automatically
- Support item images, quantities, actions, and rarity styling
- Are safe to trigger rapidly or in batches
- Do not take focus or block gameplay

They are ideal for reinforcing inventory actions without opening UI panels.

---

## Triggering a Slot Popup

Slot Popups are triggered via a unified export on both **server** and **client**, matching the rest of the PLUCK API.

---

## Server-side Usage

```lua
exports.pluck:slot_popup(source, {
    item_id = "water",
    image = "/ui/assets/items/water.png",
    quantity = 5,
    action = "added",
    rarity = "common"
})
```

| Parameter | Description               |
| --------- | ------------------------- |
| `source`  | Player source ID.         |
| `data`    | Slot popup payload table. |

---

## Client-side Usage

```lua
exports.pluck:slot_popup({
    item_id = "weapon_pistol",
    image = "/ui/assets/items/weapon_pistol.png",
    quantity = 1,
    action = "added",
    rarity = "rare"
})
```

This sends the popup directly to the local UI.

---

## Popup Data Fields

| Key        | Description                                          |
| ---------- | ---------------------------------------------------- |
| `item_id`  | Item identifier (informational only).                |
| `image`    | Item image path.                                     |
| `quantity` | Quantity change amount.                              |
| `action`   | `"added"` or `"removed"`.                            |
| `rarity`   | Optional rarity styling (`common`, `uncommon`, `rare`, `epic`, `legendary`). |

---

## Action Behavior

| Action    | Visual Result                  |
| --------- | ------------------------------ |
| `added`   | `+` quantity, positive styling |
| `removed` | `-` quantity, negative styling |

The popup automatically:

* Displays the correct symbol (`+` or `-`)
* Applies the correct animation and color styling
* Removes itself after the animation completes

---

## Example (Multiple Popups)

```lua
local test_items = {
    { item_id = "water", image = "/ui/assets/items/water.png", quantity = 5, action = "added", rarity = "common" },
    { item_id = "weapon_pistol", image = "/ui/assets/items/weapon_pistol.png", quantity = 1, action = "added", rarity = "rare" },
    { item_id = "cash", image = "/ui/assets/items/cash.png", quantity = 100, action = "removed", rarity = "uncommon" },
    { item_id = "ammo_9mm", image = "/ui/assets/items/ammo_9mm.png", quantity = 50, action = "added", rarity = "legendary" }
}

CreateThread(function()
    for _, item in ipairs(test_items) do
        exports.pluck:slot_popup(item)
        Wait(5000)
    end
end)
```

---

## Notes

* Slot Popups are **purely visual**
* No focus or input handling
* Styling is driven by `action` and `rarity`
* Designed to complement the **Slots** inventory system
* Ideal for pickups, drops, crafting results, and transfers
* Consistent export-based API with other PLUCK UI components

---

## Typical Use Cases

* Loot pickup notifications
* Item consumption feedback
* Inventory transfers
* Crafting outputs
* Reward indicators