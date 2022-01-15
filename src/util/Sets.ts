export function union<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a, ...b]);
}

export function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([...a].filter((item) => b.has(item)));
}

export function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set([
        ...[...a].filter((item) => !b.has(item)),
        ...[...b].filter((item) => !a.has(item)),
    ]);
}
