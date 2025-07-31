# Header

The header is the top bar of the PLUCK UI layout. It’s fully modular and can host branding, navigation, controls, and user info.  
While the header supports three alignment zones (`left`, `center`, `right`), you can omit any zone and place any supported component where you like.

---

## Structure

Define a header with optional layout rules and a free mix of elements.  
Zones are optional - include only what you need.

```lua
header = {
    layout = {
        left   = { justify = "flex-start", align = "center", gap = "1vw" },
        center = { justify = "center",     align = "center", gap = "1vw" },
        right  = { justify = "flex-end",   align = "center", gap = "1vw" },
    },
    elements = {
        left = {
            {
                type = "group",
                items = {
                    { type = "logo", image = "bd_100.png" },
                    { type = "text", title = "PLUCK", subtitle = "UI Builder" }
                }
            }
        },
        center = {
            { type = "tabs" } -- auto-builds from content.pages
        },
        right = {
            {
                type = "namecard",
                avatar     = "avatar_placeholder.jpg",
                background = "namecard_bg_4.jpg",
                name  = "Player Name",
                title = "Some Player Title",
                level = 99,
                tier  = "bronze"
            },
            { type = "buttons", items = {
                { label = "Save", action = "save" },
                { label = "Exit", action = "close" },
            }}
        }
    }
}
```

You can also use a single zone only (e.g., a centered header):

```lua
header = {
    elements = {
        center = {
            { type = "text", title = "Workbench", subtitle = "Loadout Editor" },
            { type = "tabs" }
        }
    }
}
```

Or a minimal header with just actions on the right:

```lua
header = {
    elements = {
        right = {
            { type = "buttons", items = {
                { label = "New",  action = "new" },
                { label = "Save", action = "save" },
                { label = "Exit", action = "close" }
            }}
        }
    }
}
```

---

## Supported Elements

You can use any of the following element types in any zone:

| Type     | Description                                               |
| ---------- | --------------------------------------------------------- |
| `logo`     | Logo image via background.                                |
| `text`     | Title with optional subtitle (stacked).                   |
| `tabs`     | Auto-generated navigation from `content.pages`.           |
| `button`   | Single action button.                                     |
| `buttons`  | Button group (array of actions).                          |
| `group`    | Horizontal wrapper that nests multiple child elements.    |
| `namecard` | Identity block with avatar, name, title, tier, and level. |

---

## Alignment & Spacing

Control per-zone alignment and spacing with simple layout rules (Flex-like):

```lua
layout = {
    left   = { justify = "flex-start", align = "center", gap = "1vw" },
    center = { justify = "center",     align = "center", gap = "0.5vw" },
    right  = { justify = "flex-end",   align = "center", gap = "0.75vw" },
}
```

* `justify`: horizontal alignment within the zone (`flex-start`, `center`, `flex-end`)
* `align`: vertical alignment (`flex-start`, `center`, `flex-end`)
* `gap`: spacing between items in the zone (e.g., `"1vw"`, `"8px"`)

All zones are optional and interchangeable. Mix and match components freely without adhering to a fixed layout.