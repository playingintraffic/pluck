--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit).
    Support honest development retain this credit. Don't be that guy...

    MIT License

    Copyright (c) 2025 Playing In Traffic

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
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