/*
--------------------------------------------------

This file is part of PLUCK.
You are free to use these files within your own resources.
Please retain the original credit and attached MIT license.
Support honest development.

Author: Case @ BOII Development
License: https://github.com/boiidevelopment/pluck/blob/main/LICENSE
GitHub: https://github.com/playingintraffic/pluck

--------------------------------------------------
*/

import { Builder } from "./builder.js";
import { Notify } from "./components/notify.js";
import { DUISprite } from "./components/dui_sprite.js";
import { ProgressCircle } from "./components/progress_circle.js";
import { ProgressBar } from "./components/progress_bar.js";
import { Modal } from "./core/modal.js";
import { ActionMenu } from "./components/action_menu.js";
import { SlotPopup } from "./components/slot_popup.js";
import { InteractionHint } from "./components/interaction_hint.js";
import { OptionsSelector } from "./components/option_selector.js";
import { TaskList } from "./components/task_list.js";

let interact_dui = null;
let action_menu = null;
let interaction_hint = null;
let options_selector = null;
let task_list = null;

/**
 * Notification instance
 * Will move settings to somewhere toggleable at some point?.. maybe..
 * @type {Notify}
 */
const notify = new Notify({
    position: "right-center",
    fill_direction: "up"
});

/**
 * Slot popup instance
 * @type {SlotPopup}
 */
const slot_popup = new SlotPopup({
    position: "bottom-center"
});

window.test_slot_popup = () => {
    const test_items = [
        { item_id: "water", image: "/pluck/ui/assets/items/water.png", quantity: 5, action: "added", rarity: "common" },
        { item_id: "weapon_pistol", image: "/pluck/ui/assets/items/weapon_pistol.png", quantity: 1, action: "added", rarity: "rare" },
        { item_id: "cash", image: "/pluck/ui/assets/items/cash.png", quantity: 100, action: "removed", rarity: "uncommon" },
        { item_id: "ammo_9mm", image: "/pluck/ui/assets/items/ammo_9mm.png", quantity: 50, action: "added", rarity: "legendary" }
    ];

    let delay = 0;
    test_items.forEach((item, index) => {
        setTimeout(() => {
            slot_popup.show(item);
        }, delay);
        delay += 5000;
    });
};

/**
 * Registered message handlers for NUI callbacks.
 * @type {Object<string, Function>}
 */
const handlers = {};

/**
 * Builds a UI from a provided config payload.
 * @function handlers.build_ui
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - The UI configuration to render.
 */
handlers.build_ui = (data) => {
    if (!data.payload) {
        console.warn("No UI data provided");
        return;
    }

    if (window.ui_instance && typeof window.ui_instance.destroy === "function") {
        window.ui_instance.destroy();
        window.ui_instance = null;
    }

    const builder = new Builder(data.payload);
    window.ui_instance = builder;
};

/**
 * Destroys the currently active UI instance, if any.
 * @function handlers.close_ui
 */
handlers.close_ui = () => {
    if (window.ui_instance && typeof window.ui_instance.destroy === "function") {
        window.ui_instance.close();
        window.ui_instance.destroy();
        window.ui_instance = null;
    }

    if (window.audio_player) {
        window.audio_player.destroy();
        window.audio_player = null;
    }
};

/**
 * Displays a notification using the Notify component.
 * @function handlers.notify
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - Notification content/config.
 */
handlers.notify = (data) => {
    if (!data || !data.payload) {
        console.warn("[Notify] Missing payload.");
        return;
    }

    notify.show(data.payload);
};

/**
 * Show dui sprite.
 * @function handlers.show_dui
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - DUI payload.
 */
handlers.show_dui = (data) => {
    if (interact_dui) {
        interact_dui.close();
    }
    interact_dui = new DUISprite(data.payload);
}

/**
 * Hides dui sprite.
 * @function handlers.close_dui
 */
handlers.close_dui = () => {
    if (interact_dui) {
        interact_dui.close();
    }
}

/**
 * Show progress circle.
 * @function handlers.show_circle
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - Circle payload.
 */
handlers.show_circle = (data) => {
    new ProgressCircle(data.payload);
}

/**
 * Show progress bar.
 * @function handlers.show_circle
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - Bar payload.
 */
