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

/**
 * Extracts all `data-*` attributes from a jQuery element as an object.
 * @param {jQuery} $el - A jQuery-wrapped DOM element
 * @returns {Object} A key-value object of all dataset attributes
 */
export function extract_dataset($el) {
    const data = {};
    $.each($el.data(), (k, v) => data[k] = v);
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
 * @param {string} image - The image filename or path.
 * @param {string} base - The base directory path (e.g. "/ui/assets/logos/").
 * @returns {string} Resolved image path.
 */
export function resolve_image_path(image, base = "/ui/assets/") {
    if (!image || typeof image !== "string") return "";
    if (/^(nui:\/\/|https?:\/\/)/i.test(image)) return image;
    return base + image;
}