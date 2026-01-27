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

if core.is_server then

    local function slot_popup(source, data)
        if not data then return end
        TriggerClientEvent("pluck:cl:slot_popup", source, data)
    end

    exports("slot_popup", slot_popup)

end

if not core.is_server then

    local function slot_popup(data)
        if not data then return end
        SendNUIMessage({
            func = "slot_popup",
            payload = data
        })
    end

    exports("slot_popup", slot_popup)

    RegisterNetEvent("pluck:cl:slot_popup", function(data)
        slot_popup(data)
    end)

end