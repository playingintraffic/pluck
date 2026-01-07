/*
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
*/

/*
// Slots class test
import { Builder } from "/ui/js/builder.js";

$(document).ready(() => {
    const builder = new Builder({
        header: {
            layout: { left: { justify: "flex-start" }, center: { justify: "center" }, right: { justify: "flex-end" } },
            elements: {
                left: [
                    {
                        type: "group",
                        items: [
                            { type: "logo", image: "pit_100.png" },
                            { type: "text", title: "PLUCK", subtitle: "Slots Class - Can be used for inventories :)" }
                        ]
                    }
                ],
                center: [{ type: "tabs" }],
                right: [
                    {
                        type: "group",
                        items: [
                            { type: "text", subtitle: "Server ID: 1" }
                        ]
                    }
                ]
            }
        },

        footer: {
            layout: { left: { justify: "flex-start" }, center: { justify: "center" }, right: { justify: "flex-end" } },
            elements: {
                right: [
                    {
                        type: "actions",
                        actions: [
                            { key: "ESCAPE", label: "Close" },
                            { key: "E", label: "Confirm" }
                        ]
                    }
                ]
            }
        },

        content: {
            pages: {
                inventory_page: {
                    index: 1,
                    title: "Inventory",
                    layout: { left: 4, center: 4, right: 4 },

                    // CENTER: Positioned loadout slots (paper doll)
                    center: {
                        type: "slots",
                        layout: { scroll_y: "none" },
                        groups: [
                            {
                                id: "clothing_toggles",
                                layout_type: "positioned",
                                collapsible: false,
                                slots: [
                                    { id: "hat", label: "Hat", position: { top: "0%", left: "0%" }, size: "80px" },
                                    { id: "mask", label: "Mask", position: { top: "0%", right: "0%" }, size: "80px" },
                                    { id: "glasses", label: "Glasses", position: { top: "17%", left: "0%" }, size: "80px" },
                                    { id: "ear", label: "Earrings", position: { top: "17%", right: "0%" }, size: "80px" },
                                    { id: "neck", label: "Necklace", position: { top: "34%", left: "0%" }, size: "80px" },
                                    { id: "shirt", label: "Shirt", position: { top: "34%", right: "0%" }, size: "80px" },
                                    { id: "gloves", label: "Gloves", position: { bottom: "34%", left: "0%" }, size: "80px" },
                                    { id: "bracelet", label: "Bracelet", position: { bottom: "34%", right: "0%" }, size: "80px" },
                                    { id: "watch", label: "Watch", position: { bottom: "17%", left: "0%" }, size: "80px" },
                                    { id: "pants", label: "Pants", position: { bottom: "17%", right: "0%" }, size: "80px" },
                                    { id: "bag", label: "Bag", position: { bottom: "0%", left: "0%" }, size: "80px" },
                                    { id: "top", label: "Top", position: { bottom: "0%", right: "0%" }, size: "80px" },
                                    { id: "hair", label: "Hair", position: { top: "0%", left: "21%" }, size: "80px" },
                                    { id: "reset", label: "Reset", position: { top: "0%", right: "21%" }, size: "80px" },
                                    { id: "visor", label: "Visor", position: { bottom: "0%", left: "21%" }, size: "80px" },
                                    { id: "shoes", label: "Shoes", position: { bottom: "0%", right: "21%" }, size: "80px" }
                                ],
                                items: {}
                            }
                        ]
                    },
                    
                    // LEFT: Player's equipped items (grouped)
                    left: {
                        type: "slots",
                        title: { text: "Equipment", span: `<i class="fa-solid fa-weight-hanging"></i> 45/120` },
                        groups: [
                            { 
                                id: "vest", 
                                title: "Tactical Vest", 
                                span: `<i class="fa-solid fa-shield"></i> 8/8`, 
                                slot_count: 12, 
                                columns: 6, 
                                slot_size: "80px", 
                                collapsible: true, 
                                collapsed: false,
                                items: {
                                    "1": { id: "ammo_pistol", image: "/ui/assets/items/ammo_pistol.png", quantity: 50, category: "ammunition", on_hover: { title: "9mm Ammunition", description: ["Standard 9mm rounds for pistols"], rarity: "common" } },
                                    "2": { id: "pistol_mag_extended", image: "/ui/assets/items/pistol_mag_extended.png", quantity: 2, category: "magazine", on_hover: { title: "Extended Pistol Magazine", description: ["High-capacity magazine for pistols"], rarity: "rare" } }
                                }
                            },
                            { 
                                id: "backpack", 
                                title: "Backpack", 
                                span: `<i class="fa-solid fa-bag-shopping"></i> 20/20`, 
                                slot_count: 24, 
                                columns: 6, 
                                slot_size: "80px", 
                                collapsible: true, 
                                collapsed: false,
                                items: {
                                    "1": { id: "cabbage", image: "/ui/assets/items/cabbage.png", quantity: 5, category: "food", on_hover: { title: "Cabbage", description: ["Fresh cabbage. Restores hunger."], rarity: "common" } },
                                    "2": { id: "corn", image: "/ui/assets/items/corn.png", quantity: 8, category: "food", on_hover: { title: "Corn", description: ["Sweet corn. Can be eaten or cooked."], rarity: "common" } }
                                }
                            },
                            { 
                                id: "belt", 
                                title: "Utility Belt", 
                                span: `<i class="fa-solid fa-circle"></i> 6/6`, 
                                slot_count: 6, 
                                columns: 6, 
                                slot_size: "80px", 
                                collapsible: true, 
                                collapsed: false,
                                items: {
                                    "1": { id: "weapon_pistol", image: "/ui/assets/items/weapon_pistol.png", quantity: 1, category: "weapon", progress: { value: 72 }, on_hover: { title: "9mm Pistol", description: ["Holstered sidearm"], rarity: "uncommon" } }
                                }
                            },
                            { 
                                id: "pockets", 
                                title: "Pockets", 
                                span: `<i class="fa-solid fa-hand"></i> 4/4`, 
                                slot_count: 6, 
                                columns: 6, 
                                slot_size: "80px", 
                                collapsible: true, 
                                collapsed: false, 
                                show_slot_numbers: true,
                                items: {
                                    "1": { id: "weed", image: "/ui/assets/items/weed.png", quantity: 3, category: "plant", on_hover: { title: "Cannabis", description: ["Medicinal plant material"], rarity: "uncommon" } }
                                }
                            }
                        ]
                    },
                    
                    // RIGHT: Vicinity/Ground inventory
                    right: {
                        type: "slots",
                        title: { text: "Vicinity", span: `<i class="fa-solid fa-location-dot"></i> Ground` },
                        layout: { columns: 6, slot_size: "80px" },
                        slot_count: 80,
                        items: {
                            "1": { id: "weapon_pistol", image: "/ui/assets/items/weapon_pistol.png", quantity: 1, category: "weapon", progress: { value: 55 }, on_hover: { title: "9mm Pistol", description: ["Found on ground"], rarity: "uncommon" } },
                            "2": { id: "ammo_pistol", image: "/ui/assets/items/ammo_pistol.png", quantity: 48, category: "ammunition", on_hover: { title: "9mm Ammunition", rarity: "common" } },
                            "3": { id: "cabbage", image: "/ui/assets/items/cabbage.png", quantity: 3, category: "food", on_hover: { title: "Cabbage", rarity: "common" } }
                        }
                    }
                }
            }
        }
    });
});
*/

