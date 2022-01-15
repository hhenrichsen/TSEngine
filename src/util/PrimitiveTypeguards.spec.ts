import {
    isBoolean,
    isInt,
    isNotNullOrUndefined,
    isNumber,
    isString,
    isTruthy,
} from "./PrimitiveTypeguards";
import { expectEachToBe } from "./Tests";

describe(module.id, () => {

    describe("isString", () => {
        it("should properly detect strings", () => {
            const trueValues: unknown[] = ["hello world", ""];
            const falseValues: unknown[] = [
                undefined,
                null,
                NaN,
                5,
                {},
                {message: "hello"},
                3.14,
                -Infinity,
                true,
                false,
                0,
            ];
            expectEachToBe(isString, trueValues, true);
            expectEachToBe(isString, falseValues, false);
        });
    });

    describe("isNumber", () => {
        it("should properly detect numbers", () => {
            const trueValues: unknown[] = [5, 3.14, -Infinity, NaN, 0];
            const falseValues: unknown[] = [
                undefined,
                null,
                {},
                {message: "hello"},
                "hello world",
                "",
                true,
                false,
            ];
            expectEachToBe(isNumber, trueValues, true);
            expectEachToBe(isNumber, falseValues, false);
        });
    });

    describe("isInt", () => {
        it("should properly detect ints", () => {
            const trueValues: unknown[] = [5, 0];
            const falseValues: unknown[] = [
                undefined,
                null,
                NaN,
                3.14,
                -Infinity,
                {},
                {message: "hello"},
                true,
                false,
            ];
            expectEachToBe(isInt, trueValues, true);
            expectEachToBe(isInt, falseValues, false);
        });
    });

    describe("isBoolean", () => {
        it("should properly detect booleans", () => {
            const trueValues: unknown[] = [false, true];
            const falseValues: unknown[] = [
                undefined,
                null,
                NaN,
                5,
                {},
                {message: "hello"},
                "",
                "hello",
                3.14,
                -Infinity,
                0,
            ];
            expectEachToBe(isBoolean, trueValues, true);
            expectEachToBe(isBoolean, falseValues, false);
        });
    });

    describe("isNotNullOrUndefined", () => {
        it("should properly find nulls and undefined", () => {
            const trueValues: unknown[] = [
                "hello world",
                "",
                NaN,
                5,
                {},
                {message: "hello"},
                3.14,
                -Infinity,
                true,
                false,
            ];
            const falseValues: unknown[] = [undefined, null];
            expectEachToBe(isNotNullOrUndefined, trueValues, true);
            expectEachToBe(isNotNullOrUndefined, falseValues, false);
        });
    });

    describe("isTruthy", () => {
        it("should properly find truthy values", () => {
            const trueValues: unknown[] = [
                "hello world",
                5,
                {message: "hello"},
                [],
                {},
                -3.14,
                -Infinity,
                true,
            ];
            expectEachToBe(isTruthy, trueValues, true);
        });

        it("should fail on all other values", () => {
            const falseValues: unknown[] = [undefined, null, "", NaN, false, 0];
            expectEachToBe(isTruthy, falseValues, false);
        });
    });
});
