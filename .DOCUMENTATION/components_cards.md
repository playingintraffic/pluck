# Cards

Cards are modular UI blocks used to visually display data such as items, players, or actions.
They support titles, descriptions, images, tooltips, buttons, and keybind actions - and can be laid out in rows or columns.

---

## Structure

```lua
left = {
    type = "cards",
    title = "Items",
    layout = {
        columns = 2,
        flex = "column",
        scroll_x = "none"
    },
    cards = {
        {
            image = "https://placehold.co/252x126",
            title = "My Card",
            description = "This is a test card.",
            layout = "column",
            on_hover = {
                title = "Extra Info",
                description = { "You can use", "- multiple lines", "- like this" },
                values = {
                    { key = "Item", value = "Something" },
                    { key = "Owner", value = "Case" }
                },
                actions = {
                    {
                        id = "inspect_item",
                        key = "E",
                        label = "Inspect",
                        on_action = function(data)
                            -- logic
                        end
                    }
                },
                rarity = "common"
            },
            buttons = {
                {
                    id = "edit_card",
                    label = "Edit",
                    class = "primary",
                    on_action = function(data)
                        -- logic
                    end,
                    dataset = { card_id = "card_1" }
                },
                {
                    id = "close_ui",
                    label = "Close",
                    action = "close_builder",
                    class = "danger"
                }
            }
        }
    }
}
```

---

## Card Fields

| Key           | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `title`       | Text shown as the card title.                                       |
| `description` | Secondary text below the title.                                     |
| `image`       | (Optional) Image at the top of the card. URL or `nui://` supported. |
| `layout`      | (Optional) `"column"` or `"row"` layout inside the card.            |
| `buttons`     | (Optional) Array of buttons (uses the Buttons component structure). |
| `on_hover`    | (Optional) Tooltip shown when hovering over the card.               |

### Tooltip (`on_hover`) Subfields:

| Key           | Description                                      |
| ------------- | ------------------------------------------------ |
| `title`       | Tooltip header.                                  |
| `description` | Multi-line string array.                         |
| `values`      | List of `{ key, value }` pairs.                  |
| `actions`     | Keybindable actions with labels and `on_action`. |
| `rarity`      | (Optional) Tag such as `"common"` or `"rare"`.   |

---

## Layout Fields

| Key        | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `columns`  | Number of columns to display (e.g., `2`, `3`).              |
| `flex`     | Internal layout: `"row"` or `"column"`.                     |
| `scroll_x` | `"auto"`, `"on"`, or `"none"` to control horizontal scroll. |
| `scroll_y` | `"auto"`, `"on"`, or `"none"` to control vertical scroll.   |

---

## Notes

* Cards are ideal for inventories, item shops, player stats, or skill grids.
* `buttons` and `on_hover.actions` follow the same logic as standard button handlers.
* You can use `action = "close_builder"` for built-in UI closing or define your own `on_action` with a `dataset`.

Let me know when you're ready for the next one.