# Sidebar

The `sidebar` is a **vertical action menu** used for navigation or tool selection. It supports nested submenus, icons, images, and client actions, and can be positioned on either side of the layout.

---

## Structure

```lua
sidebar = {
    layout = { side = "right" }, -- or "left"
    sections = {
        {
            id = "test_1",
            label = "Sidebar Category",
            items = {
                {
                    id = "some_option",
                    label = "Some Option",
                    image = "assets/logos/bd_100.png",
                    action = "some_action"
                },
                {
                    id = "some_other_option",
                    label = "Some Other Option",
                    icon = "fas fa-box",
                    action = "some_other_action",
                    submenu = {
                        { id = "some_submenu_option_1", label = "Some Submenu Option", on_action = function(data) ... end },
                        { id = "some_submenu_option_2", label = "Some Other Submenu Option", on_action = function(data) ... end }
                    }
                }
            }
        }
    }
}
```

Define one or more `sections`, each with labeled `items`. Items can trigger actions or show submenus.

---

## Item Fields

Each `item` supports the following fields:

| Field     | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `id`      | Unique identifier for routing and callbacks.                 |
| `label`   | Text label shown to the user.                                |
| `action`  | Action string sent to the client when clicked.               |
| `icon`    | Font Awesome icon class (e.g., `"fas fa-box"`).              |
| `image`   | Local or remote image path for item display.                 |
| `submenu` | Optional array of submenu items (no icons/images supported). |

Submenu entries use the same `id`/`label`/`on_action` structure but are limited to text and callbacks.

---

## Layout Options

You can control sidebar placement using:

```lua
layout = { side = "left" } -- or "right"
```

This applies a corresponding `.sidebar.left` or `.sidebar.right` class for positioning. The system handles layout and z-indexing automatically.

Let me know when you’re ready to move onto Tooltip or want to bundle these into a full module export.