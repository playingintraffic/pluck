# Tooltip

The `tooltip` is a **hover-based information popup system** designed for cards, inputs, buttons, or any UI element. 
It dynamically displays metadata, descriptions, tags, and interactive keybinds.

---

## Structure

Tooltips are defined inline using the `on_hover` property inside any component (typically `cards` or `buttons`):

```lua
on_hover = {
    title = "Card Info",
    description = {
        "This tooltip is made of",
        "- multiple lines",
        "- and supports arrays"
    },
    values = {
        { key = "Key", value = "Value" },
        { key = "Owner", value = "Case" }
    },
    actions = {
        { id = "test_action", key = "E", label = "Trigger Action" }
    },
    rarity = "rare",
    tags = { "equipable", "consumable" }
}
```

You can attach `on_hover` to any supported UI element - tooltips are auto-rendered and styled by the system.

---

## Supported Fields

| Field         | Description                                                              |
| ------------- | ------------------------------------------------------------------------ |
| `title`       | Large heading for the tooltip block.                                     |
| `description` | Array of lines or a single string of descriptive text.                   |
| `values`      | Key/value metadata list (displayed vertically).                          |
| `actions`     | List of keybind hints (`E = Use`, etc) with optional `on_keypress`.      |
| `rarity`      | Highlights the border and title with a colored style (`common`, `rare`). |
| `tags`        | Visual tags (chips) rendered at the bottom of the tooltip.               |

Each field is optional. Layout and rendering are handled automatically.

---

## Keybind Actions

Tooltips can include `actions` like:

```lua
actions = {
    { id = "use_item", key = "E", label = "Use" },
    { id = "inspect_item", key = "F", label = "Inspect" }
}
```

These appear as inline hints and can trigger logic when a key is pressed while hovered.

---

## Usage Examples

You’ll most commonly use tooltips with:

* **Cards**: for showing item info, stats, rarity, or actions

Tooltips improve UX and reduce the need for always-visible UI clutter.

---

Let me know when you're ready to do the next module or want this bundled into a unified export.