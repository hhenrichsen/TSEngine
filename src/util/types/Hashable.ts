export interface Hashable {
    hashCode(): number;
}

export type Hasher<T> = (value: T) => number;
