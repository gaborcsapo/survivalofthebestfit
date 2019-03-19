import $ from 'jquery';
import {cvCollection} from '~/public/assets/text/cvCollection.js';
import CLASSES from '~/public/controllers/constants/classes';

export default class {
    constructor() {
        this.$el = $('#dataset-view-resume');
        this.$nameEl = this.$el.find('.Resume__title');
        this.$taglineEl = this.$el.find('.Resume__tagline');
        this._resumeFeatures = cvCollection.cvFeatures;
    }

    previewNewPerson(cv) {
        console.log(cv);
        this.setColor(cv.color);
        this.$nameEl.html(cv.name);
        this.$taglineEl.html('Lorem Ipsum tagline');
        this._resumeFeatures.forEach((feature, index) => {
            const skillScore = cv.qualifications[index]*10;
            const skillClass = `.${CLASSES.CV_CATEGORY}--${feature.class}`;
            const $skillEl = this.$el.find(skillClass);
            $skillEl.find(`.${CLASSES.CV_CATEGORY}__name`).html(feature.name);
            $skillEl.find(`.${CLASSES.CV_CATEGORY}__progress`).css('width', `${skillScore}%`);
        });
    }

    setColor(color) {
        if (color === 'yellow') {
            this.$el
                .addClass(CLASSES.RESUME_YELLOW)
                .removeClass(CLASSES.RESUME_BLUE);
        } else {
            this.$el
                .addClass(CLASSES.RESUME_BLUE)
                .removeClass(CLASSES.RESUME_YELLOW);
        };
    }
    // destroy the instance

    destroy() {
    }
}