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
 * Extracts all `data-*` attributes from a jQuery element as an object.
 * @param {jQuery} $el - A jQuery-wrapped DOM element
 * @returns {Object} A key-value object of all dataset attributes
 */
export function extract_dataset($el) {
    const data = {};
    $.each($el.data(), (k, v) => {
        const snake_key = k.replace(/([A-Z])/g, '_$1').toLowerCase();
        data[snake_key] = v;
    });
    return data;
}

/**
 * Sends a NUI callback to the UI builder handler.
 * @param {string} action - The name of the action to trigger.
 * @param {Object} [dataset={}] - The dataset to send with the request.
 * @param {Object} [additional={}] - Additional options for the request.
 * @param {boolean} [additional.should_close=false] - Whether the UI should be closed after the callback.
 * @returns {Promise<any|null>} The response from the NUI handler, or `null` if the request failed.
 */
export async function send_nui_callback(action, dataset = {}, additional = {}) {
    const payload = {
        action,
        dataset,
        should_close: additional.should_close || false
    };

    const res = await fetch(`https://pluck/nui:handler`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    return await res.json();
}

/**
 * Resolves a safe image path for internal or external usage.
 * @param {string} image - The image filename, path, or full URL.
 * @param {string} base - The base directory path (e.g. "/pluck/ui/assets/logos/"). Ignored if image is a full path.
 * @returns {string} Resolved image path.
 */
export function resolve_image_path(image, base = "/pluck/ui/assets/") {
    if (!image || typeof image !== "string") return "";
    if (/^(nui:\/\/|https?:\/\/)/i.test(image)) return image;
    if (/^\//.test(image)) return image;
    return base + image;
}