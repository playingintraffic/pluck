--[[
--------------------------------------------------

This file is part of PLUCK.
You are free to use these files within your own resources.
Please retain the original credit and attached MIT license.
Support honest development.

Author: Case @ BOII Development
License: https://github.com/boiidevelopment/pluck/blob/main/LICENSE
GitHub: https://github.com/playingintraffic/pluck

--------------------------------------------------
]]

pluck = {}

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
pluck.resource_name = GetCurrentResourceName()
pluck.embedded_path = nil
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

--- Prints a formatted debug message to the console.
--- @param level string: One of "debug", "info", "success", "warn", "error", "critical", "dev".
--- @param message string: Pre-formatted message to display.
function pluck.log(level, message)
    if not pluck.debug_enabled then return end

    local clr = pluck.debug_colours[level] or "^7"
    local time = pluck.get_current_time()

    print(("%s[%s] [PLUCK] [%s]:^7 %s"):format(clr, time, level:upper(), message))
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

--- @section UI Builder Functions

if pluck.is_server then

    --- Builds a UI on the specified client.
    --- @param source number: The player source ID to send the UI to.
    --- @param ui table: The UI configuration table.
    local function build_ui(source, ui)
        if not source or not ui then 
            pluck.log("error", "build_ui: Invalid params provided.") 
            return 
        end

        pluck.log("info", ("build_ui: Sending UI to [%s]"):format(source))
        TriggerClientEvent("pluck:build_ui", source, ui)
    end

    pluck.build_ui = build_ui
    exports("build_ui", build_ui)
    exports("build", build_ui) -- added back for back compat may remove in future switch to `build_ui` 

    --- Closes the UI on the specified client.
    --- @param source number: The player source ID to close the UI for.
    local function close_ui(source)
        if not source then
            pluck.log("error", "close_ui: Player source missing")
            return
        end
        TriggerClientEvent("pluck:close_ui", source)
    end

    pluck.close_ui = close_ui
    exports("close_ui", close_ui)

else

    --- Sends a full UI to the NUI layer and sets focus.
    --- @param ui table: UI config table to build.
    local function build_ui(ui)
        if not ui then 
            pluck.log("error", "build_ui: UI config missing.") 
            return 
        end

        local safe_ui = pluck.sanitize_ui(ui, "ui")
        if not safe_ui then 
            pluck.log("error", "build_ui: UI config wasn't returned after sanitize.") 
            return 
        end
        
        pluck.log("info", "build_ui: Building UI and setting NUI focus.")
        SetNuiFocus(true, true)
        SendNUIMessage({ 
            func = "build_ui",
            payload = safe_ui 
        })
    end

    pluck.build_ui = build_ui
    exports("build_ui", build_ui)
    exports("build", build_ui) -- added back for back compat may remove in future switch to `build_ui` 

    --- Closes the UI and removes NUI focus.
    local function close_ui()
        SendNUIMessage({ func = "close_ui" })
        SetNuiFocus(false, false)
    end

    pluck.close_ui = close_ui
    exports("close_ui", close_ui)

    --- @section Events

    --- Receives and builds a UI triggered by the server.
    --- @param ui table: UI configuration.
    RegisterNetEvent("pluck:build_ui", function(ui)
        pluck.log("dev", "Event triggered: build_ui")
        build_ui(ui)
    end)

    --- Event to close builder ui.
    RegisterNetEvent("pluck:close_ui", function()
        close_ui()
    end)

    --- @section NUI Callbacks

    --- Removes focus from the NUI.
    --- Triggered by NUI when UI needs to close.
    RegisterNUICallback("nui:remove_focus", function()
        pluck.log("debug", "nui:remove_focus - Focus cleared.")
        SetNuiFocus(false, false)
    end)

    --- Handles generic action callbacks sent from the UI.
    --- @param data table: Data from the NUI containing the action to perform.
    --- @param cb function: Callback to signal response.
    RegisterNUICallback("nui:handler", function(data, cb)
        pluck.log("debug", ("nui:handler invoked with: %s"):format(json.encode(data)))
        if not data or not data.action then
            pluck.log("error", "NUI handler: Missing action field.")
            if cb then cb(false) end
            return
        end
        
        local success, result = pcall(pluck.call_registered_function, data.action, data)

        if not success then
            pluck.log("error", ("NUI handler: Function call failed - %s"):format(result))
        end

        if data.should_close then
            SetNuiFocus(false, false)
        end

        if cb then cb(true) end
    end)
    
end