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