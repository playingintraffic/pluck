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
