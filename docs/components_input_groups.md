# Input Groups

Input Groups are collapsible sections that contain one or more related input fields.
They help organize form elements under clear, titled blocks and support all standard input types.

---

## Structure

```lua
center = {
    type = "input_groups",
    groups = {
        {
            id = "player_settings",
            title = "Player Settings",
            collapsed = false,
            inputs = {
                {
                    id = "player_name",
                    label = "Name",
                    type = "text",
                    placeholder = "Enter your name...",
                    default = "Case"
                },
                {
                    id = "player_age",
                    label = "Age",
                    type = "number",
                    min = 16,
                    max = 99,
                    default = 25
                },
                {
                    id = "job_role",
                    label = "Role",
                    type = "select",
                    options = {
                        { label = "Thief", value = "thief" },
                        { label = "Driver", value = "driver" }
                    },
                    default = "driver"
                }
            }
        }
    }
}
```

---

## Group Fields

| Key         | Description                           |
| ----------- | ------------------------------------- |
| `id`        | Unique ID for the group.              |
| `title`     | Displayed as the group's header.      |
| `collapsed` | (Optional) If true, starts minimized. |
| `inputs`    | Array of input field objects.         |

---

## Input Types

Supported input types inside a group:

| Type       | Description                                   |
| ---------- | --------------------------------------------- |
| `text`     | Basic input field for strings.                |
| `number`   | Numeric input with optional `min` and `max`.  |
| `select`   | Dropdown with predefined `options`.           |
| `toggle`   | True/false switch.                            |
| `slider`   | Slider control with `min`, `max`, and `step`. |
| `textarea` | Multi-line text box.                          |

Each input supports standard keys:

| Key           | Description                                        |
| ------------- | -------------------------------------------------- |
| `id`          | Unique ID used in callbacks and saving.            |
| `label`       | Label shown above the input.                       |
| `default`     | Default value shown when the form is opened.       |
| `placeholder` | (Optional) Placeholder text for text fields.       |
| `min`/`max`   | (Optional) Range limits for `number` or `slider`.  |
| `options`     | (Select only) Array of `{ label, value }` entries. |

---

## Notes

* Inputs are auto-validated where applicable (`min`, `max`, `required`, etc.).
* You can combine multiple groups for large forms or categorized input screens.
* Collapse behavior is automatic and animated when clicking the group title.
* All input values are passed back to Lua as a flat dataset `{ [input_id] = value }` when submitting a form or modal.

Let me know when you’re ready for the next one.