# PLUCK - Predefined LUA UI Component Kit

## What is PLUCK?

- **Formally?** Predefined LUA UI Component Kit
- **When it's working great?** Perfect Little UI Component Kit
- **When it's not?** Painfully Lame UI Clutter Kit

PLUCK lets you build UI entirely in **Lua**.
No HTML. No CSS. No JavaScript. No problem.

Less "learning React" - more "just show the damn button."

## Who's It For?

- Scripters who **hate coding UI** but still want good-looking panels.
- Developers who'd rather **focus on gameplay**.
- Anyone tired of **context menus pretending to be UI**.
- You. Yes, you.

## Why Use PLUCK?

- **No Bloat** - You only get what you actually use.
- **No Headaches** - Buttons, modals, inputs - they just work.
- **No HTML** - Build everything in clean, readable Lua.
- **Unified Look** - Consistent visuals across your entire server.
- **Flexible Setup** - Use as standalone resource OR embed directly into your own scripts.

## What's Included?

### Main UI Builder

- **Header** - Branding + buttons + whatever chaos you want up top.
- **Footer** - Keybinds, hints, and quick info.
- **Sidebar** - Optional. Menus within menus.
- **Content** - The good stuff.
- **Tooltip** - Hover support out the box.

### Components

- **Buttons** - Smart, modal-aware buttons.
- **Cards** - Display items, jobs, stores, whatever.
- **Inputs** - Full group logic (tuning, clothes, etc).
- **Modals** - With selects, colors, text, number sliders, and more.
- **Namecards** - Beautiful profile-style cards.
- **Notifications** - Simple, clean in-UI notifications.
- **Options Selector** - Item selection with images and quantities.
- **Interaction Hints** - Context-aware action prompts.
- **Progress Indicators** - Bars and circles for loading states.
- **Slot Popups** - Quick notification popups.
- **DUI Zones** - Interactive UI elements in the game world.

### Extras

- **Themes** - One file controls fonts, spacing, and color.
- **Layouts** *(coming soon)* - Premade setups for stores, panels, and more.

## Quick Install

### Method 1: Standalone Resource

**Download**
- Grab the latest release from [Releases](https://github.com/boiidevelopment/pluck/releases/)

**Add the Resource**
- Drop the `pluck` folder into your `resources` directory.

**Add to `server.cfg`**
- `ensure pluck`

**Start or Restart**
F8 Console:
- `refresh; ensure pluck`

**Usage**
- Call exports: `exports.pluck:notify(opts)`

### Method 2: Embedded Library

**Extract Core**
- Open the `pluck` resource folder.
- Copy the `pluck` folder into your own resource's directory (e.g., `myresource/lib/pluck/`).

**Update `fxmanifest.lua`**
```lua
-- Add these lines to your fxmanifest
shared_scripts {
    'lib/pluck/main.lua',
    'lib/pluck/components/**/*.lua'
}

ui_page 'lib/pluck/ui/index.html'

files {
    'lib/pluck/ui/**/*'
}
```

**Usage**
- Access directly e.g, `pluck.notify(opts)`, `pluck.show_progressbar(options)` etc.
- No exports needed functions available natively in your resource.

## Support

Need help? Hit up the [Discord](https://discord.gg/MUckUyS5Kq)

**Support Hours:**
Mon-Fri, 10AM-10PM GMT

Outside those hours?
Yell into the void or leave a message.