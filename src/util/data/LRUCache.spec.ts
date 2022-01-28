import { LRUCache } from "./LRUCache";

describe(module.id, () => {
    it("should remove the least used item", () => {
        const cache = new LRUCache<number, number>(3);
        console.log("Add 0");
        cache.set(0, 1);
        console.log("Add 1");
        cache.set(1, 2);
        console.log("Add 2");
        cache.set(2, 3);
        console.log("Add 3");
        cache.set(3, 4);

        console.log("Get 0");
        expect(cache.get(0)).toBeFalsy();
        console.log("Get 1");
        expect(cache.get(1)).toBeTruthy();
        console.log("Get 2");
        expect(cache.get(2)).toBeTruthy();
        console.log("Get 3");
        expect(cache.get(3)).toBeTruthy();

        console.log("Get 1");
        cache.get(1);
        console.log("Add 4");
        cache.set(4, 5);

        console.log("Get 0");
        expect(cache.get(0)).toBeFalsy();
        console.log("Get 2");
        expect(cache.get(2)).toBeFalsy();
        console.log("Get 1");
        expect(cache.get(1)).toBeTruthy();
        console.log("Get 3");
        expect(cache.get(3)).toBeTruthy();
        console.log("Get 4");
        expect(cache.get(4)).toBeTruthy();
    });
});