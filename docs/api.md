# API

PLUCK provides both client-side exports and events for triggering UI layouts and notifications.

---

## Events

### `pluck:notify`

Send a notification to the current client.

```lua
TriggerEvent("pluck:notify", {
    type = "success",
    message = "Item added!",
    header = "Done",
    icon = "fa-solid fa-check-circle",
    duration = 5000,
    match_border = true,
    match_shadow = false
})
```

| Field          | Description                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `type`         | (Optional) Notification type. Options: `success`, `error`, `info`, `warning`. Default: `"info"` |
| `message`      | Required. Body text shown in the notification.                                                  |
| `header`       | (Optional) Title/header for the notification.                                                   |
| `icon`         | (Optional) Font Awesome icon class (e.g. `"fa-solid fa-bell"`).                                 |
| `duration`     | (Optional) How long to show (ms). `0` = sticky. Default: `5000`.                                |
| `match_border` | (Optional) If `true`, colors the border based on the type.                                      |
| `match_shadow` | (Optional) If `true`, colors the drop shadow based on the type.                                 |

---

## Exports

### `build(layout)`

Build and display a UI layout on screen.

```lua
exports.pluck:build(layout)
```

| Param    | Description                                                  |
| -------- | ------------------------------------------------------------ |
| `layout` | Required. A full layout table (see: "Making Your First UI"). |

---

### `notify(data)`

Send a notification programmatically (same as `pluck:notify`).

```lua
exports.pluck:notify({
    type = "error",
    message = "Something went wrong!"
})
```

| Param  | Description                            |
| ------ | -------------------------------------- |
| `data` | Same structure as `pluck:notify` event. |