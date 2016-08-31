"use strict";

import _moveTo from "./moveTo";

export const moveTo = function (id) {
    const _this = this;

    if (_this.data.ids.indexOf(id) > -1) {
        console.log("MOVE " + id);
        _moveTo.call(_this, id);
    } else {
        console.info("MISSING " + id);
    }
};
export const moveBy = function (val) {
    moveTo.call(this.data.index + val);
};
export const moveForward = function (val) {
    moveBy.call(1);
};
export const moveBackward = function (val) {
    moveBy.call(-1);
};
