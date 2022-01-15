import {difference, intersection, union} from "./Sets";

describe(module.id, () => {
    describe("union()", () => {
        it("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = union(setA, setB);
            expect(setC.size).toBe(3);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("C");
        });

        it("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = union(setA, setB);
            expect(setC.size).toBe(0);
        });

        it("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = union(setA, setB);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("C");
            expect(setC).toContain("D");
            expect(setC).toContain("E");
        });
    });

    describe("intersection()", () => {
        it("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = intersection(setA, setB);
            expect(setC.size).toBe(0);
        });

        it("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = intersection(setA, setB);
            expect(setC.size).toBe(0);
        });

        it("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = intersection(setA, setB);
            expect(setC).toContain("C");
        });
    });

    describe("difference()", () => {
        it("should work with an empty set", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>([]);
            const setC = difference(setA, setB);
            expect(setC.size).toBe(setA.size);
        });

        it("should work with empty sets", () => {
            const setA = new Set<string>([]);
            const setB = new Set<string>([]);
            const setC = difference(setA, setB);
            expect(setC.size).toBe(0);
        });

        it("should work in the general case", () => {
            const setA = new Set<string>(["A", "B", "C"]);
            const setB = new Set<string>(["C", "D", "E"]);
            const setC = difference(setA, setB);
            expect(setC).toContain("A");
            expect(setC).toContain("B");
            expect(setC).toContain("D");
            expect(setC).toContain("E");
        });
    });
});
