// import pkg from 'deep-object-diff';
// const { diff } = pkg;

// import { diff as deep_diff} from 'deep-object-diff';
import { diff } from 'deep-object-diff';


export default class JsonModel {
    #content = {};
    #subscriptions = new Map();
    nextId = 1;

    get() {
        // make a copy of the content, instead of returning a reference
        return this.#copyOf(this.#content);
    }

    replace(newContent, path = []) {
        let workModel = this.#copyOf(this.#content);
        // console.log(workModel);

        // no path - replace the whole content
        if (path.length === 0) {
            // make a copy, instead of saving a reference
            workModel = JSON.parse(JSON.stringify(newContent));
        } else {
            // replace part of the content indicated by the path
            let node = workModel;
            path.slice(0, -1).forEach(element => {
                if (Reflect.has(node, element)) {
                    node = node[element];
                } else {
                    throw this.#elementNotFoundError(path, element)
                }
            });
            const field = path[path.length - 1];
            if (Reflect.has(node, field)) {
                node[field] = this.#copyOf(newContent);
            } else {
                throw this.#elementNotFoundError(path, field);
            }
        }

        const dif = diff(this.#content, workModel);
        const pathsAll = this.#getPaths(dif);
        const pathsLongest = this.#filterPaths(pathsAll);

        this.#content = workModel;

        this.#notifyOnChange(pathsLongest);
    }

    // subscribe to change notifications
    onChange(path, callback, context) {
        console.debug("Adding onChange subscription for /" + path.join('/'));
        const key = this.nextId;
        this.nextId++;

        this.#subscriptions.set(key, { path: path, callback: callback, context: context });
        return key;
    }

    removeOnChange(key) {
        const sub = this.#subscriptions.get(key);
        console.debug("Removing onChange subscription for /" + sub.path.join('/'));
        this.#subscriptions.delete(key);
    }

    #overlap(a, b) {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }

        return true;
    }

    #filterPaths(paths) {
        return paths.filter((element) => {
            for (const i in paths) {
                const e = paths[i];
                if (this.#overlap(element, e)) {
                    if (e.length > element.length) {
                        return false;
                    }
                }
            }
            return true;
        });
    }

    #pathString(path) {
        return "/" + path.join('/');
    }

    #getPaths(object, path = [], foundPaths = []) {
        const pathText = this.#pathString(path);
        if (object !== null) {
            Object.keys(object).forEach(key => {
                const newPath = this.#copyOf(path);
                newPath.push(key);
                foundPaths.push(newPath);

                if (typeof object[key] === 'object') {
                    this.#getPaths(object[key], newPath, foundPaths);
                }
            });
        }

        return foundPaths;
    }

    #notifyOnChange(paths) {
        if(this.#subscriptions.size == 0) {
            // console.log("No subscribers to notify");
            return;
        }
        // console.log("notifyOnChange:", paths, "subs:", this.#subscriptions);
        const pathsStrings = paths.reduce((accumulator, currentValue, index, array) => {
            accumulator.push('/' + currentValue.join('/'))
            return accumulator
        }, [])

        let callbacksCalled = 0
        this.#subscriptions.forEach((sub, id) => {
            const matchingPaths = paths.filter(path => this.#overlap(sub.path, path));

            if (matchingPaths.length > 0) {
                sub.callback(matchingPaths, sub.context);
                callbacksCalled++
            }
        }, this)
        console.log(callbacksCalled, "notification(s) on change(s) at", pathsStrings.join(', '))
    }

    #elementNotFoundError(path, element) {
        const fullPathText = '/' + path.join('/');
        return new Error('Path\'s element "' + element + '" (full path: ' + fullPathText + ') not found in the content');
    }

    #copyOf(data) {
        if (data === undefined) {
            return undefined;
        }
        return JSON.parse(JSON.stringify(data));
    }
}
