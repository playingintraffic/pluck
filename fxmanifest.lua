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
version "1.3.0"
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