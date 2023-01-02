export type Validator<T> = (value: unknown) => value is T;

export function isNullOrUndefined<T>(
    value: T | null | undefined,
): value is null | undefined {
    return value == null;
}

export function isNotNullOrUndefined<T>(
    value: T | null | undefined,
): value is T {
    return value != null;
}

export function isString(value: unknown): value is string {
    return typeof value == "string";
}

export function isBoolean(value: unknown): value is boolean {
    return typeof value == "boolean";
}

export function isNumber(value: unknown): value is number {
    return typeof value == "number";
}

export function isInt(value: unknown): value is number {
    return isNumber(value) && isFinite(value) && value % 1 == 0;
}

export function isTruthy<T>(
    value: T | null | undefined | false | "" | 0 | void,
): value is T {
    return !!value;
}

export function isArray<T>(itemValidator: Validator<T>): Validator<T[]> {
    return (value): value is T[] =>
        Array.isArray(value) && value.every(itemValidator);
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
