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

fx_version "cerulean"
games { "gta5", "rdr3" }

name "pluck"
version "1.6.0"
description "PLUCK - Predefined Lua UI Component Kit"
author "Case"
repository "https://github.com/boiidevelopment/pluck"
lua54 "yes"

fx_version "cerulean"
game "gta5"

ui_page "pluck/ui/index.html"
nui_callback_strict_mode "true"

files { "**" }

shared_scripts {
    "pluck/init.lua",
    "pluck/shared/*.lua"
}

provide "pluck"