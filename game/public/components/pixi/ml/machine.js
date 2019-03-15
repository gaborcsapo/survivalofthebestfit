import {mlLabStageContainer} from '../../../controllers/game/gameSetup';
import {SPRITES} from '../../../controllers/common/textures.js';
import {uv2px, spacingUtils as space} from '../../../controllers/common/utils.js';
import EVENTS from '../../../controllers/constants/events.js';
import {eventEmitter} from '../../../controllers/game/gameSetup.js';


export default class {
    constructor(options) {
        this.machine = SPRITES.machine;
        this.inspectButton = SPRITES.inspectButton;
        this.scale = 0.7;
        this._resizeHandler = this._resizeHandler.bind(this);
        this._addEventListeners();
    }

    // add element to pixi container

    addToPixi() {
        this._draw();
        mlLabStageContainer.addChild(this.machine);
        mlLabStageContainer.addChild(this.inspectButton);
    }

    // draw based on current dimensions

    _draw() {
        this.machine.scale.set(this.scale);
        this.machine.x = space.screenCenterX(this.machine.width);
        this.machine.y = space.screenCenterY(this.machine.height) - uv2px(0.27, 'h');

        this.inspectButton.scale.set(this.scale);
        this.inspectButton.x = space.getCenteredChildX(this.machine.x, this.machine.width, this.inspectButton.width);
        this.inspectButton.y = space.getCenteredChildY(this.machine.y, this.machine.height, this.inspectButton.height);
    }

    // (re)compute draw parameter values

    _computeParams() {

    }

    // resize function

    _resizeHandler() {
        this._computeParams();
        this._draw();
    }

    // add event listeners

    _addEventListeners() {
        this.inspectButton.interactive = true;
        this.inspectButton.buttonMode = true;
        this.inspectButton.on('click', this._inspectButtonClickHandler);
        eventEmitter.on(EVENTS.RESIZE, this._resizeHandler);
    }

    // remove event listeners

    _removeEventListeners() {
        this.inspectButton.off('click', this._inspectButtonClickHandler);
        eventEmitter.off(EVENTS.RESIZE, this._resizeHandler);
    }

    // click handler

    _inspectButtonClickHandler() {
        eventEmitter.emit(EVENTS.INSPECT_DATASET, {});
    }

    // util function to pass machine dimensions to data server/scan ray

    getMachineDimensions() {
        return {
            scale: this.scale,
            width: this.machine.width,
            height: this.machine.height,
            x: space.screenCenterX(this.machine.width),
            y: space.screenCenterY(this.machine.height) - uv2px(0.27, 'h'),
        };
    }
}