/*
import { Builder } from "/ui/js/builder.js";

$(document).ready(() => {
    new Builder({
        header: {
            layout: { left: { justify: "flex-start" }, center: { justify: "center" }, right: { justify: "flex-end" } },
            elements: {
                left: [
                    {
                        type: "group",
                        items: [
                            { type: "logo", image: "pit_100.png" },
                            { type: "text", title: "PLUCK", subtitle: "Select Input Test" }
                        ]
                    }
                ],
                center: [{ type: "tabs" }],
                right: [
                    {
                        type: "buttons",
                        buttons: [
                            { id: "save", label: "Save", icon: "fa-solid fa-gear", action: "save_changes", class: "primary" },
                            { id: "exit", label: "Exit", action: "exit_builder", class: "secondary" }
                        ]
                    }
                ]
            }
        },

        footer: {
            layout: { left: { justify: "flex-start" }, center: { justify: "center" }, right: { justify: "flex-end" } },
            elements: {
                center: [{ type: "text", text: "Ready to test selects." }]
            }
        },

        content: {
            pages: {
                select_test_page: {
                    index: 1,
                    title: "Select Inputs Test",
                    layout: { left: 3 },
                    left: {
                        type: "input_groups",
                        title: "Select Inputs",
                        id: "select_test_inputs",
                        layout: { columns: 1, scroll_x: "none" },
                        groups: [
                            {
                                header: "Select Group 1",
                                expandable: false,
                                inputs: [
                                    {
                                        id: "select_1",
                                        type: "select",
                                        label: "Choose Option 1",
                                        value: "b",
                                        copyable: true,
                                        options: [
                                            { value: "a", label: "Option A" },
                                            { value: "b", label: "Option B" },
                                            { value: "c", label: "Option C" }
                                        ]
                                    }
                                ]
                            },
                            {
                                header: "Select Group 2",
                                expandable: true,
                                inputs: [
                                    {
                                        id: "select_3",
                                        type: "select",
                                        label: "Another Select",
                                        value: "x",
                                        options: [
                                            { value: "x", label: "X" },
                                            { value: "y", label: "Y" },
                                            { value: "z", label: "Z" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        }
    });
});
*/

