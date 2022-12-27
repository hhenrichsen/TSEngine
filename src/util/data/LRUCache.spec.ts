import { LRUCache } from "./LRUCache";

describe(module.id, () => {
    it("should remove the least used item", () => {
        const cache = new LRUCache<number, number>(3);
        cache.set(0, 1);
        cache.set(1, 2);
        cache.set(2, 3);
        cache.set(3, 4);

        expect(cache.get(0)).toBeFalsy();
        expect(cache.get(1)).toBeTruthy();
        expect(cache.get(2)).toBeTruthy();
        expect(cache.get(3)).toBeTruthy();

        cache.get(1);
        cache.set(4, 5);

        expect(cache.get(0)).toBeFalsy();
        expect(cache.get(2)).toBeFalsy();
        expect(cache.get(1)).toBeTruthy();
        expect(cache.get(3)).toBeTruthy();
        expect(cache.get(4)).toBeTruthy();
    });

    it("should overwrite duplicate keys", () => {
        const cache = new LRUCache<number, number>(3);
        cache.set(0, 1);
        cache.set(0, 2);
        cache.set(0, 3);
        const result = cache.get(0);

        expect(result).toBe(3);
    });

    it("should clear properly", () => {
        const cache = new LRUCache<number, number>(3);
        cache.set(0, 1);
        cache.set(1, 2);
        cache.set(2, 3);

        expect(cache.size()).toBe(3);

        cache.clear();

        expect(cache.size()).toBe(0);
    });
});
