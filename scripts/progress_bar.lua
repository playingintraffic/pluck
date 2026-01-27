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
    --- @section Local Functions

    --- Show progress bar with options
    --- @param options table: Contains header, icon, and duration of the progress bar.
    function show_progressbar(options)
        SetNuiFocus(false, false)
        SendNUIMessage({
            func = 'show_progressbar',
            payload = {
                header = options.header or 'Loading...',
                icon = options.icon or 'fa-solid fa-circle-notch',
                duration = options.duration or 5000
            }
        })
    end

    exports('show_progressbar', progressbar)

    RegisterCommand("test_progbar", function()
        show_progressbar({
            header = "Testing Something...",
            icon = "fa-solid fa-gear",
            duration = 10000
        })
    end)

end