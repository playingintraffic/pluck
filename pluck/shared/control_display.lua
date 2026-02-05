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

    --- @section Functions

    --- Sets controls in control display
    --- @param source number: Player source
    --- @param title string: Title for the control display
    --- @param controls table: Table of control objects { key, action }
    local function set_controls(source, title, controls)
        if not source or not title or not controls then
            pluck.log("error", "Player source, title, or controls missing")
            return
        end
        TriggerClientEvent("pluck:set_controls", source, title, controls)
    end

    pluck.set_controls = set_controls
    exports("set_controls", set_controls)

    --- Shows control display
    --- @param source number: Player source
    local function show_controls(source)
        if not source then
            pluck.log("error", "Player source missing")
            return
        end
        TriggerClientEvent("pluck:show_controls", source)
    end

    pluck.show_controls = show_controls
    exports("show_controls", show_controls)

    --- Hides control display
    --- @param source number: Player source
    local function hide_controls(source)
        if not source then
            pluck.log("error", "Player source missing")
            return
        end
        TriggerClientEvent("pluck:hide_controls", source)
    end

    pluck.hide_controls = hide_controls
    exports("hide_controls", hide_controls)

    --- Destroys control display
    --- @param source number: Player source
    local function destroy_controls(source)
        if not source then
            pluck.log("error", "Player source missing")
            return
        end
        TriggerClientEvent("pluck:destroy_controls", source)
    end

    pluck.destroy_controls = destroy_controls
    exports("destroy_controls", destroy_controls)

end

if not pluck.is_server then 

    --- @section Functions

    --- Sets controls in control display
    --- @param title string: Title for the control display
    --- @param controls table: Table of control objects { key, action }
    local function set_controls(title, controls)
        SendNUIMessage({
            func = "set_controls",
            payload = {
                title = title,
                controls = controls
            }
        })
    end

    pluck.set_controls = set_controls
    exports("set_controls", set_controls)

    --- Shows control display
    local function show_controls()
        SendNUIMessage({ func = "show_controls" })
    end

    pluck.show_controls = show_controls
    exports("show_controls", show_controls)

    --- Hides control display
    local function hide_controls()
        SendNUIMessage({ func = "hide_controls" })
    end

    pluck.hide_controls = hide_controls
    exports("hide_controls", hide_controls)

    --- Destroys control display
    local function destroy_controls()
        SendNUIMessage({ func = "destroy_controls" })
    end

    pluck.destroy_controls = destroy_controls
    exports("destroy_controls", destroy_controls)

    --- @section Events

    --- Event to set controls
    --- @param title string: Title for the control display
    --- @param controls table: Table of control objects
    RegisterNetEvent("pluck:set_controls", function(title, controls)
        if not title or not controls then return print("title or controls missing") end
        set_controls(title, controls)
    end)

    --- Event to show controls
    RegisterNetEvent("pluck:show_controls", function()
        show_controls()
    end)

    --- Event to hide controls
    RegisterNetEvent("pluck:hide_controls", function()
        hide_controls()
    end)

    --- Event to destroy controls
    RegisterNetEvent("pluck:destroy_controls", function()
        destroy_controls()
    end)

    --- @section Test Commands

    RegisterCommand("test_controls", function()
        print("testing controls")
        set_controls("PLACEMENT MODE", {
            {
                key = "W",
                action = "Move Forward"
            },
            {
                key = "A",
                action = "Move Left"
            },
            {
                key = "S",
                action = "Move Backward"
            },
            {
                key = "D",
                action = "Move Right"
            },
            {
                key = "G",
                action = "Rotate Left"
            },
            {
                key = "H",
                action = "Rotate Right"
            },
            {
                key = "Enter",
                action = "Confirm"
            },
            {
                key = "Backspace",
                action = "Cancel"
            }
        })
        show_controls()
    end)

    RegisterCommand("test_controls_hide", function()
        hide_controls()
    end)

    RegisterCommand("test_controls_show", function()
        show_controls()
    end)

    RegisterCommand("test_controls_destroy", function()
        destroy_controls()
    end)

end