export function isNullOrUndefined(
    value: unknown,
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

export function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return (
        (value != null && typeof value == "object") ||
        typeof value == "function"
    );
}

export function isUnknown(value: unknown): value is unknown {
    return true;
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function isNull(value: unknown): value is undefined {
    return value === null;
}
