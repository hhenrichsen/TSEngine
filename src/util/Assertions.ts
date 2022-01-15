export function assertNotNullOrUndefined<T>(value: T | null | undefined, context?: string): asserts value is T {
    expect(value).withContext(context ?? "").not.toBeNull();
    expect(value).withContext(context ?? "").not.toBeUndefined();
}