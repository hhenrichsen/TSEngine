import { isInt } from "./PrimitiveTypeguards";

export class Arrays {
    public static init<R>(count: number, initializer: (index: number) => R) {
        if (!isInt(count) || isNaN(count) || count < 0) {
            return [];
        }
        return [...Array(count)].map((_empty, index) => initializer(index));
    }

    public static zipTruncated<T, U>(a1: T[], a2: U[]): [T, U][] {
        const len = Math.min(a1.length, a2.length);
        return Arrays.init(len, (index) => [a1[index], a2[index]]);
    }

    public static zip<T, U>(
        a1: T[],
        a2: U[],
    ): [T | undefined, U | undefined][] {
        const len = Math.max(a1.length, a2.length);
        return Arrays.init(len, (index) => [a1[index], a2[index]]);
    }
}
