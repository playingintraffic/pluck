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

if not pluck.is_server then 

    --- @section Functions

    --- Updates interaction hint
    --- @param data table: Interaction hint data { image, label, quantity, status_text, action_text }
    local function update_interaction_hint(data)
        SendNUIMessage({
            func = "update_interaction_hint",
            payload = data
        })
    end

    exports("update_interaction_hint", update_interaction_hint)

    --- Updates interaction hint quantity
    --- @param amount number: New quantity amount
    local function update_hint_quantity(amount)
        SendNUIMessage({
            func = "update_hint_quantity",
            payload = { amount = amount }
        })
    end

    exports("update_hint_quantity", update_hint_quantity)

    --- Clears interaction hint
    local function clear_interaction_hint()
        SendNUIMessage({ func = "clear_interaction_hint" })
    end

    exports("clear_interaction_hint", clear_interaction_hint)

    --- Destroys interaction hint
    local function destroy_interaction_hint()
        SendNUIMessage({ func = "destroy_interaction_hint" })
    end

    exports("destroy_interaction_hint", destroy_interaction_hint)

    --- @section Events

    --- Event to update interaction hint
    --- @param data table: Interaction hint data
    RegisterNetEvent("pluck:cl:update_interaction_hint", function(data)
        if not data then return print("data missing") end
        update_interaction_hint(data)
    end)

    --- Event to update hint quantity
    --- @param amount number: New quantity amount
    RegisterNetEvent("pluck:cl:update_hint_quantity", function(amount)
        if not amount then return print("amount missing") end
        update_hint_quantity(amount)
    end)

    --- Event to clear interaction hint
    RegisterNetEvent("pluck:cl:clear_interaction_hint", function()
        clear_interaction_hint()
    end)

    --- Event to destroy interaction hint
    RegisterNetEvent("pluck:cl:destroy_interaction_hint", function()
        destroy_interaction_hint()
    end)

    --- @section Test Commands

    RegisterCommand("test_hint", function()
        update_interaction_hint({
            image = "/ui/assets/items/water.png",
            label = "Water Bottle",
            quantity = 5,
            action_text = "Press F to drink or E to change"
        })
    end)

    RegisterCommand("test_hint_update", function()
        update_hint_quantity(2)
    end)

    RegisterCommand("test_hint_clear", function()
        clear_interaction_hint()
    end)

    RegisterCommand("test_hint_destroy", function()
        destroy_interaction_hint()
    end)

end