# DUI Sprite

DUI Sprites are **world-space UI elements** rendered using GTA’s DUI system.
Unlike standard NUI, they are **not fixed to the screen** — instead, they exist in the game world and respond to player proximity and interaction.

They are commonly used for:
- World interactions
- Object prompts
- Floating info panels
- Context-sensitive key actions

---

## Overview

A DUI Sprite:
- Renders an interactive UI at a world position
- Uses `DrawInteractiveSprite`
- Supports key-based interactions
- Can be gated by access checks
- Automatically handles focus, updates, and proximity

---

## Structure

```lua
core.add_dui_zone({
    id = "example_zone",
    coords = vec3(0.0, 0.0, 0.0),
    header = "Example DUI",
    image = "/ui/assets/example.png",
    icon = "fa-solid fa-hand",
    keys = {
        {
            key = "E",
            label = "Interact",
            on_action = function()
                -- Your logic here
            end
        }
    },
    outline = true,
    model = "prop_example",
    can_access = function()
        return true
    end,
    additional = {}
})
````

Each DUI zone represents a **single floating UI instance** in the world.

---

## Zone Fields

| Key          | Description                                                      |
| ------------ | ---------------------------------------------------------------- |
| `id`         | Unique identifier for the DUI zone.                              |
| `coords`     | World coordinates where the UI is rendered.                      |
| `header`     | Title text displayed in the DUI.                                 |
| `image`      | Optional image path displayed in the UI.                         |
| `icon`       | Optional Font Awesome icon.                                      |
| `keys`       | Array of key interaction objects.                                |
| `outline`    | Optional: Enables outline highlighting on the associated entity. |
| `model`      | Optional: Model name used to find a nearby entity for outlining. |
| `can_access` | Optional: Function that determines visibility access.            |
| `additional` | Optional: Extra data passed into the UI layer.                   |

---

## Key Interactions

Keys define **input-driven actions** when the player is within range.

```lua
keys = {
    {
        key = "E",
        label = "Open",
        on_action = function()
            print("Key pressed")
        end
    }
}
```

### Key Fields

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| `key`       | Keyboard key (case-insensitive, e.g. `"E"`). |
| `label`     | Text displayed next to the key prompt.       |
| `on_action` | Function executed when the key is released.  |

* Keys are mapped internally to control IDs.
* Multiple keys per DUI zone are supported.

---

## Access Control

The `can_access` function allows conditional visibility:

```lua
can_access = function()
    return PlayerData.job == "police"
end
```

* Checked every 2 seconds
* Failures automatically hide the DUI
* Errors are safely handled via `pcall`

---

## Additional Payload

The `additional` field allows sending **arbitrary structured data** to the DUI UI:

```lua
additional = {
    progressbars = {
        strength = { label = "Strength", value = 75 }
    },
    values = {
        rank = { label = "Rank", value = "Sergeant" }
    }
}
```

This data is passed directly to the UI layer and can be rendered however needed.

---

## Client Exports

### Add a DUI Zone

```lua
exports.pluck:add_dui_zone(options)
```

Adds a new floating DUI instance.

---

### Remove a DUI Zone

```lua
exports.pluck:remove_dui_zone(id)
```

Removes and destroys an existing DUI zone.

---

## Live Updates

DUI zones can be updated dynamically from the server:

```lua
TriggerEvent("pluck:cl:sync_dui_data", zone_id, {
    header = "Updated Header",
    is_hidden = true
})
```

Supported updates include:

* `header`
* `image`
* `icon`
* `keys`
* `outline`
* `is_hidden`
* `is_destroyed`
* `additional`

Changes are diffed and only re-sent when necessary.

---

## Proximity & Rendering

* DUI sprites render within **1.5 units**
* Rendering is suspended when out of range
* Input polling only occurs while nearby
* Automatic performance throttling is applied

---

## Entity Outlines

If `outline` and `model` are defined:

* The closest matching entity is outlined
* Outline toggles automatically on proximity
* Uses native GTA outline shaders

---

## Notes

* DUI uses a shared HTML entry point (`index.html`)
* UI updates are diffed to avoid spam
* Focus is never stolen from the player
* Supports unlimited concurrent DUI zones
* Safe for high-frequency world interaction use
* Designed for immersive, diegetic UI workflows

---

## Example

```lua
core.add_dui_zone({
    id = "store_prompt",
    coords = coords,
    header = "Open Store",
    keys = {
        {
            key = "E",
            label = "Open Store",
            on_action = function()
                TriggerEvent("pluck:cl:sync_dui_data", "store_prompt", { is_hidden = true })
            end
        }
    }
})
```