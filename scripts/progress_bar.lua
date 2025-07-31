--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
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