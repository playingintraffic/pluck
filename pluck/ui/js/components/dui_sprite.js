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

/**
 * @class DUISprite
 * @description Renders a compact 3D world-space UI element (DUI) with optional icon or image,
 * header, key hints, values, and progressbars. Used by DUI zones to display world interaction info.
 */
export class DUISprite {
    /**
     * @param {Object} options
     * @param {string} [options.header="Header Missing"] Header text displayed at top.
     * @param {string|null} [options.icon=null] Font Awesome icon class (if provided).
     * @param {string|null} [options.image=null] Image URL or NUI path (shown if icon not used).
     * @param {Array<Object>} [options.keys=[]] Key hint list (e.g. [{ key: "E", label: "Interact" }]).
     * @param {Object} [options.additional={}] Extra data including progressbars or values.
     * @param {Object} [options.additional.progressbars] Progressbars to show (e.g. { health: { label, value } }).
     * @param {Object} [options.additional.values] Informational values (e.g. { rank: { label, value } }).
     */
    constructor(options) {
        this.keys = options.keys || [];
        this.icon = options.icon || null;
        this.image = options.image || null;
        this.header = options.header || "Header Missing";
        this.progressbars = options.additional?.progressbars || {};
        this.values = options.additional?.values || {};

        this.build();
    }

    /** Builds and injects the HTML structure into the DUI container. */
    build() {
        const key_count = this.keys.length;
        const key_hints = this.keys.map((key_obj, idx) => {
            const is_last_odd = key_count % 2 !== 0 && idx === key_count - 1;
            const is_full_row = key_count === 1 || is_last_odd;
            return `
                <div class="dui_keys${is_full_row ? " full_row" : ""}">
                    <span class="dui_key"><p>${key_obj.key}</p></span> 
                    <span class="dui_key_label">${key_obj.label}</span>
                </div>`;
        }).join("");


        const skill_keys = Object.keys(this.progressbars);
        let progressbars_html = "";

        if (skill_keys.length > 0) {
            progressbars_html = `<div class="progress_containers">`;

            skill_keys.forEach((key, idx) => {
                const bar = this.progressbars[key];
                const is_last_odd = skill_keys.length % 2 !== 0 && idx === skill_keys.length - 1;
                const is_full_row = skill_keys.length === 1 || is_last_odd;

                progressbars_html += `
                    <div class="progress_item${is_full_row ? " full_row" : ""}">
                        <h3>${bar.label}</h3>
                        <div class="interact_progress_bar">
                            <div class="interact_progress_bar_fill" style="width: ${bar.value}%;"><div class="interact_progress_header">${bar.value}%</div></div>
                        </div>
                    </div>`;
            });

            progressbars_html += `</div>`;
        }


        const values_section = Object.keys(this.values).length > 0
            ? `<ul class="values_list">
                ${Object.entries(this.values).map(([key, value]) => `
                    <li><strong>${value.label}:</strong> ${value.value}</li>
                `).join("")}
            </ul>`
            : "";

        const content = `
            <div class="interact_ui">
                <div class="interact_header">
                    ${this.icon ? `<i class="${this.icon}"></i>` : this.image ? `<img class="dui_image" src="${this.image}" alt="icon image" />` : ""}
                    ${this.header ? `<div class="header_text">${this.header}</div>` : ""}
                </div>
                ${progressbars_html}
                ${values_section}
                <div class="keys_container">
                    ${key_hints}
                </div>
            </div>`;

        $("#dui_container").html(content);
    }

    /** Clears the DUI container. */
    close() {
        $("#dui_container").empty();
    }
}

/*
const test_dui = new DUISprite({
    header: "Some Test Dui",
    image: "/pluck/ui/assets/logos/pit_100.png",
    keys: [
        { key: "E", label: "Interact" },
        { key: "F", label: "Alternate" }
    ],
    additional: {
        progressbars: {
            strength: { label: "Strength", value: 75 },
            agility: { label: "Agility", value: 50 },
            health: { label: "Health", value: 50 }
        },
        values: {
            rank: { label: "Rank", value: "Sergeant" }
        }
    }
});

$("body").css({ "background": "grey" });
*/