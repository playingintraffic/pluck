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
import { Builder } from "/ui/core/js/builder.js";

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
import { Builder } from "/ui/core/js/builder.js";

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