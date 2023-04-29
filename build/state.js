"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor() {
        this.state = null;
    }
    // root: []
    // ["foo", "bar"]
    update(path, value) {
        // empty path means root element
        if (path.length == 0) {
            this.state = value;
        }
        // if (this.state instanceof Map<string, StateValue>) {
        //     this.state.set(path[0], value);
        // }
    }
    dump() {
        console.log(this.state);
    }
}
exports.State = State;
