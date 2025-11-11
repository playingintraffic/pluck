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

if pluck.is_server then

    --- Sends a notification to a specific player client.
    --- @param source number: The player source ID to send the notification to.
    --- @param opts table: The notification configuration.
    exports("notify", function(source, opts)
        if not source or not opts then pluck.log("error", "notify: Invalid params provided.") return end

        pluck.log("info", ("notify: Sending to [%s] with %s"):format(source, json.encode(opts)))
        TriggerClientEvent("pluck:notify", source, opts)
    end)

else

    --- @section Functions

    --- Sends a notification to the NUI layer.
    --- @param opts table: Notification options (type, message, header, icon, duration, etc.)
    local function notify(opts)
        if not opts then pluck.log("error", "notify: Options missing.") return end

        pluck.log("success", ("notify: Dispatching %s"):format(json.encode(opts)))
        SendNUIMessage({
            func = "notify",
            payload = opts
        })
    end

    --- Exported client-side function to send a notification.
    --- @param opts table: Notification configuration table.
    exports("notify", notify)

    --- @section Events

    --- Receives and displays a notification triggered by the server.
    --- @param opts table: Notification options.
    RegisterNetEvent("pluck:notify", function(opts)
        pluck.log("dev", ("Event triggered: notify %s"):format(json.encode(opts)))
        notify(opts)
    end)
    
end