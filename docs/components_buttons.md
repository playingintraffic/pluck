# Buttons

Buttons are reusable action components used to confirm actions, trigger modals, or execute logic via callbacks.
They can be placed in any section of your layout - header, footer, content, sidebar, or modals.

---

## Structure

```lua
buttons = {
    {
        id = "confirm_btn",
        label = "Confirm",
        on_action = function(data)
            -- Your logic here
        end,
        should_close = true,
        class = "primary"
    },
    {
        id = "cancel_btn",
        label = "Cancel",
        action = "close_builder",
        class = "danger"
    }
}
```

Each entry in the `buttons` array represents a clickable button with customizable behavior and styling.

---

## Button Fields

| Key            | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `id`           | Unique identifier for the button.                                   |
| `label`        | Text shown on the button.                                           |
| `action`       | Optional: Triggers a client-side action (e.g., `"close_builder"`).  |
| `on_action`    | Optional: Lua function to run on click. Receives `data`.            |
| `should_close` | Optional: Auto-closes the UI after click. Default: `false`.         |
| `class`        | Optional: Button style (`"primary"`, `"danger"`, `"success"`, etc). |
| `icon`         | Optional: Font Awesome icon class (`"fas fa-check"`, etc).          |
| `modal`        | Optional: Shows a modal before running the action.                  |
| `dataset`      | Optional: Data passed into `on_action`.                             |

---

## Usage Notes

* Use multiple buttons by defining a table of entries inside `buttons = { ... }`.
* The `dataset` field can pass context into your `on_action` handler.
* If `modal` is defined, it will show a confirmation box before executing the action.
* The `action = "close_builder"` string is a reserved command for safely closing the UI.

```lua
-- Closes the UI
action = "close_builder"
```