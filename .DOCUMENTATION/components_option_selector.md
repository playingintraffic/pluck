# Options Selector

The Options Selector is a **focused, selection menu** used to present a short list of choices to the player.
It is designed for **quick decision-making** and pairs naturally with the Interaction Hint system.

Common use cases include:
- Item selection (equipment, consumables)
- Bait or ammo selection
- Contextual choices (fishing, crafting, interactions)
- Temporary action menus with limited options

---

## Overview

The Options Selector:
- Appears at the **top-center of the screen**
- Temporarily takes NUI focus
- Supports images, quantities, enabled/disabled states
- Executes `on_action` callbacks when an option is selected
- Is intentionally lightweight and transient

---

## Structure

```lua
exports.pluck:set_options("SELECT ITEM", {
    {
        id = "water",
        label = "Water",
        image = "/pluck/ui/assets/items/water.png",
        quantity = 5,
        enabled = true,
        on_action = function(data)
            -- Your logic here
        end
    }
})
```

---

## Option Fields

Each entry in the options array represents a selectable item.

| Key         | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `id`        | Unique identifier for the option.                              |
| `label`     | Display text shown in the list.                                |
| `image`     | Optional image icon for the option.                            |
| `quantity`  | Optional quantity value shown on the right.                    |
| `enabled`   | Optional: Whether the option can be selected. Default: `true`. |
| `on_action` | Optional: Function executed when selected. Receives `data`.    |

Disabled options are displayed but cannot be selected.

---

## Client Exports

### Set Options

```lua
exports.pluck:set_options(title, options)
```

Builds and sanitizes the selector options and sets focus.

| Parameter | Description                             |
| --------- | --------------------------------------- |
| `title`   | Title displayed at the top of the menu. |
| `options` | Array of option configuration tables.   |

This **does not automatically show** the selector.

---

### Show Options

```lua
exports.pluck:show_options()
```

Displays the options selector.

---

### Hide Options

```lua
exports.pluck:hide_options()
```

Hides the selector but keeps it in memory for reuse.

---

### Destroy Options Selector

```lua
exports.pluck:destroy_options_selector()
```

Fully removes the selector UI instance.

Use this when the selector will not be reused soon.

---

## Events

The same functionality is available via client events:

| Event Name                          | Description                      |
| ----------------------------------- | -------------------------------- |
| `pluck:cl:set_options`              | Sets selector title and options. |
| `pluck:cl:show_options`             | Shows the selector.              |
| `pluck:cl:hide_options`             | Hides the selector.              |
| `pluck:cl:destroy_options_selector` | Destroys the selector UI.        |

---

## on_action Callback

```lua
on_action = function(data)
    print("Selected option:", data.option_id)
end
```

The callback receives:

* `data.option_id` — the `id` of the selected option
* Any additional UI context provided internally

Functions are sanitized and safely executed client-side.

---

## Expected Usage Pattern

The Options Selector is typically paired with:

* An **Interaction Hint** to prompt input
* A **CreateThread** to manage closing or follow-up behavior

Example flow:

1. Show interaction hint (`Press E to select item`)
2. Open options selector
3. Handle selection
4. Hide or destroy selector
5. Restore normal gameplay

---

## Notes

* Selector automatically sets NUI focus
* ESC closes the selector by default
* Designed for **small, focused option sets**
* Supports images and quantities for inventory-style UIs
* Reusable across systems (inventory, fishing, crafting, equipment)
* Cleanly complements Interaction Hints and DUI workflows

---

## Example

```lua
exports.pluck:set_options("SELECT BAIT", {
    {
        id = "worm",
        label = "Worm",
        image = "/pluck/ui/assets/items/worm.png",
        quantity = 12,
        enabled = true,
        on_action = function(data)
            print("Bait selected:", data.option_id)
        end
    },
    {
        id = "lure",
        label = "Lure",
        image = "/pluck/ui/assets/items/lure.png",
        quantity = 0,
        enabled = false
    }
})

exports.pluck:show_options()
```