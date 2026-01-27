# Footer

The `footer` sits at the bottom of the layout and serves as a **flexible, function-rich area** for actions, buttons, hotkeys, and status indicators.  
It uses the same `left`, `center`, and `right` alignment system as the header.

---

## Structure

Define a footer like this:

```lua
footer = {
    layout = {
        left = { justify = "flex-start", gap = "1vw" },
        center = { justify = "center" },
        right = { justify = "flex-end", gap = "1vw" },
    },
    elements = {
        left = {
            {
                type = "buttons",
                buttons = {
                    { id = "deploy", label = "Deploy", on_action = function(data) ... end, class = "primary" },
                    { id = "cancel", label = "Cancel", action = "close_builder", class = "secondary" }
                }
            }
        },
        center = {
            { type = "text", text = "Ready to deploy." }
        },
        right = {
            {
                type = "actions",
                actions = {
                    { key = "ESC", label = "Close" },
                    { key = "E", label = "Confirm" }
                }
            }
        }
    }
}
```

Each section is optional. Use only the positions (`left`, `center`, `right`) that your layout requires.

---

## Supported Elements

| Type     | Description                                             |
| ---------- | ------------------------------------------------------- |
| `text`     | Displays static text (e.g., status or page info).       |
| `action`   | Displays one hotkey with a label (e.g., `ESC = Close`). |
| `actions`  | Displays multiple hotkey labels in a row.               |
| `buttons`  | Renders one or more clickable buttons.                  |
| `group`    | Groups other components horizontally.                   |
| `namecard` | Optional identity card (same as header).                |

These are styled by the `Footer` class and will adapt to available space and layout rules.

---

## Alignment Control

Each zone’s layout can be adjusted using:

```lua
left = {
    justify = "flex-start",
    align = "center",
    gap = "1vw"
}
```

Supported keys:

* `justify`: horizontal alignment
* `align`: vertical alignment
* `gap`: spacing between child elements

These map directly to flexbox styling for precise control.