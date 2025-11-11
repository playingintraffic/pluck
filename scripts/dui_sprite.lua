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

--- @script dui_sprite
--- Handles DUI interactions.
--- Uses DrawInteractiveSprite to display the ui in the game world.

if not pluck.is_server then

    --- @section DUI Sprites

    --- Key list copied from BDTK to keep PLUCK standalone <3
    local key_list <const> = {
        ["enter"] = 191,
        ["escape"] = 322,
        ["backspace"] = 177,
        ["tab"] = 37,
        ["arrowleft"] = 174,
        ["arrowright"] = 175,
        ["arrowup"] = 172,
        ["arrowdown"] = 173,
        ["space"] = 22,
        ["delete"] = 178,
        ["insert"] = 121,
        ["home"] = 213,
        ["end"] = 214,
        ["pageup"] = 10,
        ["pagedown"] = 11,
        ["leftcontrol"] = 36,
        ["leftshift"] = 21,
        ["leftalt"] = 19,
        ["rightcontrol"] = 70,
        ["rightshift"] = 70,
        ["rightalt"] = 70,
        ["numpad0"] = 108,
        ["numpad1"] = 117,
        ["numpad2"] = 118,
        ["numpad3"] = 60,
        ["numpad4"] = 107,
        ["numpad5"] = 110,
        ["numpad6"] = 109,
        ["numpad7"] = 117,
        ["numpad8"] = 111,
        ["numpad9"] = 112,
        ["numpad+"] = 96,
        ["numpad-"] = 97,
        ["numpadenter"] = 191,
        ["numpad."] = 108,
        ["f1"] = 288,
        ["f2"] = 289,
        ["f3"] = 170,
        ["f4"] = 168,
        ["f5"] = 166,
        ["f6"] = 167,
        ["f7"] = 168,
        ["f8"] = 169,
        ["f9"] = 56,
        ["f10"] = 57,
        ["a"] = 34,
        ["b"] = 29,
        ["c"] = 26,
        ["d"] = 30,
        ["e"] = 46,
        ["f"] = 49,
        ["g"] = 47,
        ["h"] = 74,
        ["i"] = 27,
        ["j"] = 36,
        ["k"] = 311,
        ["l"] = 182,
        ["m"] = 244,
        ["n"] = 249,
        ["o"] = 39,
        ["p"] = 199,
        ["q"] = 44,
        ["r"] = 45,
        ["s"] = 33,
        ["t"] = 245,
        ["u"] = 303,
        ["v"] = 0,
        ["w"] = 32,
        ["x"] = 73,
        ["y"] = 246,
        ["z"] = 20,
        ["mouse1"] = 24,
        ["mouse2"] = 25
    }

    --- @section Constants

    local dui_range <const> = 1.5
    local dui_range_squared <const> = dui_range * dui_range

    --- @section Native Localization

    local GetActiveScreenResolution = GetActiveScreenResolution
    local CreateDui = CreateDui
    local CreateRuntimeTxd = CreateRuntimeTxd
    local CreateRuntimeTextureFromDuiHandle = CreateRuntimeTextureFromDuiHandle
    local GetDuiHandle = GetDuiHandle
    local IsControlJustReleased = IsControlJustReleased
    local TriggerEvent = TriggerEvent
    local TriggerServerEvent = TriggerServerEvent
    local SetDrawOrigin = SetDrawOrigin
    local HasStreamedTextureDictLoaded = HasStreamedTextureDictLoaded
    local GetClosestObjectOfType = GetClosestObjectOfType
    local GetHashKey = GetHashKey
    local DrawInteractiveSprite = DrawInteractiveSprite
    local SendDuiMessage = SendDuiMessage
    local DoesEntityExist = DoesEntityExist
    local SetEntityDrawOutline = SetEntityDrawOutline
    local SetEntityDrawOutlineColor = SetEntityDrawOutlineColor
    local SetEntityDrawOutlineShader = SetEntityDrawOutlineShader
    local Wait = Wait
    local GetEntityCoords = GetEntityCoords
    local ClearDrawOrigin = ClearDrawOrigin

    --- @section Tables
    
    local dui_locations = {}

    --- @section Functions

    --- Creates a DUI object for a specified location.
    --- @param location_id string: The unique ID of the location.
    --- @return table: A table containing the DUI object and texture data.
    local function create_dui(location_id)
        local txd_name, txt_name = location_id, location_id
        local dui_url = "https://cfx-nui-pluck/ui/index.html"
        local screen_width, screen_height = GetActiveScreenResolution()
        local dui_object = CreateDui(dui_url, screen_width, screen_height)
        local txd = CreateRuntimeTxd(txd_name)
        CreateRuntimeTextureFromDuiHandle(txd, txt_name, GetDuiHandle(dui_object))

        return {
            dui_object = dui_object,
            txd_name = txd_name,
            txt_name = txt_name,
            initialized_at = GetGameTimer() + 250
        }
    end


    --- Adds a new zone to the DUI system.
    --- @param options table: A table containing zone options.
    local function add_dui_zone(options)
        if not options.id or not options.coords or not options.header then return end
        local valid_keys = {}
        for _, key_data in ipairs(options.keys or {}) do
            local key_control = key_list[string.lower(key_data.key)]
            if key_control then
                key_data.key_control = key_control
                valid_keys[#valid_keys + 1] = key_data
            end
        end
        local entity = nil
        if options.entity and options.model then
            entity = GetClosestObjectOfType(options.coords.x, options.coords.y, options.coords.z, 1.0, GetHashKey(options.model), false, false, false)
        end
        dui_locations[options.id] = {
            _last_state = {},
            image = options.image or nil,
            id = options.id,
            model = options.model,
            entity = entity or nil,
            coords = vector3(options.coords.x + 0.025, options.coords.y + 0.025, options.coords.z),
            header = options.header,
            icon = options.icon or "",
            keys = valid_keys,
            outline = options.outline,
            can_access = options.can_access,
            _last_access_check = 0,
            _last_access_result = true,
            dui_object = create_dui(options.id),
            in_proximity = false,
            is_destroyed = false,
            is_hidden = false,
            additional = options.additional or {}
        }
    end

    exports("add_dui_zone", add_dui_zone)

    --- Removes a DUI zone by its ID.
    --- @param id string: The unique ID of the zone to remove.
    local function remove_dui_zone(id)
        local data = dui_locations[id]
        if not data then return end

        if data.dui_object and data.dui_object.dui_object then
            DestroyDui(data.dui_object.dui_object)
        end

        dui_locations[id] = nil
    end

    exports("remove_dui_zone", remove_dui_zone)

    --- Handles key press interactions for a location.
    --- @param location table: The location table.
    local function handle_key_presses(location)
        for i = 1, #location.keys do
            local key_data = location.keys[i]
            if IsControlJustReleased(0, key_data.key_control) then
                key_data.on_action()
            end
        end
    end

    --- Renders a single zone"s DUI.
    --- @param location table: The location table.
    --- @param player_coords vector3: The players coordinates.
    local function render_dui(location, player_coords)
        if location.is_hidden then return end
        if GetGameTimer() < (location.dui_object.initialized_at or 0) then
            return
        end

        local dui = location.dui_object
        if not dui then return end

        if HasStreamedTextureDictLoaded(dui.txd_name) then
            SetDrawOrigin(location.coords.x, location.coords.y, player_coords.z + 0.5)
            DrawInteractiveSprite(dui.txd_name, dui.txt_name, 0, 0, 0.7, 0.7, 0.0, 255, 255, 255, 255)
            ClearDrawOrigin()
        end

        local should_send = false
        local payload = {
            image = location.image or nil,
            header = location.header,
            model = location.model,
            icon = location.icon,
            keys = location.keys,
            outline = location.outline,
            is_destroyed = location.is_destroyed,
            is_hidden = location.is_hidden,
            additional = location.additional
        }

        for k, v in pairs(payload) do
            if location._last_state[k] ~= v then
                should_send = true
                location._last_state[k] = v
            end
        end

        if should_send then
            local message = json.encode({ func = "show_dui", payload = payload })
            SendDuiMessage(location.dui_object.dui_object, message)
        end


    end

    --- Toggles an entitys outline visibility.
    --- @param entity number: The entity ID.
    --- @param state boolean: Whether to enable or disable the outline.
    local function toggle_outline(entity, state)
        if not entity or not DoesEntityExist(entity) then return end
        SetEntityDrawOutline(entity, state)
        if state then
            SetEntityDrawOutlineColor(255, 255, 255, 255)
            SetEntityDrawOutlineShader(1)
        end
    end

    --- @section Events

    --- Syncs DUI updates from server with client UI.
    --- @param id string: Zone ID.
    --- @param updated_data table: The new data.
    RegisterNetEvent("pluck:cl:sync_dui_data", function(id, updated_data)
        local location = dui_locations[id]
        if not location then return end

        for key, value in pairs(updated_data) do
            if key == "keys" and type(value) == "table" then
                local valid_keys = {}
                for _, key_data in ipairs(value) do
                    local key_name = string.lower(key_data.key or "")
                    local key_control = key_list[key_name]
                    if key_control then
                        key_data.key_control = key_control
                        valid_keys[#valid_keys + 1] = key_data
                    end
                end
                location[key] = valid_keys
            else
                location[key] = value
            end

            if key == "keys" then
                location._last_state[key] = nil
            end
        end
    end)

    --- @section Threads

    --- Handles rendering DUI.
    local function dui_render_loop()
        while true do
            local player_ped = PlayerPedId()
            local player_coords = GetEntityCoords(player_ped)
            local found = false

            for _, location in pairs(dui_locations) do
                if location.is_destroyed then
                    remove_dui_zone(location.id)
                else
                    local should_show = true

                    if location.can_access then
                        local now = GetGameTimer()
                        location._last_access_check = location._last_access_check or 0

                        if now - location._last_access_check > 2000 then
                            location._last_access_check = now

                            local ok, result = pcall(location.can_access)
                            location._last_access_result = ok and result == true
                        end

                        should_show = location._last_access_result
                    end

                    if should_show and not location.is_hidden then
                        local dx = player_coords.x - location.coords.x
                        local dy = player_coords.y - location.coords.y
                        local dz = player_coords.z - location.coords.z
                        local distance_squared = dx * dx + dy * dy + dz * dz

                        if distance_squared <= dui_range_squared then
                            if not location.in_proximity then
                                location.in_proximity = true
                            end

                            render_dui(location, player_coords)
                            handle_key_presses(location)
                            found = true

                            if location.outline and location.entity then
                                toggle_outline(location.entity, true)
                            end
                        elseif location.in_proximity then
                            location.in_proximity = false

                            if location.outline and location.entity then
                                toggle_outline(location.entity, false)
                            end
                        end
                    end
                end
            end

            if found then Wait(0) else Wait(250) end
        end
    end


    --- Inits render loop.
    SetTimeout(2000, function()
        CreateThread(dui_render_loop)
    end)

end