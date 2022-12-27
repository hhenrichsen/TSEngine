import {
    isBoolean,
    isInt,
    isNotNullOrUndefined,
    isNumber,
    isString,
    isTruthy,
} from "./PrimitiveTypeguards";

describe(module.id, () => {
    describe("isString", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: false },
            { name: "5", value: 5, expected: false },
            { name: "Empty Object", value: {}, expected: false },
            { name: "Object", value: { message: "hello" }, expected: false },
            { name: "-Infinity", value: -Infinity, expected: false },
            { name: "true", value: true, expected: false },
            { name: "false", value: false, expected: false },
            { name: "0", value: 0, expected: false },
            { name: "hello world", value: "hello world", expected: true },
        ])("IsString($name): Should be $expected", ({ value, expected }) => {
            expect(isString(value)).toBe(expected);
        });
    });

    describe("isNumber", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: true },
            { name: "5", value: 5, expected: true },
            { name: "Empty Object", value: {}, expected: false },
            { name: "Object", value: { message: "hello" }, expected: false },
            { name: "-Infinity", value: -Infinity, expected: true },
            { name: "true", value: true, expected: false },
            { name: "false", value: false, expected: false },
            { name: "0", value: 0, expected: true },
            { name: "hello world", value: "hello world", expected: false },
        ])("IsNumber($name): Should be $expected", ({ value, expected }) => {
            expect(isNumber(value)).toBe(expected);
        });
    });
    describe("isInt", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: false },
            { name: "5", value: 5, expected: true },
            { name: "Empty Object", value: {}, expected: false },
            { name: "Object", value: { message: "hello" }, expected: false },
            { name: "-Infinity", value: -Infinity, expected: false },
            { name: "true", value: true, expected: false },
            { name: "false", value: false, expected: false },
            { name: "0", value: 0, expected: true },
            { name: "hello world", value: "hello world", expected: false },
        ])("IsInt($name): Should be $expected", ({ value, expected }) => {
            expect(isInt(value)).toBe(expected);
        });
    });
    describe("isBoolean", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: false },
            { name: "5", value: 5, expected: false },
            { name: "Empty Object", value: {}, expected: false },
            { name: "Object", value: { message: "hello" }, expected: false },
            { name: "-Infinity", value: -Infinity, expected: false },
            { name: "true", value: true, expected: true },
            { name: "false", value: false, expected: true },
            { name: "0", value: 0, expected: false },
            { name: "hello world", value: "hello world", expected: false },
        ])("IsBoolean($name): Should be $expected", ({ value, expected }) => {
            expect(isBoolean(value)).toBe(expected);
        });
    });
    describe("IsNotNullOrUndefined", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: true },
            { name: "5", value: 5, expected: true },
            { name: "Empty Object", value: {}, expected: true },
            { name: "Object", value: { message: "hello" }, expected: true },
            { name: "-Infinity", value: -Infinity, expected: true },
            { name: "true", value: true, expected: true },
            { name: "false", value: false, expected: true },
            { name: "0", value: 0, expected: true },
            { name: "hello world", value: "hello world", expected: true },
        ])(
            "IsNotNullOrUndefined($name): Should be $expected",
            ({ value, expected }) => {
                expect(isNotNullOrUndefined(value)).toBe(expected);
            },
        );
    });

    describe("isTruthy", () => {
        test.each([
            { name: "Undefined", value: undefined, expected: false },
            { name: "null", value: null, expected: false },
            { name: "NaN", value: NaN, expected: false },
            { name: "5", value: 5, expected: true },
            { name: "Empty Object", value: {}, expected: true },
            { name: "Object", value: { message: "hello" }, expected: true },
            { name: "-Infinity", value: -Infinity, expected: true },
            { name: "true", value: true, expected: true },
            { name: "false", value: false, expected: false },
            { name: "0", value: 0, expected: false },
            { name: "hello world", value: "hello world", expected: true },
        ])("isTruthy($name): Should be $expected", ({ value, expected }) => {
            expect(isTruthy(value)).toBe(expected);
        });
    });
});
