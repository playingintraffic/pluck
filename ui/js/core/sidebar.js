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

import { send_nui_callback, extract_dataset } from "/ui/js/utils.js";

/**
 * @class Sidebar
 * @description Builds a flexible vertical sidebar with sections, actions, icons, and nested submenus.
 */
export class Sidebar {
    /**
     * @param {Object} config
     * @param {Array<Object>} config.sections - Sidebar sections and items.
     * @param {Function|null} [config.on_action=null] - Callback on item click (id, action).
     * @param {Object} [config.layout={}] - Layout settings (e.g., side: "left" or "right").
     */
    constructor({ sections = [], on_action = null, layout = {} }) {
        this.sections = Array.isArray(sections) ? sections : Object.values(sections);
        this.on_action = on_action;
        this.side = layout.side || "right";
    }

    /** @returns {string} Sidebar HTML */
    get_html() {
        return `<div class="sidebar ${this.side}">` +
            this.sections.map(section => {
                const items = Array.isArray(section.items) ? section.items : Object.values(section.items || {});
                return `
                    <div class="sidebar_section">
                        ${section.label ? `<div class="sidebar_title">${section.label}</div>` : ""}
                        <div class="sidebar_body">
                            ${items.map(item => {
                                const submenu = Array.isArray(item.submenu) ? item.submenu : Object.values(item.submenu || {});
                                return `
                                    <div class="sidebar_item_wrapper">
                                        <div class="sidebar_item ${item.class || ""}" id="${item.id}" data-id="${item.id}" data-action="${item.action || ""}" data-should_close="${item.should_close || "false"}"">
                                            ${item.icon ? `<i class="${item.icon} sidebar_icon"></i>` : item.image ? `<img src="${item.image}" class="sidebar_icon">` : ""}
                                            <div class="sidebar_text">${item.label}</div>
                                        </div>
                                        ${submenu.length ? `
                                            <div class="sidebar_submenu">
                                                ${submenu.map(sub => `
                                                    <div class="sidebar_subitem" id="${sub.id}" data-id="${sub.id}" data-action="${sub.action || ""}">
                                                        <div class="sidebar_text">${sub.label}</div>
                                                    </div>`).join("")}
                                            </div>
                                        ` : ""}
                                    </div>`;
                            }).join("")}
                        </div>
                    </div>`;
            }).join("") +
        `</div>`.trim();
    }

    /**
     * Appends the sidebar to a DOM container.
     * @param {string} [container="#sidebar_container"]
     */
    append_to(container = "#sidebar_container") {
        $(container).html(this.get_html());
        this.bind_events();
    }

    /** Binds item and submenu click handlers */
    bind_events() {
        const handle_click = ($el) => {
            const action = $el.data("action");
            if (!action) return;

            const dataset = extract_dataset($el);
            let should_close = false;

            for (const attr of $el[0].attributes) {
                if (attr.name === "data-should_close" && attr.value === "true") {
                    should_close = true;
                }
            }

            send_nui_callback(action, dataset, { should_close }).then(() => {
                if (should_close && window.pluck_instance) {
                    window.pluck_instance.destroy();
                    window.pluck_instance = null;
                }
            });
        };

        $(".sidebar_item").off("click").on("click", function () {
            const $item = $(this);
            const $wrapper = $item.closest(".sidebar_item_wrapper");
            const $submenu = $wrapper.find(".sidebar_submenu");

            if ($submenu.length) {
                $(".sidebar_submenu").not($submenu).slideUp(150);
                $(".sidebar_item").not($item).removeClass("active");

                const is_open = $submenu.is(":visible");
                $submenu.slideToggle(150);
                $item.toggleClass("active", !is_open);
            } else {
                $(".sidebar_submenu").slideUp(150);
                $(".sidebar_item").removeClass("active");
                handle_click($item);
            }
        });

        $(".sidebar_subitem").off("click").on("click", function () {
            const $sub = $(this);
            handle_click($sub);
        });
    }
}
