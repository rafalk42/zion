import { State } from  "../src/state";

/*
    null 
    | number
    | string
    | boolean
    | ObjectValue
    | ArrayValue

*/
describe("basic storage using constructor", () => {
    test("Store and retrieve null - default constructor", () => {
        let a = new State()
        expect(a.get()).toStrictEqual(null)
    });
    test("Store and retrieve null", () => {
        let a = new State(null)
        expect(a.get()).toStrictEqual(null)
    });
     test("Store and retrieve number", () => {
        let a = new State(12345)
        expect(a.get()).toStrictEqual(12345)
    });
   test("Store and retrieve string", () => {
        let a = new State("foo bar")
        expect(a.get()).toStrictEqual("foo bar")
    });
    test("Store and retrieve boolean", () => {
        let a = new State(true)
        expect(a.get()).toStrictEqual(true)
    });
    test("Store and retrieve object", () => {
        let a = new State({"lorem ipsum": 42})
        expect(a.get()).toStrictEqual({"lorem ipsum": 42})
    });
    test("Store and retrieve array", () => {
        let a = new State([1, 2, "foo", false])
        expect(a.get()).toStrictEqual([1, 2, "foo", false])
    });
});

describe("Updates", () => {
    test("Updating root node should replace it with the given value", () => {
        let a = new State(["foo", "bar"])
        a.update([], 123)
        expect(a.get()).toStrictEqual(123)
    });
    test("Updating object's existing property should replace it with the given value", () => {
        let a = new State({"foo": 123})
        a.update(["foo"], "bla bla")
        expect(a.get()).toStrictEqual({"foo": "bla bla"})
    });
    test("Updating object's non-existing property should add it with the given value", () => {
        let a = new State({"bar": 123})
        a.update(["foo"], "bla bla")
        expect(a.get()).toStrictEqual({"bar": 123, "foo": "bla bla"})
    });
    test("Updating default/empty state should add object with the given value", () => {
        let a = new State()
        a.update(["foo"], "bla bla")
        expect(a.get()).toStrictEqual({"foo": "bla bla"})
    });
    test("Updating object's existing property should replace it with the given value", () => {
        let a = new State({"foo": {"bar": {"buzz": 123}}})
        a.update(["foo", "bar", "buzz"], "bla bla")
        expect(a.get()).toStrictEqual({"foo": {"bar": {"buzz": "bla bla"}}})
    });
});
