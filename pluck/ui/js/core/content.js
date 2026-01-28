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

import { Cards } from "../components/cards.js";
import { Slots } from "../components/slots.js";
import { InputGroups } from "../components/input_groups.js";

/**
 * @class Content
 * @description Manages page-based UI content layout, rendering sections and components dynamically.
 */
export class Content {
    /**
     * @param {Object} [pages={}]
     * @param {string} [classes=""]
     * @param {Object} [layout={ left: 1, center: 2, right: 1 }]
     */
    constructor(pages = {}, classes = "", layout = { left: 1, center: 2, right: 1 }) {
        this.pages = pages;
        this.classes = classes;
        this.layout = layout;

        // Items organized: page -> section -> group -> slot_num -> item
        this.page_items = Object.create(null);

        this.current_slots_instances = [];
        this.current_page_id = null;
    }

    /** @returns {string} HTML for content grid layout */
    get_html() {
        return `<div class="content_grid ${this.classes}">` +
            ["left", "center", "right"].map(s => `
                <div class="content_section ${s}" style="grid-column: span ${this.layout[s] || 0};">
                    <div class="content_title ${s}"></div><div class="content_body ${s}"></div>
                </div>`).join("") +
        `</div>`.trim();
    }

    /**
     * @param {string} [container="#ui_main"]
     */
    append_to(container = "#ui_main") {
        $(container).append(this.get_html());
    }

    /**
     * @param {string} id
     * @returns {Promise<void>}
     */
    async show_page(id) {
        this.current_page_id = id;

        const config = this.pages[id];
        if (!config || typeof config !== "object") {
            $(".content_body.center").html(`<div class="placeholder_content"></div>`);
            return;
        }

        // Initialize items structure once per page
        if (!this.page_items[id]) {
            this.page_items[id] = { left: {}, center: {}, right: {} };

            for (const section of ["left", "center", "right"]) {
                const sec = config[section];

                if (sec?.groups) {
                    sec.groups.forEach(group => {
                        const group_id = group.id;
                        if (group.items) {
                            this.page_items[id][section][group_id] =
                                JSON.parse(JSON.stringify(group.items));
                        }
                    });
                } else if (sec?.items) {
                    this.page_items[id][section]["_default"] =
                        JSON.parse(JSON.stringify(sec.items));
                }
            }
        }

        const slots_instances = [];

        for (const s of ["left", "center", "right"]) {
            const section = config[s] || null;
            const span = config.layout?.[s] ?? this.layout[s] ?? 0;

            const $section = $(`.content_section.${s}`);
            const $title = $section.find(`.content_title.${s}`);
            const $body = $section.find(`.content_body.${s}`);

            $section.css("grid-column", `span ${span || 0}`).toggle(span > 0);
            $title.empty();
            $body.empty();

            if (!section) {
                $body.html(`<div class="placeholder_section"></div>`);
                continue;
            }

            if (section.title) {
                $title.html(
                    typeof section.title === "object"
                        ? `<h3>${section.title.text}${section.title.span ? ` <span>${section.title.span}</span>` : ""}</h3>`
                        : `<h3>${section.title}</h3>`
                );
            }

            if (section.type === "slots") {
                const slots_instance = new Slots({
                    ...section,
                    section_key: s,
                    page_items: this.page_items[id][s],
                    on_swap: this.create_swap_handler(id)
                });

                slots_instance.render_to($body);
                slots_instances.push(slots_instance);
            } else {
                const html = await this.render_content(section);
                $body.html(html);
            }
        }

        this.current_slots_instances = slots_instances;
        window.ui_instance?.tooltip?.bind_tooltips();
    }

    /**
     * @param {string} page_id
     * @returns {Function}
     */
    create_swap_handler(page_id) {
        return async (from_slot_num, to_slot_num, from_group_id, to_group_id, from_section, to_section) => {
            const items = this.page_items[page_id];

            items[from_section] ??= {};
            items[to_section] ??= {};
            items[from_section][from_group_id] ??= {};
            items[to_section][to_group_id] ??= {};

            const src = items[from_section][from_group_id];
            const dst = items[to_section][to_group_id];

            const from_item = src[from_slot_num];
            if (!from_item) return;

            const to_item = dst[to_slot_num];

            if (to_item) {
                src[from_slot_num] = to_item;
                dst[to_slot_num] = from_item;
            } else {
                dst[to_slot_num] = from_item;
                delete src[from_slot_num];
            }

            this.on_item_moved({
                page_id,
                from_section,
                to_section,
                from_group: from_group_id,
                to_group: to_group_id,
                from_slot: from_slot_num,
                to_slot: to_slot_num,
                swap: !!to_item
            });

            for (const inst of this.current_slots_instances) {
                inst.update_items(this.page_items[page_id][inst.section_key]);
            }
        };
    }

    /**
     * @param {Object} move_data
     */
    on_item_moved(move_data) {
        console.group('Item Movement');
        console.log('From:', `${move_data.from_section}.${move_data.from_group}[${move_data.from_slot}]`);
        console.log('To:', `${move_data.to_section}.${move_data.to_group}[${move_data.to_slot}]`);
        console.log('Type:', move_data.swap ? 'SWAP' : 'MOVE');
        console.groupEnd();

        send_nui_callback("slots_moved_item", move_data);
    }

    /**
     * @param {string} html
     * @param {string} [section="center"]
     */
    set_content(html, section = "center") {
        $(`.content_body.${section}`).html(html);
    }

    /** @returns {void} */
    clear() {
        $(".content_body, .content_title").empty();
    }

    /**
     * @param {Object} data
     * @returns {Promise<string>}
     */
    async render_content(data) {
        const map = {
            cards: () => this.build_cards(data),
            slots: () => this.build_slots(data),
            input_groups: () => this.build_input_groups(data)
        };
        return map[data.type]?.() || "";
    }

    /** @param {Object} data */
    build_cards(data) {
        return new Cards(data).get_html();
    }

    /** @param {Object} data */
    build_slots(data) {
        return new Slots(data).get_html();
    }

    /**
     * @param {Object} data
     * @returns {string}
     */
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
