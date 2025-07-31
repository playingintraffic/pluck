/*
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
*/

/**
 * @class Notify
 * @description Displays floating notification toasts on screen.
 */
export class Notify {
    /**
     * @param {Object} config
     * @param {string} [config.position="top-right"] - Placement of notifications.
     * @param {string} [config.fill_direction="down"] - Direction of stacking ("up" or "down").
     */
    constructor({ position = "top-right", fill_direction = "down" } = {}) {
        this.position = position;
        this.fill_direction = fill_direction;
        this.container_id = "notify_container";
        this.create_container();
    }

    /** @private Creates main notification container */
    create_container() {
        if ($(`#${this.container_id}`).length) return;
        const style = this.resolve_position_style();
        const dir = this.fill_direction === "up" ? "column-reverse" : "column";
        $("body").append(`<div id="${this.container_id}" class="notify_container" style="position:absolute;${style.position};display:flex;flex-direction:${dir};align-items:${style.align};justify-content:${style.justify};gap:1vh;z-index:9999;pointer-events:none;"></div>`);
    }

    /** @private Handles notification positioning */
    resolve_position_style() {
        const map = {
            "top-left": { position: "top:2vh;left:2vw;", align: "flex-start", justify: "flex-start" },
            "top-center": { position: "top:2vh;left:50%;transform:translateX(-50%);", align: "center", justify: "flex-start" },
            "top-right": { position: "top:2vh;right:2vw;", align: "flex-end", justify: "flex-start" },
            "bottom-left": { position: "bottom:2vh;left:2vw;", align: "flex-start", justify: "flex-end" },
            "bottom-center": { position: "bottom:2vh;left:50%;transform:translateX(-50%);", align: "center", justify: "flex-end" },
            "bottom-right": { position: "bottom:2vh;right:2vw;", align: "flex-end", justify: "flex-end" },
            "left-top": { position: "top:2vh;left:2vw;", align: "flex-start", justify: "flex-start" },
            "left-center": { position: "top:50%;left:2vw;transform:translateY(-50%);", align: "flex-start", justify: "center" },
            "left-bottom": { position: "bottom:2vh;left:2vw;", align: "flex-start", justify: "flex-end" },
            "right-top": { position: "top:2vh;right:2vw;", align: "flex-end", justify: "flex-start" },
            "right-center": { position: "top:50%;right:2vw;transform:translateY(-50%);", align: "flex-end", justify: "center" },
            "right-bottom": { position: "bottom:2vh;right:2vw;", align: "flex-end", justify: "flex-end" }
        };
        return map[this.position] || map["top-right"];
    }

    /**
     * Displays a notification.
     * @param {Object} opts
     * @param {string} [opts.type="info"] - Notification type (info, success, error, etc.)
     * @param {string|null} [opts.header=null] - Optional header text.
     * @param {string} opts.message - Body message text.
     * @param {number} [opts.duration=4000] - Auto-close duration in ms. Set to 0 for sticky.
     * @param {string|null} [opts.icon=null] - Optional icon class.
     * @param {boolean} [opts.match_border=false] - Whether to color-match border to type.
     * @param {boolean} [opts.match_shadow=false] - Whether to color-match shadow to type.
     */
    show({ type = "info", header = null, message = "", duration = 4000, icon = null, match_border = false, match_shadow = false }) {
        if (!message) return;
        const icon_html = icon ? `<i class="${icon} notify_icon"></i>` : "";
        const classes = `${match_border ? ` notify_border_${type}` : ""}${match_shadow ? ` notify_shadow_${type}` : ""}`;
        const notify = `
            <div class="notify notify_${type}${classes}">
                ${header ? `<div class="notify_header">${icon_html}${header}</div>` : `<div class="notify_body">${icon_html}${message}</div>`}
                ${header ? `<div class="notify_body">${message}</div>` : ""}
                ${duration > 0 ? `<div class="notify_bar"><div class="notify_fill"></div></div>` : ""}
            </div>
        `;
        const $el = $(notify);
        $(`#${this.container_id}`).append($el);
        if (duration > 0) {
            $el.find(".notify_fill").animate({ width: "0%" }, duration, "linear");
            setTimeout(() => $el.fadeOut(300, () => $el.remove()), duration + 100);
        }
    }
}

/*
const notify = new Notify({
    position: "right-center",
    fill_direction: "up"
});

notify.show({
    type: "success",
    header: "colour matched",
    message: "Notification with colour matched shadow only.",
    icon: "fa-solid fa-check-circle",
    duration: 300000,
    match_border: false,
    match_shadow: true
});

notify.show({
    type: "success",
    header: "colour matched",
    message: "Notification with colour matched border only.",
    icon: "fa-solid fa-check-circle",
    duration: 300000,
    match_border: true,
    match_shadow: false
});

notify.show({
    type: "success",
    header: "colour matched",
    message: "Notification with colour matched border/shadow.",
    icon: "fa-solid fa-check-circle",
    duration: 300000,
    match_border: true,
    match_shadow: true
});

notify.show({
    type: "info",
    message: "Some basic regular notification, no colour match, no header.",
    icon: "fa-solid fa-exclamation-circle",
    duration: 500000
});
*/