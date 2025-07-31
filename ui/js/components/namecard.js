/*
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
*/

import { resolve_image_path } from "/ui/js/utils.js";

/**
 * @class Namecard
 * @description Renders a player profile card with avatar, name, title, level, and tier.
 */
export class Namecard {
    /**
     * @param {Object} config
     * @param {string} config.avatar
     * @param {string} [config.background="avatar_placeholder.png"]
     * @param {string} [config.name="Player Name"]
     * @param {string} [config.title="Player Title"]
     * @param {string|number} [config.level="99"]
     * @param {string} [config.tier="bronze"]
     */
    constructor({ avatar, background = "avatar_placeholder.png", name = "Player Name", title = "Player Title", level = "99", tier = "bronze" }) {
        this.avatar = avatar;
        this.background = background;
        this.name = name;
        this.title = title;
        this.level = level;
        this.tier = tier;
    }

    /** @returns {string} Full HTML for the namecard */
    get_html() {
        const frame_class = this.frame ? `namecard_frame_${this.frame}` : "";

        const bg_url = resolve_image_path(this.background, "/ui/assets/namecards/backgrounds/");
        const avatar_url = resolve_image_path(this.avatar, "/ui/assets/namecards/avatars/");

        return `
            <div class="namecard ${this.tier} ${frame_class}" style="background-image:url(${bg_url})">
                <div class="namecard_avatar" style="background-image:url(${avatar_url})"></div>
                ${this.frame ? `<div class="namecard_frame_overlay"></div>` : ""}
                <div class="namecard_info">
                    <div class="namecard_name">${this.name}</div>
                    <div class="namecard_title">${this.title}</div>
                </div>
                <div class="namecard_level ${this.tier}">Lv. ${this.level}</div>
            </div>
        `.trim();
    }

    /** @todo Add a method to update dynamically at some point.. */ 
}
