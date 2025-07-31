--[[
    This file is part of PLUCK (Predefined Lua UI Component Kit) and is licensed under the MIT License.
    See the LICENSE file in the root directory for full terms.

    © 2025 Case @ Playing In Traffic

    Support honest development — retain this credit. Don’t be that guy...
]]

--[[
#########################################################
#  ____  _        _ __   _____ _   _  ____   ___ _   _  #
# |  _ \| |      / \\ \ / /_ _| \ | |/ ___| |_ _| \ | | #
# | |_) | |     / _ \\ V / | ||  \| | |  _   | ||  \| | #
# |  __/| |___ / ___ \| |  | || |\  | |_| |  | || |\  | #
# |_|   |_____/_/   \_\_| |___|_| \_|\____| |___|_| \_| #
#  _____ ____      _    _____ _____ ___ ____            #
# |_   _|  _ \    / \  |  ___|  ___|_ _/ ___|           #
#   | | | |_) |  / _ \ | |_  | |_   | | |               #
#   | | |  _ <  / ___ \|  _| |  _|  | | |___            #
#   |_| |_| \_\/_/   \_\_|   |_|   |___\____|           #              
#########################################################
]]

fx_version "cerulean"
games { "gta5", "rdr3" }

name "pluck"
version "1.0.0"
description "PLUCK - Predefined Lua UI Component Kit"
author "PlayingInTraffic"
repository "https://github.com/playingintraffic/pluck"
lua54 "yes"

fx_version "cerulean"
game "gta5"

ui_page "ui/index.html"
nui_callback_strict_mode "true"

files {
    "**"
}

--- Init
shared_script "init.lua"

--- Core
shared_scripts {
    "scripts/*.lua"
}

--- Test code you can remove this :)
client_script "test.lua"