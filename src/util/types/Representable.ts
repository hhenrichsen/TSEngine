export interface Representable {
    toString(): string;
}

export type Representer<T> = (value: T) => string;