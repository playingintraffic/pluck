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

    --- Shows a slot popup notification
    --- @param source number: Player source
    --- @param data table: Popup data containing message, icon, etc.
    local function slot_popup(source, data)
        if not source or not data then
            pluck.log("error", "Player source or data missing")
            return
        end
        TriggerClientEvent("pluck:slot_popup", source, data)
    end

    pluck.slot_popup = slot_popup
    exports("slot_popup", slot_popup)

end

if not pluck.is_server then

    --- @section Functions

    --- Shows a slot popup notification
    --- @param data table: Popup data containing message, icon, etc.
    local function slot_popup(data)
        if not data then return end
        SendNUIMessage({
            func = "slot_popup",
            payload = data
        })
    end

    pluck.slot_popup = slot_popup
    exports("slot_popup", slot_popup)

    --- @section Events

    --- Event to show slot popup
    --- @param data table: Popup data
    RegisterNetEvent("pluck:slot_popup", function(data)
        slot_popup(data)
    end)

end