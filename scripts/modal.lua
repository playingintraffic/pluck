--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
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