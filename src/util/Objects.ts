export class Objects {
    public static every<T extends { [key: string]: any }>(
        object: T,
        check: (
            item: T[typeof key],
            key: string & keyof T,
            object: T,
        ) => boolean,
    ): boolean {
        for (const key of Object.keys(object)) {
            if (!check(object[key], key, object)) {
                return false;
            }
            return true;
        }
    }
}
