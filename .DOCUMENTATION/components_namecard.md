# Namecard

A styled player block that shows avatar, name, title, level, and tier.
Use it in headers or footers to show the active character, rank, or status.

---

## Structure

```lua
{
    type = "namecard",
    avatar = "avatar_1.jpg",
    background = "namecard_bg_2.jpg",
    name = "Player Name",
    title = "Some Player Title",
    level = 99,
    tier = "silver"
}
```

---

## Fields

| Key          | Description                                                                |
| ------------ | -------------------------------------------------------------------------- |
| `type`       | Always `"namecard"` - required.                                            |
| `avatar`     | Image file from `/pluck/ui/assets/namecards/avatars/` or full URL/`nui://` path. |
| `background` | (Optional) Background image from `/namecards/backgrounds/` or full path.   |
| `name`       | (Optional) Display name. Defaults to `"Player Name"`.                      |
| `title`      | (Optional) Secondary role or tagline.                                      |
| `level`      | (Optional) Level display - shown as `Lv. {level}`.                         |
| `tier`       | (Optional) Tier style - supports `"bronze"`, `"silver"`, `"gold"`, etc.    |

---

## Placement

| Region         | Supported |
| -------------- | --------- |
| `header.left`  | ✅         |
| `header.right` | ✅         |
| `footer.left`  | ✅         |
| `footer.right` | ✅         |

---

## Notes

* Avatar and background images must match files in their respective folders unless using URLs.
* Tiers (`bronze`, `silver`, `gold`, etc.) apply CSS class styles for color and flair.
* Ideal for use with user profiles, dashboards, or login-aware UI.

Ready for the next one?