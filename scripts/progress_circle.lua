--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
]]
    
if not pluck.is_server then 
    -- @section Local Functions

    --- Show progress circle with options
    --- @param options table: Contains message and duration for the progress circle.
    local function show_circle(options)
        SetNuiFocus(true, false)
        SendNUIMessage({
            func = "show_circle",
            payload = {
                message = options.message or "Loading...",
                duration = options.duration or 10,
                segments = options.segments or 30,
                gap = options.gap or 3
            }
        })
    end

    exports("show_circle", show_circle)

    --- @section NUI Callbacks

    RegisterNUICallback("circle_end", function()
        SetNuiFocus(false, false)
    end)

end