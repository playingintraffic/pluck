````md
# Content

The `content` section defines the **main UI area**, supporting **left**, **center**, and **right** regions.  
Each region can display structured components like input groups, cards, or slots, and the layout is fully configurable.

It acts as the core of your UI layout system, with full support for modular pages and responsive content updates.

---

## Configuration

Each content page consists of:

* `index`: (optional) Determines order or default tab position.
* `title`: Displayed in tabs or page headers.
* `layout`: Defines column spans (`left`, `center`, `right`).
* `left`, `center`, `right`: Each region may contain a component block.

```lua
content = {
    pages = {
        my_page = {
            title = "My Page",
            index = 1,
            layout = { left = 2, center = 6, right = 4 },
            left = { type = "cards", title = "Left Section", cards = { ... } },
            center = { type = "input_groups", title = "Center Section", groups = { ... } },
            right = { type = "slots", title = "Right Section", slot_count = 20 }
        }
    }
}
````

---

## Content Types

### Cards

Used for displaying visual blocks with optional images, descriptions, hover tooltips, and buttons.

```lua
{
    type = "cards",
    layout = { columns = 1, flex = "row", scroll_x = "scroll", scroll_y = "scroll" },
    title = "Right Section",
    cards = {
        {
            image = "https://placehold.co/64x64",
            title = "Card In Row",
            description = "Card Description.",
            layout = "row",
            on_hover = {
                title = "Card Info",
                description = {
                    "Info descriptions can support arrays",
                    "* like so",
                    "* you get the idea"
                },
                values = {
                    { key = "Key", value = "Value Pairs" },
                    { key = "Name", value = "Case" }
                },
                actions = {
                    {
                        id = "test_action",
                        key = "E",
                        label = "Action on Keypress",
                        on_keypress = function(data) ... end
                    }
                },
                rarity = "common"
            },
            buttons = {
                {
                    id = "modal_btn",
                    label = "Modal Button",
                    class = "primary",
                    on_action = function(data) ... end
                }
            }
        }
    }
}
```

---

### Input Groups

Used to organize structured form inputs into expandable groupings.

```lua
{
    type = "input_groups",
    title = "Input Groups",
    layout = { columns = 1 },
    groups = {
        {
            header = "Some Options",
            expandable = false,
            inputs = {
                { id = "opt_1", type = "text", label = "Some Option" },
                { id = "opt_2", type = "number", label = "Another Option" }
            }
        }
    }
}
```

---

### Slots

The **Slots** content type provides a flexible, grid-based slot system used for inventories, equipment, loadouts, or world containers.

Slots support:

* Grouped or flat layouts
* Fixed grids or free-positioned layouts
* Items with images, quantities, progress bars, and hover data
* Collapsible sections
* Drag-and-drop–ready structures

This section is intentionally brief see the dedicated **Slots** documentation for full details.

---

#### Basic Slots (Grid)

```lua
{
    type = "slots",
    title = { text = "Inventory" },
    slot_count = 24,
    columns = 6,
    slot_size = "80px",
    items = {
        ["1"] = {
            id = "water",
            image = "/ui/assets/items/water.png",
            quantity = 5
        }
    }
}
```

---

#### Grouped Slots

```lua
{
    type = "slots",
    title = { text = "Equipment" },
    groups = {
        {
            id = "backpack",
            title = "Backpack",
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

---

#### Positioned Slots (Paper-Doll Style)

```lua
{
    type = "slots",
    groups = {
        {
            id = "loadout",
            layout_type = "positioned",
            collapsible = false,
            slots = {
                { id = "hat", label = "Hat", position = { top = "0%", left = "0%" }, size = "80px" },
                { id = "shoes", label = "Shoes", position = { bottom = "0%", right = "0%" }, size = "80px" }
            },
            items = {}
        }
    }
}
```