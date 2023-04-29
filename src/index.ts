import { State, StatePath, StateApi } from "./state";

// module
//  has a list of paths it reads, writes
//  onChange handler
//   ?get api for interacting with the state

interface Module {
    readonly reads: StatePath;
    readonly writes: StatePath;
    onInit(stateApi: StateApi): void;
    onChange(path: StatePath): void;
}


class OdometerProvider implements Module {
    readonly reads: StatePath;
    readonly writes: StatePath;
    stateApi: StateApi | null;

    constructor() {
        this.reads = [];
        this.writes = ["tc", "odo"];
        this.stateApi = null;
    }

    onInit(stateApi: StateApi) {
        this.stateApi = stateApi;
    }

    onChange(path: StatePath) {
        
    }
}

let a = new State();
a.dump();
a.update([], {"foo": [{"bla": "123"}, {"ble": 444}]});
a.dump();