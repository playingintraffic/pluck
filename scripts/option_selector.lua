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

    --- @section Functions

    --- Sets options in selector and shows it
    --- @param title string: Title for the selector
    --- @param options table: Array of option items
    local function set_options(title, options)
        local sanitized_options = {}
        for i, option in ipairs(options) do
            sanitized_options[i] = pluck.sanitize_ui(option, ("option_%d"):format(i))
        end

        SetNuiFocus(true, true)
        SendNUIMessage({
            func = "set_options",
            payload = {
                options = sanitized_options,
                title = title
            }
        })
    end

    exports("set_options", set_options)

    --- Shows options selector
    local function show_options()
        SendNUIMessage({ func = "show_options" })
    end

    exports("show_options", show_options)

    --- Hides options selector
    local function hide_options()
        SendNUIMessage({ func = "hide_options" })
    end

    exports("hide_options", hide_options)

    --- Destroys options selector
    local function destroy_options_selector()
        SendNUIMessage({ func = "destroy_options_selector" })
    end

    exports("destroy_options_selector", destroy_options_selector)

    --- @section Events

    --- Event to set options
    --- @param title string: Title for the selector
    --- @param options table: Array of option items
    RegisterNetEvent("pluck:cl:set_options", function(title, options)
        if not options then return print("options missing") end
        set_options(title, options)
    end)

    --- Event to show options selector
    RegisterNetEvent("pluck:cl:show_options", function()
        show_options()
    end)

    --- Event to hide options selector
    RegisterNetEvent("pluck:cl:hide_options", function()
        hide_options()
    end)

    --- Event to destroy options selector
    RegisterNetEvent("pluck:cl:destroy_options_selector", function()
        destroy_options_selector()
    end)

    --- @section Test Commands

    RegisterCommand("test_options", function()
        set_options("SELECT ITEM", {
            {
                id = "water",
                label = "Water",
                image = "/ui/assets/items/water.png",
                quantity = 5,
                enabled = true,
                on_action = function(data)
                    print("Selected: " .. data.dataset.option_id)
                end
            },
            {
                id = "bread",
                label = "Bread",
                image = "/ui/assets/items/bread.png",
                quantity = 3,
                enabled = true,
                on_action = function(data)
                    print("Selected: " .. data.dataset.option_id)
                end
            },
            {
                id = "weapon",
                label = "Weapon",
                image = "/ui/assets/items/weapon_pistol.png",
                quantity = 0,
                enabled = false
            }
        })
        show_options()
    end)

    RegisterCommand("test_options_hide", function()
        hide_options()
    end)

    RegisterCommand("test_options_destroy", function()
        destroy_options_selector()
    end)

end