export class Maps {
    public static getOrSetDefault<K, V>(map: Map<K, V>, key: K, def: V) {
        const v = map.get(key);
        if (v != undefined) {
            return v;
        }
        map.set(key, def);
        return def;
    }
}