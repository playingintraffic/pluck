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

export class AudioPlayer {
    constructor(autoplay = true, randomize = true) {
        this.audio = new Audio();
        this.tracklist = [];
        this.current_index = 0;
        this.volume_levels = [0, 0.5, 1];
        this.volume_index = 1;
        this.audio.volume = this.volume_levels[this.volume_index];
        this.randomize = randomize;
        this.autoplay = autoplay;
        this.init();
    }

    async init() {
        await this.load_json_data(["/ui/core/data/tracklist.json"]);
        if (this.tracklist.length === 0) return;
        this.current_index = this.randomize ? Math.floor(Math.random() * this.tracklist.length) : 0;
        this.setup_controls();
        this.play_song(this.current_index, this.autoplay);
    }

    async load_json_data(file_paths) {
        const promises = file_paths.map(path => $.getJSON(path));
        try {
            const results = await Promise.all(promises);
            this.tracklist = results[0];
        } catch (error) {
            console.error("Failed to load JSON data:", error);
        }
    }

    play_song(index, autoplay = true) {
        const song = this.tracklist[index];
        this.audio.src = `/ui/core/assets/audio/${song.file}`;
        this.update_ui(song);

        if (autoplay) {
            this.audio.muted = true;
            this.audio.play().then(() => {
                this.audio.muted = false;
                this.update_play_icon();
            }).catch((e) => console.warn("Autoplay failed:", e));
        } else {
            this.audio.pause();
            this.update_play_icon();
        }
    }

    update_play_icon() {
        const icon = $("#toggle_play_pause i");
        if (!icon.length) return;
        icon.removeClass("fa-play fa-pause");
        icon.addClass(this.audio.paused ? "fa-play" : "fa-pause");
    }

    get_html() {
        return `
            <div class="audio_player">
                <div class="audio_info">
                    <div class="audio_info_left">
                        <div class="audio_artwork" id="song_artwork"></div>
                        <div class="audio_text">
                            <span id="current_song_title">Loading...</span><br>
                            <span id="current_song_artist">Loading...</span> 
                        </div>
                    </div>
                    <div class="audio_controls">
                        <button id="volume_control"></button>
                        <button id="toggle_play_pause"><i class="fa-solid fa-pause"></i></button>    
                        <button id="prev_song"><i class="fa-solid fa-backward"></i></button>
                        <button id="next_song"><i class="fa-solid fa-forward"></i></button>
                    </div>
                </div>
                <div class="audio_progress">
                    <div id="progress_bar" class="progress_bar"></div>
                </div>
            </div>
        `;
    }

    update_ui(song) {
        $("#progress_bar").css("width", "0%");
        $("#song_artwork").css("background-image", song.artwork ? `url(/ui/core/assets/artwork/${song.artwork})` : "");
        $("#current_song_title").text(song.title);
        $("#current_song_artist").text(song.artist);
    }

    setup_controls() {
        this.audio.onended = () => {
            this.current_index = (this.current_index + 1) % this.tracklist.length;
            this.play_song(this.current_index);
        };

        $("#toggle_play_pause").click(() => {
            if (this.audio.paused) {
                this.audio.play();
            } else {
                this.audio.pause();
            }
            this.update_play_icon();
        });

        this.audio.onloadedmetadata = () => {
            $("#progress_bar").attr("max", this.audio.duration);
        };

        this.audio.ontimeupdate = () => {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            $("#progress_bar").css("width", `${progress}%`);
        };

        $("#next_song").click(() => {
            this.current_index = (this.current_index + 1) % this.tracklist.length;
            this.play_song(this.current_index);
        });

        $("#prev_song").click(() => {
            this.current_index = (this.current_index - 1 + this.tracklist.length) % this.tracklist.length;
            this.play_song(this.current_index);
        });

        $("#volume_control").click(() => {
            this.volume_index = (this.volume_index + 1) % this.volume_levels.length;
            this.audio.volume = this.volume_levels[this.volume_index];
            this.update_volume_icon();
        });

        this.update_volume_icon();
    }

    update_volume_icon() {
        const icon = $("#volume_control");
        icon.removeClass().addClass("fa");
        if (this.audio.volume === 0) icon.addClass("fa-volume-off");
        else if (this.audio.volume <= 0.5) icon.addClass("fa-volume-down");
        else icon.addClass("fa-volume-up");
    }

    destroy() {
        if (this.audio) {
            this.audio.pause();
            this.audio.src = "";
            this.audio.onended = null;
            this.audio.onloadedmetadata = null;
            this.audio.ontimeupdate = null;
        }

        $("#toggle_play_pause").off("click");
        $("#next_song").off("click");
        $("#prev_song").off("click");
        $("#volume_control").off("click");
    }
}