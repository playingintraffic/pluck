/*
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
*/

import { Cards } from "/ui/js/components/cards.js"
import { InputGroups } from "/ui/js/components/input_groups.js"

/**
 * @class Content
 * @description Manages rendering and layout of page content for left, center, and right regions.
 */
export class Content {
    /**
     * @param {Object} pages - Keyed config for each content page.
     * @param {string} [classes=""] - Extra CSS classes for the container.
     * @param {Object} [layout={ left: 1, center: 2, right: 1 }] - Grid span layout.
     */
    constructor(pages = {}, classes = "", layout = { left: 1, center: 2, right: 1 }) {
        this.pages = pages; this.classes = classes; this.layout = layout;
    }

    /** @returns {string} HTML for the 3-column content wrapper */
    get_html() {
        return `<div class="content_grid ${this.classes}">` +
            ["left", "center", "right"].map(s => `
                <div class="content_section ${s}" style="grid-column: span ${this.layout[s] || 0};">
                    <div class="content_title ${s}"></div><div class="content_body ${s}"></div>
                </div>`).join("") +
        `</div>`.trim();
    }

    /** @param {string} [container="#ui_main"] Appends the content layout */
    append_to(container = "#ui_main") { $(container).append(this.get_html()); }

    /** @param {string} id Page key to display */
    async show_page(id) {
        const config = this.pages[id];
        if (!config || typeof config !== "object") {
            $(".content_body.center").html(`<div class="placeholder_content"></div>`);
            return;
        }
        for (const s of ["left", "center", "right"]) {
            const span = config.layout?.[s] ?? this.layout[s] ?? 0;
            const section = config[s] || null;
            const $el = $(`.content_section.${s}`);
            $el.css("grid-column", `span ${span || 0}`).show();
            if (section) {
                const html = await this.render_content(section);
                if (html.trim()) {
                    $(`.content_title.${s}`).html(section.title ? (typeof section.title === "object" ? `<h3>${section.title.text}${section.title.span ? ` <span>${section.title.span}</span>` : ""}</h3>` : `<h3>${section.title}</h3>`) : "");
                    $(`.content_body.${s}`).html(html);
                } else {
                    $(`.content_title.${s}`).empty();
                    $(`.content_body.${s}`).html(`<div class="placeholder_section"></div>`);
                }
            } else {
                $(`.content_title.${s}`).empty();
                $(`.content_body.${s}`).html(`<div class="placeholder_section"></div>`);
            }
        }
        window.bduk_instance?.tooltip?.bind_tooltips();
    }


    /** @param {string} html @param {string} [section="center"] */
    set_content(html, section = "center") { $(`.content_body.${section}`).html(html); }

    /** Clears all section content and titles */
    clear() { $(".content_body, .content_title").empty(); }

    /** @param {Object} data @returns {Promise<string>} Rendered HTML */
    async render_content(data) {
        const map = {
            cards: () => this.build_cards(data),
            input_groups: () => this.build_input_groups(data)
        };
        return map[data.type]?.() || "";
    }

    /** @param {Object} data @returns {string} Cards HTML */
    build_cards(data) { return new Cards(data).get_html(); }

    /** @param {Object} data @returns {string} InputGroups HTML */
    build_input_groups(data) {
        return new InputGroups({
            id: data.id || "input_groups",
            title: data.title || "",
            layout: data.layout || {},
            groups: Array.isArray(data.groups) ? data.groups : Object.values(data.groups || {}),
            buttons: Array.isArray(data.buttons) ? data.buttons : Object.values(data.buttons || {})
        }).get_html();
    }
}