/*
import { Builder } from "/ui/js/builder.js";

$(document).ready(() => {
    new Builder({
        header: {
            layout: {
                left: { justify: "flex-start" },
                center: { justify: "center" },
                right: { justify: "flex-end" }
            },
            elements: {
                left: [
                    {
                        type: "group",
                        items: [
                            { type: "logo", image: "pit_100.png" },
                            { type: "text", title: "PLUCK", subtitle: "Predefined Lua UI Component Kit" }
                        ]
                    }
                ],
                center: [
                    {
                        type: "tabs"
                    }
                ],
                right: [
                    {
                        type: "namecard",
                        avatar: "avatar_placeholder.jpg",
                        background: "namecard_bg_1.jpg",
                        name: "Player Name",
                        title: "Some Player Title",
                        level: 99,
                        tier: "bronze",
                    },
                    {
                        type: "buttons",
                        buttons: [
                            { id: "save", label: "Save", icon: "fa-solid fa-gear", action: "save_changes", class: "primary" },
                            { id: "exit", label: "Exit", action: "exit_builder", class: "secondary" }
                        ]
                    }
                ]
            }
        },

        footer: {
            layout: {
                left: { justify: "flex-start", gap: "1vw" },
                center: { justify: "center" },
                right: { justify: "flex-end", gap: "1vw" }
            },
            elements: {
                left: [
                    {
                        type: "buttons",
                        buttons: [
                            { id: "deploy", label: "Deploy", action: "deploy", class: "primary" },
                            { id: "cancel", label: "Cancel", action: "cancel", class: "secondary" }
                        ]
                    }
                ],
                center: [
                    {
                        type: "text",
                        text: "Ready to deploy."
                    }
                ],
                right: [
                    {
                        type: "actions",
                        actions: [
                            { key: "ESCAPE", label: "Close" },
                            { key: "E", label: "Confirm" }
                        ]
                    }
                ]
            }
        },

        content: {
            pages: {
                slot_inventory_test: {
                    index: 1,
                    title: "Slot Inventory",
                    layout: { left: 6, center: 6, right: 6 },
                    left: {
                        type: "slot_inventory",
                        id: "slot_inventory_left",
                        title: "Player Inventory",
                        layout: {
                            columns: 5,
                            scroll_y: "scroll_y_auto",
                            slot_size: 64
                        },
                        slots: [
                            { id: "bread", icon: "bread.png", count: 3 },
                            { id: "water", icon: "water.png", count: 2 },
                            null,
                            { id: "radio", icon: "radio.png", count: 1 },
                            null
                        ]
                    },
                    right: {
                        type: "slot_inventory",
                        id: "slot_inventory_right",
                        title: "Stash",
                        layout: {
                            columns: 5,
                            scroll_y: "scroll_y_auto",
                            slot_size: 64
                        },
                        slots: [
                            { id: "ammo_9mm", icon: "ammo.png", count: 30 },
                            null,
                            { id: "apple", icon: "apple.png", count: 5 },
                            null,
                            null
                        ]
                    }
                }
            }
        }
        
    });
});

$(document).ready(() => {
    new Builder({
        header: {
            layout: {
                left: { justify: "flex-start" },
                center: { justify: "center" },
                right: { justify: "flex-end" }
            },
            elements: {
                left: [
                    {
                        type: "group",
                        items: [
                            { type: "logo", image: "pit_100.png" },
                            { type: "text", title: "PLUCK", subtitle: "Predefined Lua UI Component Kit" }
                        ]
                    }
                ],
                center: [
                    {
                        type: "tabs"
                    }
                ],
                right: [
                    {
                        type: "namecard",
                        avatar: "avatar_placeholder.jpg",
                        background: "namecard_bg_1.jpg",
                        name: "Player Name",
                        title: "Some Player Title",
                        level: 99,
                        tier: "bronze",
                    },
                    {
                        type: "buttons",
                        buttons: [
                            { id: "save", label: "Save", icon: "fa-solid fa-gear", action: "save_changes", class: "primary" },
                            { id: "exit", label: "Exit", action: "exit_builder", class: "secondary" }
                        ]
                    }
                ]
            }
        },

        footer: {
            layout: {
                left: { justify: "flex-start", gap: "1vw" },
                center: { justify: "center" },
                right: { justify: "flex-end", gap: "1vw" }
            },
            elements: {
                left: [
                    {
                        type: "buttons",
                        buttons: [
                            { id: "deploy", label: "Deploy", action: "deploy", class: "primary" },
                            { id: "cancel", label: "Cancel", action: "cancel", class: "secondary" }
                        ]
                    }
                ],
                center: [
                    {
                        type: "text",
                        text: "Ready to deploy."
                    }
                ],
                right: [
                    {
                        type: "actions",
                        actions: [
                            { key: "ESCAPE", label: "Close" },
                            { key: "E", label: "Confirm" }
                        ]
                    }
                ]
            }
        },

        content: {
            pages: {
               input_groups_test: {
                    index: 2,
                    title: "Page 1",
                    layout: { center: 3 },
                    center: {
                        type: "input_groups",
                        title: "Page 1 Content",
                        id: "test_inputs",
                        layout: { columns: 1, scroll_x: "none" },
                        groups: [
                            {
                                header: "Some Group",
                                expandable: false,
                                inputs: [
                                    { id: "option_1", type: "number", label: "Some Option", category: "group_1" },
                                    { id: "option_2", type: "text", label: "Some Other Option", placeholder: "Enter value..." }
                                ]
                            },
                            {
                                header: "Another Group",
                                expandable: true,
                                inputs: [
                                    { id: "option_3", type: "number", label: "Yet Another Option", category: "group_2" },
                                    { id: "option_4", type: "text", label: "And Another One", default: "Default Value" }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                id: "some_button",
                                label: "Button 1",
                                action: "confirm_options",
                                class: "primary",
                                dataset: {
                                    target_id: "test_button",
                                    source: "input_groups_test"
                                }
                            }
                        ]
                    }
                },
                cards_test: {
                    index: 1,
                    title: "Page 2",
                    layout: { left: 3, center: 6, right: 3, },
                    left: {
                        type: "cards",
                        layout: { columns: 2, flex: "column", scroll_x: "none" },
                        title: { text: "Left Section", span: "Span" },
                        cards: [
                            {
                                image: "https://placehold.co/252x126",
                                title: "Card In Column",
                                description: "Card Description.",
                                layout: "column",
                                on_hover: {
                                    title: "Card Info",
                                    description: ["Info descriptions can support arrays", "- like so", "- you get the idea"],
                                    values: [
                                        { key: "Key", value: "Value Pairs" },
                                        { key: "Name", value: "John Doe" }
                                    ],
                                    actions: [
                                        { id: "test_action", key: "E", label: "Action on Keypress" }
                                    ],
                                    rarity: "common"
                                },
                               buttons: [
                                    {
                                        id: "some_button",
                                        label: "Some Btn",
                                        class: "primary",
                                        action: "some_action",
                                        dataset: {
                                            target_id: "some_target",
                                            source: "some_source"
                                        },
                                        modal: {
                                            title: "Some Modal Title",
                                            options: [
                                                { id: "some_option", label: "Some Option", type: "text" }
                                            ],
                                            buttons: [
                                                {
                                                    id: "some_modal_button_1",
                                                    label: "Modal Btn 1",
                                                    action: "some_modal_action_1",
                                                    class: "primary",
                                                    dataset: {
                                                        source: "some_source",
                                                        section: "some_section",
                                                        item: "some_item"
                                                    }
                                                },
                                                {
                                                    id: "some_modal_button_2",
                                                    label: "Modal Btn 1",
                                                    action: "some_modal_action_2",
                                                    class: "secondary",
                                                    dataset: {
                                                        source: "some_source",
                                                        section: "some_section",
                                                        item: "some_item"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]


                            },
                            {
                                image: "https://placehold.co/252x126",
                                title: "Card In Column",
                                description: "Card Description.",
                                layout: "column",
                                on_hover: {
                                    title: "Card Info",
                                    description: ["Info descriptions can support arrays", "- like so", "- you get the idea"],
                                    values: [
                                        { key: "Key", value: "Value Pairs" },
                                        { key: "Name", value: "Case" }
                                    ],
                                    actions: [
                                        { id: "test_action", key: "E", label: "Action on Keypress" }
                                    ],
                                    rarity: "common"
                                },
                                buttons: [
                                    {
                                        id: "some_button",
                                        label: "Some Btn",
                                        class: "primary",
                                        action: "some_action",
                                        dataset: {
                                            target_id: "some_target",
                                            source: "some_source"
                                        },
                                        modal: {
                                            title: "Some Modal Title",
                                            options: [
                                                { id: "some_option", label: "Some Option", type: "text" }
                                            ],
                                            buttons: [
                                                {
                                                    id: "some_modal_button_1",
                                                    label: "Some Label",
                                                    action: "some_modal_action_1",
                                                    dataset: {
                                                        source: "some_source",
                                                        section: "some_section",
                                                        item: "some_item"
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    center: {
                        type: "input_groups",
                        title: "Center Section",
                        id: "test_inputs",
                        layout: { columns: 2, scroll_x: "none" },
                        groups: [
                            {
                                header: "A Expandable Group",
                                expandable: true,
                                inputs: [
                                    { id: "option_3", type: "number", label: "Yet Another Option", category: "group_2" },
                                    { id: "option_4", type: "text", label: "And Another One", default: "Default Value" }
                                ]
                            },
                            {
                                header: "Some Group",
                                expandable: false,
                                inputs: [
                                    { id: "option_1", type: "number", label: "Some Option", category: "group_1" },
                                    { id: "option_2", type: "text", label: "Some Other Option", placeholder: "Enter value..." }
                                ]
                            }
                        ],
                        buttons: [
                            { id: "group_btn", label: "Button 1", action: "btn_action_1", class: "primary" },
                            { id: "group_btn2", label: "Button 2", action: "btn_action_2", class: "secondary" }
                        ]
                    },
                    right: {
                        type: "cards",
                        layout: { columns: 1, flex: "row", scroll_x: "scroll", scroll_y: "scroll" },
                        title: "Right Section",
                        cards: [
                            {
                                image: "../../assets/logos/pit_100.png",
                                title: "Card In Row",
                                description: "Card Description.",
                                on_hover: {
                                    title: "Card Info",
                                    description: ["Info descriptions can support arrays", "- like so", "- you get the idea"],
                                    values: [
                                        { key: "Key", value: "Value Pairs" },
                                        { key: "Name", value: "Case" }
                                    ],
                                    actions: [
                                        { id: "test_action", key: "E", label: "Action on Keypress" }
                                    ],
                                    rarity: "rare"
                                }
                            }
                        ]
                    }
                }
            }
        },
     
        sidebar: {
            layout: { side: "left" },
            sections: [
                {
                    id: "test_1",
                    label: "Sidebar Category",
                    items: [
                        {
                            id: "some_option",
                            label: "Some Option",
                            image: "assets/logos/pit_100.png",
                            action: "some_action"
                        },
                        {
                            id: "some_other_option",
                            label: "Some Other Option",
                            icon: "fas fa-box",
                            action: "some_other_action",
                            submenu: [
                                { id: "some_submenu_option_1", label: "Some Submenu Option", action: "submenu_action_1" },
                                { id: "some_submenu_option_2", label: "Some Other Submenu Option", action: "submenu_action_2" }
                            ]
                        }
                    ]
                },
                {
                    id: "test_2",
                    label: "Sidebar Category 2",
                    items: [
                        {
                            id: "another_option",
                            label: "Another Option",
                            action: "another_action",
                            submenu: [
                                { id: "deep_submenu_1", label: "Some Option", action: "deep_sub_action_1" },
                                { id: "deep_submenu_2", label: "Some Other Option", action: "deep_sub_action_2" }
                            ]
                        }
                    ]
                }
            ],
            on_action: (id, action) => {
                console.log("Sidebar click:", id, action);
            }
        }
        
    });
});
*/