handlers.show_progressbar = (data) => {
    new ProgressBar(data.payload);
}

/**
 * Displays a modal window using the Modal class.
 * @function handlers.show_modal
 * @param {Object} data - Message data object.
 * @param {Object} data.payload - Modal configuration.
 * @param {string} data.payload.title - Title of the modal.
 * @param {Array<Object>} [data.payload.options=[]] - Array of input definitions.
 * @param {Array<Object>} [data.payload.buttons=[]] - Array of button definitions.
 */
handlers.show_modal = (data) => {
    console.log("showing modal or trying to")
    if (!data || !data.payload) {
        console.warn("[Modal] Missing payload.");
        return;
    }

    Modal.show({
        title: data.payload.title,
        options: data.payload.options || [],
        buttons: data.payload.buttons || []
    });
};

/**
 * Creates action menu
 * 
 */
handlers.create_action_menu = (data) => {
    action_menu = new ActionMenu();
    action_menu.create_menu(data.payload);
}

handlers.close_action_menu = () => {
    if (action_menu) {
        action_menu.close();
    }
}


/**
 * Updates interaction hint
 */
handlers.update_interaction_hint = (data) => {
    if (!interaction_hint) {
        interaction_hint = new InteractionHint();
    }
    interaction_hint.set_data(data.payload);
}

/**
 * Updates interaction hint quantity
 */
handlers.update_hint_quantity = (data) => {
    if (interaction_hint) {
        interaction_hint.update_quantity(data.payload.amount);
    }
}

/**
 * Clears interaction hint
 */
handlers.clear_interaction_hint = () => {
    if (interaction_hint) {
        interaction_hint.clear();
    }
}

/**
 * Destroys interaction hint
 */
handlers.destroy_interaction_hint = () => {
    if (interaction_hint) {
        interaction_hint.destroy();
        interaction_hint = null;
    }
}

/**
 * Sets options in selector
 */
handlers.set_options = (data) => {
    if (!options_selector) {
        options_selector = new OptionsSelector();
    }
    options_selector.set_options(data.payload.title, data.payload.options);
}

/**
 * Shows options selector
 */
handlers.show_options = () => {
    if (options_selector) {
        options_selector.show();
    }
}

/**
 * Hides options selector
 */
handlers.hide_options = () => {
    if (options_selector) {
        options_selector.hide();
    }
}

/**
 * Destroys options selector
 */
handlers.destroy_options_selector = () => {
    if (options_selector) {
        options_selector.destroy();
        options_selector = null;
    }
}

window.test_fishing_ui = () => {
    const test_baits = [
        {
            id: 'weed',
            label: 'Weed',
            image: '/pluck/ui/assets/items/weed.png',
            quantity: 5,
            enabled: true
        },
        {
            id: 'cash',
            label: 'Cash',
            image: '/pluck/ui/assets/items/cash.png',
            quantity: 2,
            enabled: true
        },
        {
            id: 'weapon_pistol',
            label: 'Pistol',
            image: '/pluck/ui/assets/items/weapon_pistol.png',
            quantity: 0,
            enabled: false
        },
        {
            id: 'tomato',
            label: 'Tomato',
            image: '/pluck/ui/assets/items/tomato.png',
            quantity: 10,
            enabled: true
        }
    ];

    const interaction_hint = new InteractionHint('activities_container');
    const options_selector = new OptionsSelector('options_container');

    options_selector.set_options('SELECT ITEM', test_baits);
    options_selector.show();

    setTimeout(() => {
        interaction_hint.set_data({
            image: '/pluck/ui/assets/items/tomato.png',
            label: 'Tomato',
            quantity: 5,
            action_text: 'Press F to thow or E to change item'
        });
    }, 2000);

    setTimeout(() => {
        interaction_hint.update_quantity(3);
    }, 5000);

    setTimeout(() => {
        interaction_hint.clear();
    }, 8000);
};

