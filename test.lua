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

--- Full test UI
--- Shows all options but a couple are old.. 
--- Will update this with a full new working example asap.
local ui_test = {
    header = {
        layout = {
            left = { justify = "flex-start" },
            center = { justify = "center" },
            right = { justify = "flex-end" },
        },
        elements = {
            left = {
                {
                    type = "group",
                    items = {
                        { type = "logo", image = "pit_100.png" },
                        { type = "text", title = "BOII", subtitle = "UI Builder" }
                    }
                }
            },
            center = {
                { type = "tabs" }
            },
            right = {
                {
                    type = "namecard",
                    avatar = "avatar_placeholder.jpg",
                    background = "namecard_bg_2.jpg",
                    name = "Player Name",
                    title = "Some Player Title",
                    level = 99,
                    tier = "bronze"
                }
            }
        }
    },

    footer = {
        layout = {
            left = { justify = "flex-start", gap = "1vw" },
            center = { justify = "center" },
            right = { justify = "flex-end", gap = "1vw" },
        },
        elements = {
            left = {
                {
                    type = "buttons",
                    buttons = {
                         { 
                            id = "some_button_id", 
                            label = "Close UI", 
                            on_action = function(data)
                                print("Clicked a button with data:", json.encode(data or {}))
                            end,
                            should_close = true, 
                            class = "primary" 
                        },
                         { 
                            id = "some_button_id", 
                            label = "Button Label", 
                            on_action = function(data)
                                print("Clicked a button with data:", json.encode(data or {}))
                            end,
                            should_close = true, 
                            class = "secondary" 
                        }
                    }
                }
            },
            center = {
                {
                    type = "text",
                    text = "Ready to deploy."
                }
            },
            right = {
                {
                    type = "actions",
                    actions = {
                        { 
                            key = "ESC", 
                            label = "Close",
                            on_action = function(data)
                                print("Pressed a key with data:", json.encode(data or {}))
                            end
                        },
                        { 
                            key = "E", 
                            label = "Confirm",
                            on_action = function(data)
                                print("Pressed a key with data:", json.encode(data or {}))
                            end
                        }
                    }
                }
            }
        }
    },

    content = {
        pages = {
            input_groups_test = {
                index = 1,
                title = "Input Groups Test",
                layout = { center = 3 },
                center = {
                    type = "input_groups",
                    title = "Input Groups Test",
                    id = "test_inputs",
                    layout = { columns = 1, scroll_x = "none" },
                    groups = {
                        {
                            header = "Some Group",
                            expandable = false,
                            inputs = {
                                { 
                                    id = "option_1", 
                                    type = "number", 
                                    label = "Some Option", 
                                    category = "group_1",
                                    on_increment = function(data) print("clicked to increment") end,
                                    on_decrement = function(data) print("clicked to decrement") end 
                                }
                            }
                        }
                    },
                    buttons = {
                        {
                            id = "confirm_options",
                            label = "Confirm",
                            action = "confirm_options",
                            class = "primary",
                            dataset = {
                                target_id = "test_inputs",
                                source = "input_groups_test"
                            }
                        },
                        {
                            id = "reset_options",
                            label = "Reset",
                            action = "reset_options",
                            class = "secondary",
                            dataset = {
                                target_id = "test_inputs",
                                source = "input_groups_test"
                            }
                        }
                    }
                }
            },
            cards_test = {
                index = 2,
                title = "Cards Test",
                layout = { left = 3, center = 6, right = 3 },
                left = {
                    type = "cards",
                    layout = { columns = 2, flex = "column", scroll_x = "none" },
                    title = "Left Section",
                    cards = {
                        {
                            image = "https://placehold.co/252x126",
                            title = "Card In Column",
                            description = "Card Description.",
                            layout = "column",
                            on_hover = {
                                title = "Card Info",
                                description = { 
                                    "Info descriptions can support arrays", 
                                    "- like so", 
                                    "- you get the idea" },
                                values = {
                                    { key = "Key", value = "Value Pairs" },
                                    { key = "Name", value = "Case" }
                                },
                                actions = {
                                    { 
                                        id = "test_action", 
                                        key = "E", 
                                        label = "Action on Keypress",
                                        modal = {
                                            title = "Inspect Item",
                                            options = {
                                                {
                                                    id = "notes",
                                                    label = "Notes",
                                                    type = "textarea",
                                                    placeholder = "Add inspection notes..."
                                                }
                                            },
                                            buttons = {
                                                {
                                                    label = "Close",
                                                    should_close = true
                                                }
                                            }
                                        }  
                                    }
                                },
                                rarity = "common"
                            },
                            buttons = {
                                {
                                    id = "btn_edit",
                                    label = "Edit",
                                    class = "primary",
                                    action = "edit_card",
                                    dataset = {
                                        target_id = "example_card",
                                        source = "cards_test"
                                    },
                                    modal = {
                                        title = "Edit Item",
                                        options = {
                                            { id = "name", label = "Name", type = "text" }
                                        },
                                        buttons = {
                                            {
                                                id = "save",
                                                label = "Save",
                                                action = "save",
                                                dataset = {
                                                    source = "cards",
                                                    section = "test_1",
                                                    item = "some_option"
                                                },
                                            },
                                            {
                                                id = "cancel",
                                                label = "Cancel",
                                                action = "cancel",
                                                dataset = {
                                                    source = "cards",
                                                    section = "test_1",
                                                    item = "some_option"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            image = "https://placehold.co/252x126",
                            title = "Card In Column",
                            description = "Card Description.",
                            layout = "column",
                            on_hover = {
                                title = "Card Info",
                                description = { "Info descriptions can support arrays", "- like so", "- you get the idea" },
                                values = {
                                    { key = "Key", value = "Value Pairs" },
                                    { key = "Name", value = "Case" }
                                },
                                actions = {
                                    { id = "test_action", key = "E", label = "Action on Keypress" }
                                },
                                rarity = "common"
                            },
                            buttons = {
                                {
                                    id = "btn_edit",
                                    label = "Edit",
                                    class = "primary",
                                    action = "edit_card",
                                    dataset = {
                                        target_id = "example_card",
                                        source = "cards_test"
                                    },
                                    modal = {
                                        title = "Edit Item",
                                        options = {
                                            { id = "name", label = "Name", type = "text" }
                                        },
                                        buttons = {
                                            { id = "save", label = "Save", action = "save" },
                                            { id = "cancel", label = "Cancel", action = "cancel" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                center = {
                    type = "input_groups",
                    title = "Center Section",
                    id = "test_inputs",
                    layout = { columns = 2, scroll_x = "none" },
                    groups = {
                        {
                            header = "Some Group",
                            expandable = false,
                            inputs = {
                                { id = "option_1", type = "number", label = "Some Option", category = "group_1" },
                                { id = "option_2", type = "text", label = "Some Other Option", placeholder = "Enter value..." }
                            }
                        },
                        {
                            header = "A Expandable Group",
                            expandable = true,
                            inputs = {
                                { id = "option_3", type = "number", label = "Yet Another Option", category = "group_2" },
                                { id = "option_4", type = "text", label = "And Another One", default = "Default Value" }
                            }
                        }
                    },
                    buttons = {
                        { id = "confirm_options", label = "Confirm", action = "close_builder", class = "primary" },
                        { 
                            id = "some_button_id", 
                            label = "Button Label", 
                            on_action = function(data)
                                print("Clicked a button with data:", json.encode(data or {}))
                            end,
                            should_close = true, 
                            class = "primary" 
                        }
                    }
                },
                right = {
                    type = "cards",
                    layout = { columns = 1, flex = "row", scroll_x = "scroll", scroll_y = "scroll" },
                    title = "Right Section",
                    cards = {
                        {
                            image = "https://placehold.co/64x64",
                            title = "Card In Row",
                            description = "Card Description.",
                            on_hover = {
                                title = "Card Info",
                                description = { "Info descriptions can support arrays", "- like so", "- you get the idea" },
                                values = {
                                    { key = "Key", value = "Value Pairs" },
                                    { key = "Name", value = "Case" }
                                },
                                actions = {
                                    { id = "test_action", key = "E", label = "Action on Keypress" }
                                },
                                rarity = "common"
                            }
                        },
                        {
                            image = "https://placehold.co/64x64",
                            title = "Card In Row",
                            description = "Card Description.",
                            on_hover = {
                                title = "Card Info",
                                description = { "Info descriptions can support arrays", "- like so", "- you get the idea" },
                                values = {
                                    { key = "Key", value = "Value Pairs" },
                                    { key = "Name", value = "Case" }
                                },
                                actions = {
                                    { id = "test_action", key = "E", label = "Action on Keypress" }
                                },
                                rarity = "common"
                            }
                        },
                        {
                            image = "https://placehold.co/64x64",
                            title = "Card Title",
                            description = "Card Description.",
                            on_hover = {
                                title = "Card Info",
                                description = { "Info descriptions can support arrays", "- like so", "- you get the idea" },
                                values = {
                                    { key = "Key", value = "Value Pairs" },
                                    { key = "Name", value = "Case" }
                                },
                                actions = {
                                    { id = "test_action", key = "E", label = "Action on Keypress" }
                                },
                                rarity = "common"
                            }
                        }
                    }
                }
            }
        }
    },

    sidebar = {
        layout = { side = "right" },
        sections = {
            {
                id = "test_1",
                label = "Sidebar Category",
                items = {
                    {
                        id = "some_option",
                        label = "Some Option",
                        image = "assets/logos/pit_100.png",
                        action = "some_action"
                    },
                    {
                        id = "some_other_option",
                        label = "Some Other Option",
                        icon = "fas fa-box",
                        action = "some_other_action",
                        submenu = {
                            { id = "some_submenu_option_1", label = "Some Submenu Option", action = "submenu_action_1" },
                            { id = "some_submenu_option_2", label = "Some Other Submenu Option", action = "submenu_action_2" }
                        }
                    }
                }
            },
            {
                id = "test_2",
                label = "Sidebar Category 2",
                items = {
                    {
                        id = "another_option",
                        label = "Another Option",
                        action = "another_action",
                        submenu = {
                            { id = "deep_submenu_1", label = "Some Option", action = "deep_sub_action_1" },
                            { id = "deep_submenu_2", label = "Some Other Option", action = "deep_sub_action_2" }
                        }
                    }
                }
            }
        }
    }
}

--- Test command to build ui
RegisterCommand("test_pluck", function()
    exports.pluck:build(ui_test)
end)

--- Test command to display a notification
RegisterCommand("test_pluck_notify", function()
    exports.pluck:notify({
        type = "success",
        header = "colour matched",
        message = "Notification with colour matched shadow only.",
        icon = "fa-solid fa-check-circle",
        duration = 300000,
        match_border = false,
        match_shadow = true
    })
end)

RegisterCommand("test_dui", function()
    exports.pluck:add_dui_zone({
        id = "some_test_dui",
        coords = vector4(-313.25, -968.42, 31.08, 143.41),
        header = "Some Test DUI",
        image = "/ui/assets/logos/pit_100.png",
        can_access = function()
            return not IsPedInAnyVehicle(PlayerPedId())
        end,
        keys = {
            { 
                key = 'E',
                label = 'Change Clothing',
                action_type = 'client',
                on_action = function(ui_data)
                    return true
                end
            }
        }
    })
end)

RegisterCommand("test_dui2", function()
    local id = "some_test_dui" -- your zone id
    local progress = 0

    -- add initial zone
    exports.pluck:add_dui_zone({
        id = id,
        coords = vector4(-313.25, -968.42, 31.08, 143.41),
        header = "Some Test DUI",
        image = "/ui/assets/logos/pit_100.png",
        keys = {
            { 
                key = 'E',
                label = 'Do Something',
                action_type = 'client',
                action = 'keystone:cl:open_clothing_store'
            }
        },
        additional = {
            progressbars = {
                some_prog_bar = { label = "Gimmie Progress?", value = progress }
            }
        }
    })

    --- thread to update bar
    CreateThread(function()
        while true do
            Wait(1000)

            progress = progress + 5
            if progress > 100 then progress = 0 end

            --- event to update dui; event so can be done from server
            TriggerEvent("pluck:cl:sync_dui_data", id, {
                additional = {
                    progressbars = {
                        some_prog_bar = { label = "Power", value = progress }
                    }
                }
            })
        end
    end)
end)
