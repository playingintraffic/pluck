--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
]]

pluck = setmetatable({}, { __index = _G })

pluck.debug_enabled = true
pluck.debug_colours = {
    reset = "^7",
    debug = "^6",
    info = "^5",
    success = "^2",
    warn = "^3",
    error = "^8",
    critical = "^1",
    dev = "^9"
}
pluck.is_server = IsDuplicityVersion()
pluck.registered_functions = {}

--- @section Utility Functions

--- Registers a function under a unique key for callbacks.
--- @param label string: The unique key to associate with the function.
--- @param func function: The function to register.
function pluck.register_function(label, func)
    pluck.registered_functions[label] = func
end

--- Calls a registered function by its label.
--- @param label string: The key associated with the function.
--- @return The result of the function, or false if not found.
function pluck.call_registered_function(label, data)
    if not label then pluck.log("error", "function label is required") return false end

    local func = pluck.registered_functions[label]
    if not func then pluck.log("error", ("function with label %s not found"):format(label)) return false end

    return pluck.registered_functions[label](data)
end

--- Recursively sanitizes a UI config by replacing functions with labels and storing them
--- @param data table: The original UI configuration table
--- @param path string: Current traversal path (used to generate unique labels)
--- @return table: A version of the UI config safe to send to JS
function pluck.sanitize_ui(data, path)
    path = path or "root"
    local out = {}

    for k, v in pairs(data) do
        local p = ("%s_%s"):format(path, tostring(k)):gsub("[^%w_]", "")

        if (k == "on_action" or k == "on_increment" or k == "on_decrement") then
            pluck.register_function(p, v)
            out.action = p
        elseif type(v) == "table" then
            out[k] = pluck.sanitize_ui(v, p)
        else
            out[k] = v
        end
    end

    return out
end

--- Takes a full UI config and sanitizes it for sending to NUI
--- @param config table
--- @return table
function pluck.build_ui(config)
    return pluck.sanitize_ui(config, "ui")
end

--- Copied from BDTK debugging functions to keep BDUK standalone.
--- Returns the current timestamp as a formatted string.
--- @return string: Formatted time (YYYY-MM-DD HH:MM:SS)
function pluck.get_current_time()
    if pluck.is_server then return os.date("%Y-%m-%d %H:%M:%S") end
    if GetLocalTime then
        local y, m, d, h, min, s = GetLocalTime()
        return string.format("%04d-%02d-%02d %02d:%02d:%02d", y, m, d, h, min, s)
    end
    return "0000-00-00 00:00:00"
end

--- Copied from BDTK debugging functions to keep BDUK standalone.
--- Prints a formatted debug message to the console.
--- @param level string: One of "debug", "info", "success", "warn", "error", "critical", "dev".
--- @param message string: Pre-formatted message to display.
function pluck.log(level, message)
    if not pluck.debug_enabled then return end

    local clr = pluck.debug_colours[level] or "^7"
    local time = pluck.get_current_time()

    print(("%s[%s] [BDUK] [%s]:^7 %s"):format(clr, time, level:upper(), message))
end

--- Creates a deep copy of a table, ensuring changes to the copy won't affect the original table.
--- @param t table: The table to copy.
--- @return table: A deep copy of the table.
function pluck.deep_copy(t)
    local orig_type = type(t)
    local copy

    if orig_type == 'table' then
        copy = {}
        for orig_key, orig_value in next, t, nil do
            copy[pluck.deep_copy(orig_key)] = pluck.deep_copy(orig_value)
        end
        setmetatable(copy, pluck.deep_copy(getmetatable(t)))
    else
        copy = t
    end

    return copy
end