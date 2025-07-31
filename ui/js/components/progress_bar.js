export class ProgressBar {
    /**
     * Stores the currently active progress bar instance.
     * @type {?ProgressBar}
     */
    static current = null;

    /**
     * Creates a new progress bar, destroying any existing instance.
     * @param {Object} data - Progress bar configuration.
     * @param {string} data.header - The header text.
     * @param {string} data.icon - Icon class for the header.
     * @param {number} data.duration - Duration of the progress in ms.
     */
    constructor(data) {
        if (ProgressBar.current) {
            ProgressBar.current.destroy();
        }
        ProgressBar.current = this;

        this.header = data.header || "No header";
        this.icon = data.icon || "fa-solid fa-gear";
        this.duration = data.duration || 5000;
        this._interval_id = null;

        this.create_progress();
    }

    /**
     * Initializes the container and builds the progress bar UI.
     */
    create_progress() {
        if ($('.progress_container').length === 0) {
            $('<div>').addClass('progress_container').appendTo('#ui_focus');
        }
        this.create();
    }

    /**
     * Builds and renders the progress bar segments and header.
     */
    create() {
        this.progress_end(false);

        const segments = 30;
        let segment_html = "";
        for (let i = 0; i < segments; i++) {
            segment_html += `<div class="progress_segment" data-index="${i}"></div>`;
        }

        const content = `
            <div class="progress_bar">
                <div class="progress_bar_header">
                    <i class="${this.icon}"></i> <h3>${this.header}</h3>
                </div>
                <div class="progress_bar_body">
                    ${segment_html}
                </div>
            </div>
        `;

        $('.progress_container').stop(true, true).html(content).fadeIn(200);

        this.animate_progress_bar(this.duration, segments);
    }

    /**
     * Animates the progress bar segments over time.
     * @param {number} duration - Total animation duration in ms.
     * @param {number} segment_count - Number of segments to animate.
     */
    animate_progress_bar(duration, segment_count = 30) {
        if (this._interval_id) clearInterval(this._interval_id);

        const interval = duration / segment_count;
        let current = 0;

        this._interval_id = setInterval(() => {
            const index = segment_count - 1 - current;
            const segment = $(`.progress_segment[data-index="${index}"]`);
            if (segment.length > 0) {
                segment.addClass("progress_segment_used");
            }
            current++;
            if (current >= segment_count) {
                this.progress_end(true);
            }
        }, interval);
    }

    /**
     * Ends the progress bar.
     */
    progress_end() {
        if (this._interval_id) {
            clearInterval(this._interval_id);
            this._interval_id = null;
        }

        this.hide_progress();
    }

    /**
     * Hides and clears the progress bar from the DOM.
     */
    hide_progress() {
        $('.progress_container').stop(true, true).fadeOut(300, function () {
            $(this).empty();
        });
    }

    /**
     * Destroys this instance, cancels animation, and clears UI.
     */
    destroy() {
        this.progress_end(false);
        if (ProgressBar.current === this) {
            ProgressBar.current = null;
        }
    }
}

/*
new ProgressBar({ header: "Uploading...", icon: "fa-solid fa-upload", duration: 8000 });
*/