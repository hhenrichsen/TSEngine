import { isArray, isObject, isUndefined } from "./PrimitiveTypeguards";
import { Objects } from "./Objects";
import type { WithUndefinedAsOptional } from "./types/Objects";

/** Validators are higher-order functions that use other type guards to ensure
 * that some value has some type. Functions in this file should return a type
 * guard function, but should not execute the type guard themselves. */
export type Validator<T> = (value: unknown) => value is T;

/** Converts a type guard function to the guarded type. */
type GuardToType<T> = T extends (value: unknown) => value is infer Type
    ? Type
    : never;

/** Same as {@link GuardToType} except for objects. */
type ObjectGuardToType<
    T extends { [key: string]: (value: unknown) => value is unknown },
> = WithUndefinedAsOptional<{
    [K in keyof T]: GuardToType<T[K]>;
}>;

/**
 * Creates a validator that ensures every value in a given record is of the
 * type of the validator.
 *
 * @param valueValidator The validator with which to check values
 */
export function recordValidator<T>(valueValidator: (value) => value is T) {
    return (value): value is Record<string, T> => {
        return isObject(value) && Object.values(value).every(valueValidator);
    };
}

/**
 * Creates a validator that ensures every item in a given array is of the type
 * of the validator.
 *
 * @param itemValidator The validator with which to check items
 */
export function arrayValidator<T>(itemValidator: Validator<T>): Validator<T[]> {
    return (value): value is T[] =>
        Array.isArray(value) && value.every(itemValidator);
}

/**
 * Creates a validator that ensures every key given by the validator record
 * matches the value type guard.
 *
 * @param validators A record of validators representing the desired object's
 * structure
 * @param strict If the created validator should also check that no keys other
 * than the requested keys exist 
 */
export function objectValidator<
    T extends Record<string, Validator<unknown>>,
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
        // Do a reverse validation to ensure that *only* the requested keys
        // exist.
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
