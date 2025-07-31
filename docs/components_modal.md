# Modal

A modal is a popup window with a title, inputs, and buttons.
Use it for confirmations, inline editing, or quick interactions.
Modals are triggered from buttons, keybinds, or hover actions.

---

## Structure

```lua
modal = {
    title = "Edit Item",
    options = {
        { id = "item_name", label = "Item Name", type = "text" },
        { id = "amount", label = "Amount", type = "number", min = 1, max = 100 }
    },
    buttons = {
        {
            id = "save_item",
            label = "Save",
            on_action = function(data)
                -- data.input.item_name, data.input.amount
            end,
            dataset = {
                source = "inventory",
                item_id = "some_id"
            }
        },
        {
            id = "cancel",
            label = "Cancel"
        }
    }
}
```

---

## Modal Fields

| Key       | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `title`   | Title text displayed at the top of the modal.                |
| `options` | Array of input fields. See supported types below.            |
| `buttons` | Array of buttons. Use `on_action`, `action`, or none at all. |

---

## Input Types

| Type       | Description                                                   |
| ---------- | ------------------------------------------------------------- |
| `text`     | Single-line input field.                                      |
| `number`   | Numeric input. Use `min`/`max` as needed.                     |
| `textarea` | Multi-line text field.                                        |
| `select`   | Dropdown menu. Requires `options = { { label, value }, ... }` |

Each input requires:

| Key     | Description                               |
| ------- | ----------------------------------------- |
| `id`    | Unique field name (used in `data.input`). |
| `label` | Display label for the field.              |

---

## Button Fields

| Key         | Description                                                         |
| ----------- | ------------------------------------------------------------------- |
| `id`        | Unique button ID.                                                   |
| `label`     | Text shown on the button.                                           |
| `on_action` | Function called on click. Receives `data.input` and `data.dataset`. |
| `action`    | Optional named action (e.g. `"close_builder"`).                     |
| `dataset`   | Optional static data sent along with inputs.                        |
| *(none)*    | If no `action` or `on_action` is defined, the modal simply closes.  |

---

## Notes

* Modal inputs are automatically collected and passed as `data.input`.
* `data.dataset` is also passed if provided on the button.
* Use `on_action` for custom logic.
* Use `action = "close_builder"` to close the full UI.
* Leaving both `on_action` and `action` empty will close just the modal.

Let me know when you're ready for the next one.