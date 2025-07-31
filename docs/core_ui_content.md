# Content

The `content` section defines the **main UI area**, supporting **left**, **center**, and **right** regions.  
Each region can display structured components like input groups or cards, and the layout is fully configurable.

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
            right = { type = "cards", title = "Right Section", cards = { ... } }
        }
    }
}
```

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
                    on_action = function(data) ... end,
                    dataset = {
                        target_id = "example_card",
                        source = "cards_test"
                    },
                    modal = {
                        title = "Modal Title",
                        options = {
                            { id = "name", label = "Name", type = "text" }
                        },
                        buttons = {
                            {
                                id = "modal_button",
                                label = "Modal Button 2",
                                on_action = function(data) ... end
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

### Input Groups

Used to organize structured form inputs into expandable groupings.
Can include buttons for submitting or interacting with input data.

```lua
{
    type = "input_groups",
    title = "Input Groups",
    id = "inputs_id",
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
    },
    buttons = {
        {
            id = "input_btn",
            label = "Input Button",
            class = "primary",
            on_action = function(data) ... end
        }
    }
}
```