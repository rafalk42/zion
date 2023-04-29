type ObjectValue = {
    [key: string]: StateValue
}

type ArrayValue = Array<StateValue>

type StateValue =
    null 
    | number
    | string
    | boolean
    | ObjectValue
    | ArrayValue

export type StatePath = ReadonlyArray<string>;

export interface StateApi {
    update(path: StatePath, value: StateValue): void
}

export class State implements StateApi {
    state: StateValue;

    constructor(root: StateValue = null) {
        this.state = root;
    }

    // root: []
    // ["foo", "bar"]
    update(path: StatePath, value: StateValue) {
        this.state = this._update(path, this.state, value);
        // empty path means root element
        // if (this.state instanceof Map<string, StateValue>) {
        //     this.state.set(path[0], value);
        // }
    }

    _update(path: StatePath, state: StateValue, newValue: StateValue) : StateValue {
        if(path.length == 0) {
            state = newValue;
        } else if(state instanceof Array) {
        } else if(typeof state === "object") {
            let foo = path[0]
            if(state === null) {
                state = {}
            }
            state[foo] = this._update(path.slice(1), state[foo], newValue)
        }

        return state
    }

    dump() {
        console.log(this.state);
    }

    get() : StateValue {
        return this.state
    }
}

