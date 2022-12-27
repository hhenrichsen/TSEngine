export class Sets {
    public static union<T>(a: Set<T>, b: Set<T>): Set<T> {
        return new Set([...a, ...b]);
    }

    public static intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
        return new Set([...a].filter((item) => b.has(item)));
    }

    public static difference<T>(a: Set<T>, b: Set<T>): Set<T> {
        return new Set([
            ...[...a].filter((item) => !b.has(item)),
            ...[...b].filter((item) => !a.has(item)),
        ]);
    }
}
