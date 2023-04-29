"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
class OdometerProvider {
    constructor() {
        this.reads = ["odo"];
        this.writes = [];
        this.stateApi = null;
    }
    onInit(stateApi) {
        this.stateApi = stateApi;
    }
    onChange(path) {
    }
}
let a = new state_1.State();
a.dump();
a.update([], { "foo": [{ "bla": "123" }, { "ble": 444 }] });
a.dump();
