# Interaction Hint

Interaction Hints are **lightweight, non-blocking UI prompts** used to inform the player about
available actions, item states, or contextual interactions.

They are **display-only** components:
- They do **not** handle input
- You are expected to manage keypress logic yourself (usually in a `CreateThread`)
- Designed for quick, readable feedback near the HUD

Common use cases:
- Item equipped / unequipped states
- “Press E to interact” prompts
- Quantity or status feedback
- Temporary contextual instructions

---

## Overview

The Interaction Hint system supports:
- Dynamic text updates
- Optional images
- Quantity counters
- Action text
- Clear vs destroy lifecycle control

It is intentionally simple and flexible.

---

## Structure

```lua
exports.pluck:update_interaction_hint({
    image = "/ui/assets/items/water.png",
    label = "Water Bottle",
    quantity = 5,
    status_text = "Equipped",
    action_text = "Press F to drink or E to change"
})
```

---

## Hint Fields

| Key           | Description                                           |
| ------------- | ----------------------------------------------------- |
| `image`       | Optional image path shown on the left side.           |
| `label`       | Main label text (item name or interaction title).     |
| `quantity`    | Optional numeric value displayed next to the label.   |
| `status_text` | Optional secondary status text (e.g. equipped state). |
| `action_text` | Optional instruction text shown below the label.      |

All fields are optional, but at least one should be provided for the hint to be meaningful.

---

## Client Exports

### Update Interaction Hint

```lua
exports.pluck:update_interaction_hint(data)
```

Updates or shows the interaction hint.

```lua
exports.pluck:update_interaction_hint({
    label = "No Item Equipped",
    action_text = "Press E to equip item"
})
```

---

### Update Quantity Only

```lua
exports.pluck:update_hint_quantity(amount)
```

Updates the quantity value without rebuilding the full hint.

```lua
exports.pluck:update_hint_quantity(2)
```

---

### Clear Interaction Hint

```lua
exports.pluck:clear_interaction_hint()
```

Clears the displayed hint but keeps the UI instance alive for reuse.

---

### Destroy Interaction Hint

```lua
exports.pluck:destroy_interaction_hint()
```

Fully removes the interaction hint UI instance.

Use this when the hint will not be needed again for a while.

---

## Events

The same functionality is available via client events:

| Event Name                          | Description                |
| ----------------------------------- | -------------------------- |
| `pluck:cl:update_interaction_hint`  | Shows or updates the hint. |
| `pluck:cl:update_hint_quantity`     | Updates quantity only.     |
| `pluck:cl:clear_interaction_hint`   | Clears the hint.           |
| `pluck:cl:destroy_interaction_hint` | Destroys the hint UI.      |

---

## Input Handling (Expected Usage)

Interaction Hints **do not handle key input**.

Typical usage pattern:

```lua
exports.pluck:update_interaction_hint({
    label = "Water Bottle",
    quantity = 1,
    action_text = "Press E to drink"
})

CreateThread(function()
    while true do
        if IsControlJustReleased(0, 38) then -- E
            -- Handle interaction
            exports.pluck:clear_interaction_hint()
            break
        end
        Wait(0)
    end
end)
```

This keeps input logic:

* Explicit
* Context-aware
* Easy to clean up

---

## Notes

* Interaction Hints are **purely visual**
* No focus is taken from the player
* Safe to update frequently
* Designed for fast, contextual feedback
* Ideal companion for DUI, world interactions, and item systems
* Clear vs Destroy lets you control reuse vs teardown

---

## Example

```lua
exports.pluck:update_interaction_hint({
    label = "No Item Equipped",
    action_text = "Press E to equip item"
})
```