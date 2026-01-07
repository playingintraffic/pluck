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

    --- Builds an action menu on the specified client.
    --- @param source number: The player source ID to send the menu to.
    --- @param menu table: The menu configuration table.
    exports("action_menu", function(source, menu)
        if not source or not menu then pluck.log("error", "action_menu: Invalid params provided.") return end

        pluck.log("info", ("action_menu: Sending menu to [%s]"):format(source))
        TriggerClientEvent("pluck:action_menu", source, menu)
    end)

else

    --- @section Functions

    --- Sends an action menu to the NUI layer and sets focus.
    --- @param menu table: Menu config table to build.
    local function action_menu(menu)
        if not menu then pluck.log("error", "action_menu: Menu config missing.") return end

        local safe_menu = pluck.build_ui(menu)
        if not safe_menu then pluck.log("error", "action_menu: Menu config wasn't returned after sanitize.") return end

        pluck.log("info", "action_menu: Building action menu and setting NUI focus.")
        SetNuiFocus(true, true)
        SendNUIMessage({
            func = 'create_action_menu',
            payload = safe_menu
        })
    end

    --- Exported client-side function to build an action menu.
    --- @param menu table: Full menu configuration.
    exports("action_menu", action_menu)

    --- @section Events

    --- Receives and builds an action menu triggered by the server.
    --- @param menu table: Menu configuration.
    RegisterNetEvent("pluck:action_menu", function(menu)
        pluck.log("dev", "Event triggered: action_menu")
        action_menu(menu)
    end)

    --- Event to close action menu.
    RegisterNetEvent("pluck:action_menu:close", function()
        SendNUIMessage({ func = 'close_action_menu' })
    end)

    --- @section NUI Callbacks

    --- Removes focus from the NUI when action menu closes.
    RegisterNUICallback("action_menu:close", function()
        pluck.log("debug", "action_menu:close - Focus cleared.")
        SetNuiFocus(false, false)
    end)

end

--- @section Testing

RegisterCommand('testmenu', function()
    local test_menu = {
        {
            label = 'Main Menu',
            icon = 'fa-solid fa-bars',
            colour = '#e4ad29',
            submenu = {
                {
                    label = 'Submenu 1',
                    icon = 'fa-solid fa-arrow-right',
                    colour = '#e4ad29',
                    submenu = {
                        {
                            label = 'Do Something',
                            icon = 'fa-solid fa-cog',
                            colour = '#e4ad29',
                            on_action = function(data)
                                print('Submenu action triggered!', json.encode(data or {}))
                            end
                        },
                        {
                            label = 'Function Action',
                            icon = 'fa-solid fa-bolt',
                            colour = '#4bc0c8',
                            on_action = function(data)
                                print('Direct function called!', json.encode(data or {}))
                            end
                        }
                    }
                },
                {
                    label = 'Another Action',
                    icon = 'fa-solid fa-cloud',
                    colour = '#4bc0c8',
                    on_action = function(data)
                        print('Another action!', json.encode(data or {}))
                    end
                }
            }
        },
        {
            label = 'Quick Action',
            icon = 'fa-solid fa-bolt',
            colour = '#ffcc00',
            on_action = function(data)
                print('Quick action triggered!', json.encode(data or {}))
            end
        }
    }

    exports.pluck:action_menu(test_menu)
end)