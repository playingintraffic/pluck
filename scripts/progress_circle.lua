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