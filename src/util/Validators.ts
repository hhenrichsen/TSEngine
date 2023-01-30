import { isArray, isObject, isUndefined } from "./PrimitiveTypeguards";
import { Objects } from "./Objects";

// Validators are higher-order functions that use other type guards to ensure
// that some value has some type. Functions in this file should return a type
// guard function, but should not execute the type guard themselves.
export type Validator<T> = (value: unknown) => value is T;

export function recordValidator<T>(valueValidator: (value) => value is T) {
    return (value): value is Record<string, T> => {
        return isObject(value) && Object.values(value).every(valueValidator);
    };
}

export function arrayValidator<T>(itemValidator: Validator<T>): Validator<T[]> {
    return (value): value is T[] =>
        Array.isArray(value) && value.every(itemValidator);
}

type GuardToType<T> = T extends (value: unknown) => value is infer Type
    ? Type
    : never;
type ObjectGuardToType<
    T extends { [key: string]: (value: unknown) => value is unknown },
> = WithUndefinedAsOptional<{
    [K in keyof T]: GuardToType<T[K]>;
}>;
export function objectValidator<
    T extends {
        [key: string]: Validator<any>;
    },
>(validators: T, strict = false) {
    return (value): value is ObjectGuardToType<T> => {
        if (isArray(value) || !isObject(value)) {
            return false;
        }
        const res = Objects.every(validators, (validator, key) => {
            return validator(value[key]);
        });
        if (!res || !strict) {
            return res;
        }
        return Objects.every(value, (value, key) => {
            return value === undefined || key in Object.keys(validators);
        });
    };
}

export function isEither<A, B>(
    validatorA: Validator<A>,
    validatorB: Validator<B>,
): Validator<A | B> {
    return (value: unknown): value is A | B =>
        validatorA(value) || validatorB(value);
}

export function isBoth<A, B>(
    validatorA: Validator<A>,
    validatorB: Validator<B>,
): Validator<A | B> {
    return (value: unknown): value is A & B =>
        validatorA(value) && validatorB(value);
}

export function isOption<A>(validator: Validator<A>): Validator<A | undefined> {
    return isEither(isUndefined, validator);
}