window.test_action_menu = () => {
    if (action_menu) {
        action_menu.close();
        action_menu = null;
    }

    action_menu = new ActionMenu();

    action_menu.create_menu([
        {
            label: "Main Menu",
            icon: "fa-solid fa-bars",
            colour: "#e4ad29",
            submenu: [
                {
                    label: "Submenu 1",
                    icon: "fa-solid fa-arrow-right",
                    colour: "#e4ad29",
                    submenu: [
                        {
                            label: "Do Something",
                            icon: "fa-solid fa-cog",
                            colour: "#e4ad29",
                            on_action: () => {
                                console.log("Do Something clicked");
                            }
                        },
                        {
                            label: "Another Thing",
                            icon: "fa-solid fa-bolt",
                            colour: "#4bc0c8",
                            on_action: () => {
                                console.log("Another Thing clicked");
                            }
                        }
                    ]
                },
                {
                    label: "Cloud Action",
                    icon: "fa-solid fa-cloud",
                    colour: "#4bc0c8",
                    on_action: () => {
                        console.log("Cloud action clicked");
                    }
                }
            ]
        },
        {
            label: "Quick Action",
            icon: "fa-solid fa-bolt",
            colour: "#ffcc00",
            on_action: () => {
                console.log("Quick action clicked");
            }
        },
        {
            label: "Quick Action",
            icon: "fa-solid fa-bolt",
            colour: "#ffcc00",
            on_action: () => {
                console.log("Quick action clicked");
            }
        },
        {
            label: "Quick Action",
            icon: "fa-solid fa-bolt",
            colour: "#ffcc00",
            on_action: () => {
                console.log("Quick action clicked");
            }
        },
        {
            label: "Quick Action",
            icon: "fa-solid fa-bolt",
            colour: "#ffcc00",
            on_action: () => {
                console.log("Quick action clicked");
            }
        }
    ]);
};

/**
 * Update slots UI 
 */
handlers.update_slots = (data) => {
    if (!data || !data.items) return;

    const ui = window.ui_instance;
    if (!ui || !ui.content) return;

    ui.content.update_slots_from_server(data.items);
};

/**
 * Shows task list
 */
handlers.show_task_list = (data) => {
    if (!task_list) {
        task_list = new TaskList();
    }
    task_list.set_tasks(data.payload.title, data.payload.tasks);
    task_list.show();
}

/**
 * Hides task list
 */
handlers.hide_task_list = () => {
    if (task_list) {
        task_list.hide();
    }
}

/**
 * Destroys task list
 */
handlers.destroy_task_list = () => {
    if (task_list) {
        task_list.destroy();
        task_list = null;
    }
}

/**
 * Updates specific task in task list
 */
handlers.update_task = (data) => {
    if (!task_list) return;
    
    const { task_id, updates } = data.payload;
    const tasks = task_list.tasks;
    const task_index = tasks.findIndex(t => t.id === task_id);
    
    if (task_index !== -1) {
        tasks[task_index] = { ...tasks[task_index], ...updates };
        task_list.set_tasks(task_list.title, tasks);
    }
}

window.test_task_list = () => {
    if (!task_list) {
        task_list = new TaskList();
    }

    task_list.set_tasks("TASKS", [
        {
            id: "task_1",
            label: "Task 1",
            description: "This is the first task description",
            completed: true,
            action: "test_action"
        },
        {
            id: "task_2",
            label: "Task 2",
            description: "This is the second task description",
            in_progress: true,
            progress: 65,
            action: "test_action"
        },
        {
            id: "task_3",
            label: "Task 3",
            description: "This is the third task description",
            progress: 0,
            action: "test_action"
        },
        {
            id: "task_4",
            label: "Task 4",
            description: "This is the fourth task description",
            progress: 33,
            action: "test_action"
        }
    ]);
    
    task_list.show();
}

window.test_task_update = () => {
    if (!task_list) return;

    const tasks = task_list.tasks;
    const task = tasks.find(t => t.id === "task_2");
    
    if (task) {
        task.progress = 100;
        task.completed = true;
        task.in_progress = false;
        task_list.set_tasks(task_list.title, tasks);
    }
}

window.test_task_list_close = () => {
    if (task_list) {
        task_list.hide();
    }
}

/**
 * Global message listener for all NUI messages.
 * Routes each message to its corresponding handler.
 */
window.addEventListener("message", (event) => {
    const { func } = event.data;
    const handler = handlers[func];

    if (typeof handler !== "function") {
        console.warn(`Handler missing: ${func}`);
        return;
    }

    handler(event.data);
});