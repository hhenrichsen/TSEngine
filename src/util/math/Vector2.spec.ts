import { Vector2 } from "./Vector2";
import "../../testutils/WithinRange";
import "../../testutils/VectorsEqual";

describe(module.id, () => {
    describe("basic interface", () => {
        it("should be equal to others", () => {
            const v = new Vector2(7, 18);
            expect(v.equals(v)).toBeTruthy();

            // VectorLike
            expect(v.equals({ x: 7, y: 18 })).toBeTruthy();

            // Full Vector2
            const v2 = new Vector2(7, 18);
            expect(v.equals(v2)).toBeTruthy();
        });

        it("should not be equal to unequal types or vectors", () => {
            const v = new Vector2(11, 16);

            // Unequal types
            expect(v.equals(11)).toBeFalsy();
            expect(v.equals("11")).toBeFalsy();
            expect(v.equals(v.toString())).toBeFalsy();

            // VectorLikes, but off by some different ranges
            expect(v.equals(new Vector2(11, 15))).toBeFalsy();
            expect(v.equals(new Vector2(10, 16))).toBeFalsy();

            expect(v.equals(new Vector2(7, 10))).toBeFalsy();
            expect(v.equals(new Vector2(16, 10))).toBeFalsy();

            expect(v.equals(new Vector2(11, 5))).toBeFalsy();
            expect(v.equals(new Vector2(11, 19))).toBeFalsy();

            // VectorLikes, but off by some different ranges
            expect(v.equals({ x: 11, y: 15 })).toBeFalsy();
            expect(v.equals({ x: 10, y: 16 })).toBeFalsy();

            expect(v.equals({ x: 7, y: 10 })).toBeFalsy();
            expect(v.equals({ x: 16, y: 10 })).toBeFalsy();

            expect(v.equals({ x: 11, y: 5 })).toBeFalsy();
            expect(v.equals({ x: 11, y: 19 })).toBeFalsy();

            // Partial comparisons
            expect(v.equals({ x: 11 })).toBeFalsy();
            expect(v.equals({ y: 16 })).toBeFalsy();

            expect(v.equals({ x: 6 })).toBeFalsy();
            expect(v.equals({ x: 13 })).toBeFalsy();

            expect(v.equals({ y: 12 })).toBeFalsy();
            expect(v.equals({ y: 20 })).toBeFalsy();
        });

        it("should have distinct hash codes", () => {
            const v = new Vector2(13, 19);
            expect(Vector2.hashCode(v)).toEqual(Vector2.hashCode(v));

            const v2 = new Vector2(2, 12);
            expect(Vector2.hashCode(v)).not.toEqual(Vector2.hashCode(v2));
        });

        it("should detect near vectors", () => {
            const v = new Vector2(13, 19);
            const v2 = new Vector2(2, 12);
            const v3 = new Vector2(14, 19);
            const v4 = Vector2.add(v, Vector2.rotateDegrees(Vector2.UnitX, 45));
            expect(Vector2.isNear(v, v2)).toBeFalsy();
        });
    });

    describe("geometry", () => {
        it("should find proper distances between vectors", () => {
            const v1 = Vector2.matching(5);
            expect(Vector2.distance(Vector2.Zero, v1)).toBeCloseTo(
                Math.sqrt(50),
            );

            const v2 = new Vector2(1, -4);
            expect(Vector2.distance(Vector2.Zero, v2)).toBeCloseTo(
                Math.sqrt(17),
            );

            const v3 = Vector2.matching(-2);
            expect(Vector2.distance(Vector2.Zero, v3)).toBeCloseTo(
                Math.sqrt(8),
            );
        });

        it("should find the same distance both ways", () => {
            const v1 = Vector2.matching(12);
            const v2 = new Vector2(1, -4);
            expect(Vector2.distance(v1, v2)).toBeCloseTo(
                Vector2.distance(v2, v1),
            );
        });

        it("should find proper square distances between vectors", () => {
            const v1 = Vector2.matching(5);
            expect(Vector2.squareDistance(Vector2.Zero, v1)).toBe(50);

            const v2 = new Vector2(1, -4);
            expect(Vector2.squareDistance(Vector2.Zero, v2)).toBe(17);

            const v3 = Vector2.matching(-2);
            expect(Vector2.squareDistance(Vector2.Zero, v3)).toBe(8);
        });

        it("should find the same square distance both ways", () => {
            const v1 = Vector2.matching(12);
            const v2 = new Vector2(1, -4);
            expect(Vector2.squareDistance(v1, v2)).toBeCloseTo(
                Vector2.squareDistance(v2, v1),
            );
        });

        it("should find the correct determinant", () => {
            const v1 = new Vector2(1, 5);
            const v2 = new Vector2(3, 4);
            expect(Vector2.determinant(v1, v2)).toBe(-11);
            expect(Vector2.determinant(v1, v2)).toBe(
                -Vector2.determinant(v2, v1),
            );
        });

        it("should find the correct magnitude", () => {
            const v1 = new Vector2(3, 4);
            expect(Vector2.magnitude(v1)).toBe(5);
        });

        it("should find the correct square magnitude", () => {
            const v1 = new Vector2(3, 4);
            expect(Vector2.squareMagnitude(v1)).toBe(25);
        });

        it("should normalize", () => {
            const [x, y] = Vector2.normalize({ x: 2, y: 4 });
            expect(x).toBeCloseTo(2 / Math.sqrt(20));
            expect(y).toBeCloseTo(4 / Math.sqrt(20));
        });

        it("should normalize a zero vector to zero", () => {
            const [x, y] = Vector2.normalize({ x: 0, y: 0 });
            expect(x).toBe(0);
            expect(y).toBe(0);
        });

        it("should convert to a radian angle", () => {
            expect(Vector2.toAngleRadians({ x: 0, y: 0 })).toBe(0);
            expect(Vector2.toAngleRadians({ x: 0.5, y: 0.5 })).toBe(
                Math.PI / 4,
            );
            expect(Vector2.toAngleRadians({ x: 0, y: 1 })).toBe(Math.PI / 2);
        });

        it("should convert to a degree angle", () => {
            expect(Vector2.toAngleDegrees({ x: 0, y: 0 })).toBe(0);
            expect(Vector2.toAngleDegrees({ x: 0.5, y: 0.5 })).toBe(45);
            expect(Vector2.toAngleDegrees({ x: 0, y: 1 })).toBe(90);
        });

        it("should rotate around a radian angle", () => {
            expect(Vector2.rotateRadians({ x: 1, y: 0 }, 0)).toEqualVector2({
                x: 1,
                y: 0,
            });
            expect(
                Vector2.rotateRadians({ x: 1, y: 0 }, Math.PI / 4),
            ).toEqualVector2({ x: Math.sqrt(2) / 2, y: Math.sqrt(2) / 2 });
            expect(
                Vector2.rotateRadians({ x: 1, y: 0 }, Math.PI / 2),
            ).toEqualVector2({ x: 0, y: 1 });

            expect(
                Vector2.magnitude(
                    Vector2.rotateRadians({ x: 1, y: 0 }, Math.PI / 2),
                ),
            ).toBeCloseTo(1);
            expect(
                Vector2.magnitude(
                    Vector2.rotateRadians({ x: 2, y: 0 }, Math.PI / 2),
                ),
            ).toBeCloseTo(2);
        });

        it("should rotate around a degree angle", () => {
            expect(Vector2.rotateDegrees({ x: 1, y: 0 }, 0)).toEqualVector2({
                x: 1,
                y: 0,
            });
            expect(Vector2.rotateDegrees({ x: 1, y: 0 }, 45)).toEqualVector2({
                x: Math.sqrt(2) / 2,
                y: Math.sqrt(2) / 2,
            });
            expect(Vector2.rotateDegrees({ x: 1, y: 0 }, 90)).toEqualVector2({
                x: 0,
                y: 1,
            });

            expect(
                Vector2.magnitude(Vector2.rotateDegrees({ x: 1, y: 0 }, 45)),
            ).toBeCloseTo(1);
            expect(
                Vector2.magnitude(Vector2.rotateDegrees({ x: 2, y: 0 }, 45)),
            ).toBeCloseTo(2);
        });
    });

    describe("algebra", () => {
        it("should scale properly", () => {
            const v1 = new Vector2(1, -2);
            const [xs, ys] = Vector2.scale(v1, 2);
            expect(xs).toBe(2);
            expect(ys).toBe(-4);

            const [xs2, ys2] = Vector2.scale(v1, { x: 1, y: 0 });
            expect(xs2).toBe(1);
            expect(ys2).toBe(-0);

            const [xs3, ys3] = Vector2.scale(v1, 5, -3);
            expect(xs3).toBe(5);
            expect(ys3).toBe(6);
        });

        it("should add properly", () => {
            const v1 = new Vector2(1, -2);
            const [xa, ya] = Vector2.add(v1, 2);
            expect(xa).toBe(3);
            expect(ya).toBe(0);

            const [xa2, ya2] = Vector2.add(v1, { x: 1, y: 0 });
            expect(xa2).toBe(2);
            expect(ya2).toBe(-2);

            const [xa3, ya3] = Vector2.add(v1, 5, -3);
            expect(xa3).toBe(6);
            expect(ya3).toBe(-5);

            const v2 = new Vector2(3, 3);
            const [xas, yas] = Vector2.addScaled(v1, v2, -2);
            expect(xas).toBe(-5);
            expect(yas).toBe(-8);
        });

        it("should subtract properly", () => {
            const v1 = new Vector2(1, -2);
            const [xs, ys] = Vector2.subtract(v1, 2);
            expect(xs).toBe(-1);
            expect(ys).toBe(-4);

            const [xs2, ys2] = Vector2.subtract(v1, { x: 1, y: 0 });
            expect(xs2).toBe(0);
            expect(ys2).toBe(-2);

            const [xs3, ys3] = Vector2.subtract(v1, 5, -3);
            expect(xs3).toBe(-4);
            expect(ys3).toBe(1);

            const v2 = new Vector2(3, 3);
            const [xas, yas] = Vector2.subtractScaled(v1, v2, -2);
            expect(xas).toBe(7);
            expect(yas).toBe(4);
        });

        it("should floor properly", () => {
            const v1 = new Vector2(1.00123, -5.1931);
            expect(Vector2.floor(v1)).toEqualVector2({ x: 1, y: -6 });
        });

        it("should ceil properly", () => {
            const v1 = new Vector2(1.00123, -5.1931);
            expect(Vector2.ceil(v1)).toEqualVector2({ x: 2, y: -5 });
        });
    });
});
