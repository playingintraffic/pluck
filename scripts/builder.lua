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

if pluck.is_server then

    --- Builds a UI on the specified client.
    --- @param source number: The player source ID to send the UI to.
    --- @param ui table: The UI configuration table.
    exports("build", function(source, ui)
        if not source or not ui then pluck.log("error", "build: Invalid params provided.") return end

        pluck.log("info", ("build: Sending UI to [%s]"):format(source))
        TriggerClientEvent("pluck:build", source, ui)
    end)

else

    --- @section Functions

    --- Sends a full UI to the NUI layer and sets focus.
    --- @param ui table: UI config table to build.
    local function build(ui)
        if not ui then pluck.log("error", "build: UI config missing.") return end

        local safe_ui = pluck.build_ui(ui)
        if not safe_ui then pluck.log("error", "build: UI config wasnt returned after sanitize.") return end
        pluck.log("info", "build: Building UI and setting NUI focus.")
        SetNuiFocus(true, true)
        SendNUIMessage({ 
            func = "build_ui",
            payload = safe_ui 
        })
    end

    --- Exported client-side function to build a UI.
    --- @param ui table: Full UI configuration.
    exports("build", build)

    --- @section Events

    --- Receives and builds a UI triggered by the server.
    --- @param ui table: UI configuration.
    RegisterNetEvent("pluck:build", function(ui)
        pluck.log("dev", "Event triggered: build UI")
        build(ui)
    end)

    --- Event to close builder ui.
    RegisterNetEvent("pluck:close", function()
        SendNUIMessage({ func = "close_ui" })
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