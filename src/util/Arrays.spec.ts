import { Arrays } from "./Arrays";

describe(module.id, () => {
    describe("Arrays.init()", () => {
        test("should Arrays.initialize a proper array", () => {
            const a1 = Arrays.init(5, (i) => i);
            expect(a1).toBeTruthy();
            expect(a1.length).toBe(5);
            expect(a1).toEqual([0, 1, 2, 3, 4]);
        });

        test("should work in the empty case", () => {
            const a1 = Arrays.init(0, (i) => i);
            expect(a1).toBeTruthy();
            expect(a1.length).toBe(0);
        });

        test("should work in the negative case", () => {
            const a1 = Arrays.init(-500, (i) => i);
            expect(a1).toBeTruthy();
            expect(a1.length).toBe(0);
        });

        test("should work in the NaN case", () => {
            const a1 = Arrays.init(NaN, (i) => i);
            expect(a1).toBeTruthy();
            expect(a1.length).toBe(0);
        });

        test("should work in the InfArrays.inity cases", () => {
            const a1 = Arrays.init(Infinity, (i) => i);
            expect(a1).toBeTruthy();
            expect(a1.length).toBe(0);
            const a2 = Arrays.init(-Infinity, (i) => i);
            expect(a2).toBeTruthy();
            expect(a2.length).toBe(0);
        });
    });

    describe("Arrays.zipTruncated()", () => {
        test("should zip equal sized arrays", () => {
            const a1 = Arrays.init(5, (i) => i * i);
            const a2 = Arrays.init(5, (i) => i);
            const a3 = Arrays.zipTruncated(a1, a2);
            expect(a3.length).toBe(5);
            expect(a3[0].length).toBe(2);
            expect(a3).toEqual(Arrays.init(5, (i) => [i * i, i]));
        });

        test("should truncate unequal arrays", () => {
            const a1 = Arrays.init(5, (i) => i * i);
            const a2 = Arrays.init(10, (i) => i);
            const a3 = Arrays.zipTruncated(a1, a2);
            expect(a3.length).toBe(5);
            expect(a3[0].length).toBe(2);
            expect(a3).toEqual(Arrays.init(5, (i) => [i * i, i]));
        });
    });

    describe("Arrays.zip()", () => {
        test("should zip equal sized arrays", () => {
            const a1 = Arrays.init(5, (i) => i * i);
            const a2 = Arrays.init(5, (i) => i);
            const a3 = Arrays.zip(a1, a2);
            expect(a3.length).toBe(5);
            expect(a3[0].length).toBe(2);
            expect(a3).toEqual(Arrays.init(5, (i) => [i * i, i]));
        });

        test("should place undefined in nonexistent elements for unequal arrays", () => {
            const a1 = Arrays.init(5, (i) => i * i);
            const a2 = Arrays.init(10, (i) => i);
            const a3 = Arrays.zip(a1, a2);
            expect(a3.length).toBe(10);
            expect(a3[0].length).toBe(2);
            expect(a3).toEqual(
                Arrays.init(10, (i) => [i < 5 ? i * i : undefined, i]),
            );
        });
    });
});
