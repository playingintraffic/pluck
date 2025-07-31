# Notify

A lightweight system message used to alert players about events, errors, warnings, or successes.
Notifications are **global** and float at the top layer - typically stacked top-right.

---

## Trigger

```lua
notify({
    title = "Saved",
    description = "Your changes were stored successfully.",
    type = "success", -- success | error | warning | info | rare | epic | legendary
    icon = "fas fa-check", -- (optional) Font Awesome icon
    duration = 5000 -- (optional) How long it stays in ms (default: 4000)
})
```

---

## Fields

| Key           | Description                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `title`       | Short bold title at the top.                                                                                                         |
| `description` | (Optional) Supporting text below the title.                                                                                          |
| `type`        | (Optional) Affects color/style. Choose from: `success`, `error`, `warning`, `info`, or rarity tags like `rare`, `epic`, `legendary`. |
| `icon`        | (Optional) Font Awesome icon class.                                                                                                  |
| `duration`    | (Optional) How long it stays in ms. Default is `4000`.                                                                               |

---

## Notes

* Use `notify(...)` client-side to push a new notification.
* You can trigger multiple stacked notifications - they won’t overwrite each other.
* `type` applies a CSS class for color and border styling.
* Ideal for confirming actions, alerting errors, or signaling system events.

Let me know when you're ready for the last one (Tooltip).