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

    --- @section Function

    --- Shows a modal without accessing builder
    --- @param opts table: Modal options
    local function show_modal(opts)
        SetNuiFocus(true, true)
        SendNUIMessage({
            func = "show_modal",
            payload = opts
        })
    end

    exports("show_modal", show_modal)

    --- @section Events

    --- Event to show modal
    --- @param opts table: Modal options
    RegisterNetEvent("pluck:cl:show_modal", function(opts)
        if not opts then return print("opts missing") end

        show_modal(opts)
    end)

end