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