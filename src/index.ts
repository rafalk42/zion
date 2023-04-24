// module
//  has a list of paths it reads, writes
//  onChange handler
//   ?get api for interacting with the state

type StateValue =
    null 
    | string
    | number
    | boolean
    | Map<string, StateValue>
    | Array<StateValue>;

type StatePath = ReadonlyArray<string>;

interface StateApi {
    update(path: StatePath, value: StateValue): void;
}

class State implements StateApi {
    state: StateValue;

    constructor() {
        this.state = null;
    }

    update(path: StatePath, value: StateValue) {
        if (this.state instanceof Map<string, StateValue>) {
            this.state.set(path[0], value);
        }
    }

    dump() {
        console.log(this.state);
    }
}

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
        this.reads = ["odo"];
        this.writes = [];
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
a.update(["foo"], 123);
a.dump();