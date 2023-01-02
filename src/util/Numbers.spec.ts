import { Numbers } from "./Numbers";

describe(module.id, () => {
    it("should sum numbers", () => {
        expect(Numbers.sum()).toBe(0);
        expect(Numbers.sum(1)).toBe(1);
        expect(Numbers.sum(1, 2, 3)).toBe(6);
        expect(Numbers.sum(-1, 1, -1, 1)).toBe(0);
    });

    it("should product numbers", () => {
        expect(Numbers.product()).toBe(1);
        expect(Numbers.product(1)).toBe(1);
        expect(Numbers.product(1, 2, 3)).toBe(6);
        expect(Numbers.product(-1, 1, -1, 1)).toBe(1);
    });

    it("should mean numbers", () => {
        expect(Numbers.mean()).toBe(NaN);
        expect(Numbers.mean(1)).toBe(1);
        expect(Numbers.mean(1, -1)).toBe(0);
        expect(Numbers.mean(1, 2, 3, 2, 1)).toBe(1.8);
        expect(Numbers.mean(1, 1, 1, 1, 1)).toBe(1);
    });

    it("should find proper numbers within ranges", () => {
        expect(Numbers.isWithin(5, 10, 5)).toBeTruthy();
        expect(Numbers.isWithin(15, 10, 5)).toBeTruthy();

        expect(Numbers.isWithin(15.0000001, 10, 5)).toBeFalsy();
        expect(Numbers.isWithin(4.9999999, 10, 5)).toBeFalsy();
        expect(Numbers.isWithin(16, 10, 5)).toBeFalsy();
        expect(Numbers.isWithin(16, 10, 5)).toBeFalsy();
    });

    it("should normalize numbers", () => {
        expect(Numbers.normalize(50, 0, 100, 0, 200)).toBe(100);
    });

    it("should handle invalid ranges gracefully", () => {
        expect(Numbers.normalize(50, 0, 0, 100, 500)).toBe(0);
        expect(Numbers.normalize(50, 0, 100, 100, 100)).toBe(0);
    });

    it("should mod values without copying their sign", () => {
        expect(Numbers.unsignedMod(33, 10)).toBe(3);
        expect(Numbers.unsignedMod(-33, 10)).toBe(7);
    });

    it("should convert radians to degrees", () => {
        expect(Numbers.radiansToDegrees(0)).toBe(0);
        expect(Numbers.radiansToDegrees(Math.PI / 6)).toBeCloseTo(30);
        expect(Numbers.radiansToDegrees(Math.PI / 4)).toBeCloseTo(45);
        expect(Numbers.radiansToDegrees(Math.PI / 3)).toBeCloseTo(60);
        expect(Numbers.radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);

        expect(
            Numbers.radiansToDegrees(Math.PI * 12 + Math.PI / 6),
        ).toBeCloseTo(2190);
        expect(
            Numbers.radiansToDegrees(Math.PI * -12 + Math.PI / 6),
        ).toBeCloseTo(-2130);
    });

    it("should convert radians to degrees within the range of the unit circle", () => {
        expect(Numbers.radiansToDegreesClamped(0)).toBe(0);
        expect(Numbers.radiansToDegreesClamped(Math.PI / 6)).toBeCloseTo(30);
        expect(Numbers.radiansToDegreesClamped(Math.PI / 4)).toBeCloseTo(45);
        expect(Numbers.radiansToDegreesClamped(Math.PI / 3)).toBeCloseTo(60);
        expect(Numbers.radiansToDegreesClamped(Math.PI / 2)).toBeCloseTo(90);

        expect(
            Numbers.radiansToDegreesClamped(Math.PI * 12 + Math.PI / 6),
        ).toBeCloseTo(30);
        expect(
            Numbers.radiansToDegreesClamped(Math.PI * -12 + Math.PI / 6),
        ).toBeCloseTo(30);
    });

    it("should convert degrees to radians", () => {
        expect(Numbers.degreesToRadians(0)).toBe(0);
        expect(Numbers.degreesToRadians(30)).toBeCloseTo(Math.PI / 6);
        expect(Numbers.degreesToRadians(45)).toBeCloseTo(Math.PI / 4);
        expect(Numbers.degreesToRadians(60)).toBeCloseTo(Math.PI / 3);
        expect(Numbers.degreesToRadians(90)).toBeCloseTo(Math.PI / 2);

        expect(Numbers.degreesToRadians(-2130)).toBeCloseTo(
            -Math.PI * 12 + Math.PI / 6,
        );
        expect(Numbers.degreesToRadians(2190)).toBeCloseTo(
            Math.PI * 12 + Math.PI / 6,
        );
    });

    it("should convert degrees to radians within the range of the unit circle", () => {
        expect(Numbers.degreesToRadiansClamped(0)).toBe(0);
        expect(Numbers.degreesToRadiansClamped(30)).toBeCloseTo(Math.PI / 6);
        expect(Numbers.degreesToRadiansClamped(45)).toBeCloseTo(Math.PI / 4);
        expect(Numbers.degreesToRadiansClamped(60)).toBeCloseTo(Math.PI / 3);
        expect(Numbers.degreesToRadiansClamped(90)).toBeCloseTo(Math.PI / 2);

        expect(Numbers.degreesToRadiansClamped(-2130)).toBeCloseTo(Math.PI / 6);
        expect(Numbers.degreesToRadiansClamped(2190)).toBeCloseTo(Math.PI / 6);
    });

    it("should clamp numbers between two bounds", () => {
        expect(Numbers.clamp(100, 0, 50)).toBe(50);
        expect(Numbers.clamp(25, 0, 50)).toBe(25);
        expect(Numbers.clamp(-100, 0, 50)).toBe(0);
        expect(Numbers.clamp(50, 0, 50)).toBe(50);
        expect(Numbers.clamp(0, 0, 50)).toBe(0);

        expect(Numbers.clamp(100, 100, 50)).toBe(NaN);
    });
});
