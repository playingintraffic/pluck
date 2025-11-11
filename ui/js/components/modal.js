/*
    This file is part of PLUCK (Predefined Lua UI Component Kit).
    Support honest development retain this credit. Don't be that guy...

    MIT License

    Copyright (c) 2025 Playing In Traffic

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import { Buttons } from "/ui/js/components/buttons.js"

/**
 * @class Modal
 * @description Renders a modal window with input fields and buttons.
 */
export class Modal {
    /**
     * @param {Object} config
     * @param {string} [config.title="Input Required"]
     * @param {Array<Object>} [config.options=[]]
     * @param {Array<Object>} [config.buttons=[]]
     * @param {string} [config.classes=""]
     */
    constructor({ title = "Input Required", options = [], buttons = [], classes = "" } = {}) {
        this.title = title;
        this.options = Array.isArray(options) ? options : Object.values(options);
        this.buttons = Array.isArray(buttons) ? buttons : Object.values(buttons);
        this.classes = classes;
    }

    /** @private @returns HTML for modal inputs  */
    get_input_html(opt) {
        const common = `id="${opt.id}" class="modal_input" placeholder="${opt.placeholder || ''}"`;
        let dataset_attrs = "";

        if (opt.dataset && typeof opt.dataset === "object") {
            for (const [k, v] of Object.entries(opt.dataset)) {
                dataset_attrs += ` data-${k.replace(/_/g, "-")}="${v}"`;
            }
        }

        if (opt.type === "select" && Array.isArray(opt.options)) {
            const opts = opt.options.map(o =>
                `<div class="custom_option" data-value="${o.value}" data-source="${o.source || o.value}">${o.label}</div>`
            ).join("");

            return `<div class="modal_field">
                <label for="${opt.id}">${opt.label || opt.id}</label>
                <div class="modal_select_wrapper">
                    <div class="modal_select" data-id="${opt.id}">Select a value...</div>
                    <div class="modal_select_options">${opts}</div>
                </div>
            </div>`;
        }

        if (opt.type === "textarea") {
            return `<div class="modal_field"><label for="${opt.id}">${opt.label || opt.id}</label><textarea ${common}${dataset_attrs}></textarea></div>`;
        }

        const attrs = [`type="${opt.type || 'text'}"`, common, dataset_attrs, opt.min !== undefined ? `min="${opt.min}"` : "", opt.max !== undefined ? `max="${opt.max}"` : ""].join(" ");
        return `<div class="modal_field"><label for="${opt.id}">${opt.label || opt.id}</label><input ${attrs.trim()} /></div>`;
    }

    /** @returns {string} Full HTML for the modal */
    get_html() {
        const inputs = this.options.map(opt => this.get_input_html(opt)).join("\n");
        const buttons = new Buttons({ buttons: this.buttons, classes: "modal_button_group" }).get_html();
        return `<div id="modal_container"><div class="modal ${this.classes}"><h2 class="modal_title">${this.title}</h2><div class="modal_inputs">${inputs}</div><div class="modal_actions">${buttons}</div></div></div>`.trim();
    }

    /**
     * Appends the modal to DOM and binds events.
     * @param {string} [container="#ui_focus"]
     */
    append_to(container = "#ui_focus") {
        $(container).html(this.get_html()).addClass("active");

        $(".modal_select").off("click").on("click", function () {
            const $w = $(this).closest(".modal_select_wrapper");
            $(".modal_select_options").not($w.find(".modal_select_options")).hide();
            $w.find(".modal_select_options").toggle();
        });

        $(".modal_select_options .custom_option").off("click").on("click", function () {
            const val = $(this).data("value");
            const source = $(this).data("source");
            const label = $(this).text();
            const $w = $(this).closest(".modal_select_wrapper");
            const $sel = $w.find(".modal_select");
            $sel.text(label).data("value", val).attr("data-value", val).data("source", source).attr("data-source", source);
            $w.find(".modal_select_options").hide();
        });

        $(document).on("click", e => {
            if (!$(e.target).closest(".modal_select_wrapper").length) $(".modal_select_options").hide();
        });
    }

    /**
     * Static helper to quickly show a modal with.
     * @param {Object} config
     * @param {string} config.title
     * @param {Array<Object>} config.options
     * @param {Array<Object>} config.buttons
     */
    static show({ title = "Input Required", options = [], buttons = []}) {
        new Modal({ title, options, buttons }).append_to("#ui_focus");
    }
}