import { Sets } from "./Sets";

describe(module.id, () => {
    describe("union()", () => {
        test("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = Sets.union(setA, setB);
            expect(setC.size).toBe(3);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("C");
        });

        test("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = Sets.union(setA, setB);
            expect(setC.size).toBe(0);
        });

        test("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = Sets.union(setA, setB);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("C");
            expect(setC).toContain("D");
            expect(setC).toContain("E");
        });
    });

    describe("intersection()", () => {
        test("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = Sets.intersection(setA, setB);
            expect(setC.size).toBe(0);
        });

        test("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = Sets.intersection(setA, setB);
            expect(setC.size).toBe(0);
        });

        test("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = Sets.intersection(setA, setB);
            expect(setC).toContain("C");
        });
    });

    describe("difference()", () => {
        test("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = Sets.difference(setA, setB);
            expect(setC.size).toBe(setA.size);
        });

        test("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = Sets.difference(setA, setB);
            expect(setC.size).toBe(0);
        });

        test("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = Sets.difference(setA, setB);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("D");
            expect(setC).toContain("E");
        });
    });
});
