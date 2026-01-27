# Action Menu

The Action Menu is a hierarchical, context-driven menu system used to trigger actions, functions, or nested submenus.
It supports unlimited submenu depth and integrates with `on_action` callbacks converted into safe, executable handlers.

Action menus are commonly used for interaction wheels, radial-style menus, or quick action lists.

---

## Structure

```lua
menu = {
    {
        label = "Main Menu",
        icon = "fa-solid fa-bars",
        colour = "#e4ad29",
        submenu = {
            {
                label = "Submenu Item",
                icon = "fa-solid fa-arrow-right",
                colour = "#4bc0c8",
                on_action = function(data)
                    -- Your logic here
                end
            }
        }
    },
    {
        label = "Quick Action",
        icon = "fa-solid fa-bolt",
        colour = "#ffcc00",
        on_action = function(data)
            -- Your logic here
        end
    }
}
```

Each top-level entry represents a clickable action or a parent item that opens a submenu.

---

## Menu Item Fields

| Key         | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `label`     | Text displayed for the menu item.                                      |
| `icon`      | Font Awesome icon class (`fa-solid fa-bars`, etc).                     |
| `colour`    | Hex color used for the icon and highlight styling.                     |
| `on_action` | Optional: Function executed when the item is clicked. Receives `data`. |
| `submenu`   | Optional: Array of child menu items, forming a nested menu.            |

---

## Submenus

Submenus are defined by adding a `submenu` key containing an array of menu items.

```lua
submenu = {
    {
        label = "Nested Action",
        icon = "fa-solid fa-cog",
        colour = "#e4ad29",
        on_action = function(data)
            -- Logic here
        end
    }
}
```

* Submenus can be nested infinitely.
* Items **must** define either `on_action` or `submenu`.
* Parent items with a `submenu` do not trigger actions directly.

---

## Server & Client Usage

### Server-side

```lua
exports.pluck:action_menu(source, menu)
```

| Parameter | Description                           |
| --------- | ------------------------------------- |
| `source`  | Player source ID to send the menu to. |
| `menu`    | Menu configuration table.             |

---

### Client-side

```lua
exports.pluck:action_menu(menu)
```

| Parameter | Description               |
| --------- | ------------------------- |
| `menu`    | Menu configuration table. |

Calling the client export will:

* Sanitize the menu using `pluck.build_ui`
* Send the menu to NUI
* Automatically set focus

---

## on_action Callbacks

The `on_action` function behaves the same as other UI components:

```lua
on_action = function(data)
    print(json.encode(data or {}))
end
```

* Functions are safely converted and executed client-side.
* `data` contains the current UI dataset (if applicable).
* Supports shared behavior with buttons, modals, and input submissions.

---

## Closing the Menu

The action menu automatically releases focus when closed.

You can also close it manually:

```lua
TriggerEvent("pluck:action_menu:close")
```

This sends a close message to the NUI and clears focus.

---

## Notes

* Icons use **Font Awesome** classes.
* Colours must be valid hex values.
* Action menus support unlimited nesting depth.
* All menus are sanitized before being sent to NUI.
* Focus handling is automatic and safe.
* Designed for fast interaction workflows and contextual actions.

---

## Example

```lua
exports.pluck:action_menu({
    {
        label = "Main Menu",
        icon = "fa-solid fa-bars",
        colour = "#e4ad29",
        submenu = {
            {
                label = "Do Something",
                icon = "fa-solid fa-cog",
                colour = "#4bc0c8",
                on_action = function(data)
                    print("Action triggered!", json.encode(data))
                end
            }
        }
    }
})
```