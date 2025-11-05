/*
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
*/

import { Builder } from "/ui/js/builder.js";
import { Notify } from "/ui/js/components/notify.js";
import { DUISprite } from "/ui/js/components/dui_sprite.js";
import { ProgressCircle } from "/ui/js/components/progress_circle.js";
import { ProgressBar } from "/ui/js/components/progress_bar.js";
import { Modal } from "/ui/js/components/modal.js";
import { ActionMenu } from "/ui/js/components/action_menu.js"

let interact_dui = null;
let action_menu = null;

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

    if (window.bduk_instance && typeof window.bduk_instance.destroy === "function") {
        window.bduk_instance.destroy();
        window.bduk_instance = null;
    }

    const builder = new Builder(data.payload);
    window.bduk_instance = builder;
};

/**
 * Destroys the currently active UI instance, if any.
 * @function handlers.close_ui
 */
handlers.close_ui = () => {
    if (window.bduk_instance && typeof window.bduk_instance.destroy === "function") {
        window.bduk_instance.close();
        window.bduk_instance.destroy();
        window.bduk_instance = null;
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
