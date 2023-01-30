export type DefinedKeys<T> = Exclude<
    { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T],
    undefined
>;

export type WithUndefinedAsOptional<T extends object> = {
    [K in keyof T]+?: T[K];
} & {
    [K in DefinedKeys<T>]-?: T[K];
};
