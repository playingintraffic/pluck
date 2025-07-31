--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
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