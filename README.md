# PLUCK - Predefined LUA UI Component Kit

Read the docs: **[Documentation](https://boii.dev)**

## What is PLUCK?

**Formally?** Predefined LUA UI Component Kit
**When it's working great?** Perfect Little UI Component Kit
**When it's not?** Painfully Lame UI Clutter Kit

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

## What's Included?
<details>
<summary>Core UI</summary>

- Components can be placed in any section and each has a variety of options to adjust; disabling scroll bars, adding buttons etc etc.
- Tooltips can be attached to any "slot" or "card" item you use.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1043bc98-bdbf-4139-aace-9c02ca2634a0" />
</details>

<details>
<summary>Slots</summary>

- Internal content component, can be used for making inventories as showcased here: [BOII | Inventory System](https://www.youtube.com/watch?v=26XPYIzsDRI)

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d26e41f8-d724-477c-a521-89aa3c9217b7" />
</details>

<details>
<summary>Slot Popup</summary>

- Intended to be paired with slots class to complete inventory setups; allows for displaying add/remove of items etc

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6c409f70-a653-473f-afb4-b536099d6660" />
</details>

<details>
<summary>Sidebar</summary>

- Can be placed on left or right side, supports nested options.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e991e00c-318a-4f0e-b6d0-772b40418c0c" />
</details>

<details>
<summary>Option Picker & Interaction Hints</summary>

- Both components can run independently, however they were designed to be used together for my own personal projects; you do not have to use both in combination thats up to you.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b7590dc6-8a68-453e-baeb-13c4816d7a56" />
</details>

<details>
<summary>Notifications</summary>

- Types: `error`, `info`, `warning`, `success`, `primary`

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e7d47c49-23a2-4470-a743-648d57505964" />
</details>

<details>
<summary>Action Menu</summary>

- Supports nested menus; essentially just a "radial menu" thats not radial.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/650cd3b4-c466-4eea-aea2-a396fc2c28b1" />
</details>

<details>
<summary>Task List</summary>

- Pretty simple task list; this is newest component it may be reworked.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d9a866e5-f44d-499b-9206-e7c83108932f" />
</details>

<details>
<summary>Progress Bar</summary>

- Basic stuff, its a progressbar, it shows progress.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b4e2a4a4-c40c-442b-8942-33341d69df3c" />
</details>

<details>
<summary>Progress Circle</summary>

- A progressbar? but a circle.. oooh.. fancy :D

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4ac37799-38cb-4a4a-ba1d-e3798e3943cb" />
</details>

<details>
<summary>DUI Sprite</summary>

- Uses DrawInteractiveSprite to draw a UI in game space, instead of flat on screen.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/37890250-7c6e-41e4-a08a-b7685d926a08" />
</details>

<details>
<summary>Controls Display</summary>

- Straight forward, for showing key control displays.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/01486667-9d48-4a5a-bad4-6b73ba61ae45" />

</details>

## Quick Install

### Download

- Grab the latest release from [Releases](https://github.com/playingintraffic/pluck/releases/)

### Add the Resource

- Drop the `pluck` folder into your `resources` directory.

### Add to `server.cfg`

- `ensure pluck`

### Start or Restart

F8 Console:
- refresh; ensure pluck

## Notes

PLUCK is actively maintained and continuously improved. Core components are stable and production-ready - new features and refinements are added regularly based on real-world usage.

**What's Stable:**
- All core UI components (slots, sidebars, notifications, progress bars, etc.)
- DUI sprite system
- Action menus and task lists

**What's Coming:**
- Additional components as needed
- Performance optimizations
- Community-requested features

PLUCK powers all official boii scripts going forward. 
If it's good enough for production releases, it's good enough for your server.

**A Note on Code Quality:**
JavaScript isn't my primary language. 
If you spot something dumb, inefficient, or just plain wrong - let me know. 
I'm here to make this better, not defend bad code. 
Pull requests and constructive feedback are always welcome.

## Support

Need help? Found a bug? Want to complain about my JavaScript?

👉 [Discord](https://discord.gg/MUckUyS5Kq)

**Support Hours:** Mon–Fri, 10AM–10PM GMT  
Outside those hours? Leave a message. I'll get to it when I'm back.
