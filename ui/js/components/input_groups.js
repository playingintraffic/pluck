/*
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
*/

import { Buttons } from "/ui/js/components/buttons.js"
import { send_nui_callback } from "/ui/js/utils.js";

/**
 * @class InputGroups
 * @description Renders grouped input fields with optional increment/decrement controls and expand/collapse.
 */
export class InputGroups {
    /**
     * @param {Object} config
     * @param {string} [config.id=""]
     * @param {string} [config.title="Input Groups"]
     * @param {Array} [config.groups=[]]
     * @param {Array} [config.buttons=[]]
     * @param {Object} [config.layout={}]
     */
    constructor({ id = "", title = "Input Groups", groups = [], buttons = [], layout = {} }) {
        this.id = id;
        this.title = title;
        this.groups = Array.isArray(groups) ? groups : Object.values(groups);
        this.buttons = Array.isArray(buttons) ? buttons : Object.values(buttons);
        this.layout = layout;

        this.scroll_y = layout.scroll_y === "none" ? "scroll_y_none" : layout.scroll_y === "auto" ? "scroll_y_auto" : "scroll_y_on";
        this.scroll_x = layout.scroll_x === "none" ? "scroll_x_none" : layout.scroll_x === "auto" ? "scroll_x_auto" : "scroll_x_on";
        this.columns = layout.columns || 0;
    }

    /** @returns {string} Full rendered HTML */
    get_html() {
        const style = this.columns > 0 ? `style="grid-template-columns: repeat(${this.columns}, 1fr);"` : "";
        const wrapper = `input_groups_container ${this.scroll_x} ${this.scroll_y}`.trim();
        const groups_html = this.groups.map((g, i) => this.create_group(g, i)).join("");
        const buttons_html = this.buttons.length ? new Buttons({ buttons: this.buttons, classes: "input_groups" }).get_html() : "";

        setTimeout(() => this.bind_events(), 10);

        return `<div class="${wrapper}" ${style}>${groups_html}</div>${buttons_html}`.trim();
    }

    /**
     * Creates a group of inputs.
     * @param {Object} group
     * @param {number} index
     * @returns {string}
     */
    create_group(group, index) {
        const expand = group.expandable ? `<button class="expand_button" data-group-index="${index}"><i class="fa-solid fa-plus"></i></button>` : "";
        const inputs = Array.isArray(group.inputs) ? group.inputs.map(i => this.create_input(i)).join("") : "";
        return `<div class="input_group">
            <h4>${group.header || "Group"} ${expand}</h4>
            <div class="group_inputs ${group.expandable ? "hidden" : ""}" data-group-index="${index}">${inputs}</div>
        </div>`;
    }

    /**
     * Creates a single input.
     * @param {Object} input
     * @returns {string}
     */
    create_input(input) {
        if (input.type === "number") {
            const dataset = { target: input.id, ...(input.category ? { category: input.category } : {}) };
            const dec = new Buttons({ buttons: [{ id: `${input.id}_dec`, icon: "fas fa-minus", action: input.action, class: "input_button decrement", dataset }], classes: "input_group_inline" }).get_html();
            const inc = new Buttons({ buttons: [{ id: `${input.id}_inc`, icon: "fas fa-plus", action: input.action, class: "input_button increment", dataset }], classes: "input_group_inline" }).get_html();
            return `<div class="input_pair">
                <label for="${input.id}">${input.label || ""}</label>
                <div class="input_controls">${dec}<input id="${input.id}" class="group_input" type="number" min="-1" value="-1" />${inc}</div>
            </div>`;
        }

        if (input.type === "text") {
            return `<div class="input_pair">
                <label for="${input.id}">${input.label || ""}</label>
                <input id="${input.id}" class="group_input" type="text" value="${input.default || ""}" placeholder="${input.placeholder || ""}" />
            </div>`;
        }

        return `<p>Unsupported input type: ${input.type}</p>`;
    }

    /** Binds expand/collapse, number field typing, and increment/decrement logic */
    bind_events() {
        $(document).off("click", ".expand_button").on("click", ".expand_button", e => {
            const i = $(e.currentTarget).data("group-index");
            $(`.group_inputs[data-group-index="${i}"]`).toggleClass("hidden");
        });

        $(document).off("input.group_input").on("input.group_input", ".group_input[type='number']", function () {
            const $input = $(this);
            const $controls = $input.closest(".input_controls");
            const id = $input.attr("id");
            const category = $controls.find(".increment").data("category") || null;
            const value = parseInt($input.val(), 10);
            const old_value = parseInt($input.data("old-value") || 0, 10);

            $input.data("old-value", value);

            if (value > old_value) {
                const inc_action = $controls.find(".increment").data("action");
                if (inc_action) {
                    send_nui_callback("ui:handler", { action: inc_action, dataset: { category, target: id, value } });
                }
            } else if (value < old_value) {
                const dec_action = $controls.find(".decrement").data("action");
                if (dec_action) {
                    send_nui_callback("ui:handler", { action: dec_action, dataset: { category, target: id, value } });
                }
            }
        });

    }
}
