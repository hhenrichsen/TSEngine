import { Vector2Mutable } from "./Vector2Mutable";
import { Vector2, Vector2Like, Vector2Operatable } from "./Vector2";
import "../../testutils/VectorsEqual";

describe(module.id, () => {
    // These tests should not assume (im)mutability, and should only test functions as if they are units.
    const doInstanceTests = (
        init: (
            x: number,
            y: number,
        ) => Vector2Operatable<Vector2Operatable<Vector2Like>>,
    ) => {
        describe("basic interface", () => {
            it("should allow access to x and y", () => {
                const v = init(7, 18);
                expect(v.x).toBe(7);
                expect(v.y).toBe(18);
            });

            it("should decompose", () => {
                const [x1, y2] = init(8, 12);
                expect(x1).toBe(8);
                expect(y2).toBe(12);

                const { x, y } = init(7, 9);
                expect(x).toBe(7);
                expect(y).toBe(9);
            });

            it("should be equal to others", () => {
                const v = init(7, 18);
                expect(v.equals(v)).toBeTruthy();

                // VectorLike
                expect(v.equals({ x: 7, y: 18 })).toBeTruthy();

                // Full Vector2
                const v2 = init(7, 18);
                expect(v.equals(v2)).toBeTruthy();
            });

            it("should not be equal to unequal types or vectors", () => {
                const v = init(11, 16);

                // Unequal types
                expect(v.equals(11)).toBeFalsy();
                expect(v.equals("11")).toBeFalsy();
                expect(v.equals(v.toString())).toBeFalsy();

                // VectorLikes, but off by some different ranges
                expect(v.equals(init(11, 15))).toBeFalsy();
                expect(v.equals(init(10, 16))).toBeFalsy();

                expect(v.equals(init(7, 10))).toBeFalsy();
                expect(v.equals(init(16, 10))).toBeFalsy();

                expect(v.equals(init(11, 5))).toBeFalsy();
                expect(v.equals(init(11, 19))).toBeFalsy();

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
                const v = init(13, 19);
                expect(v.hashCode()).toEqual(v.hashCode());

                const v2 = init(2, 12);
                expect(v.hashCode()).not.toEqual(v2.hashCode());
            });

            it("should detect near vectors", () => {
                const v = init(13, 19);
                const v2 = init(2, 12);
                const v3 = init(14, 19);
                const v4 = Vector2.add(
                    v,
                    Vector2.rotateDegrees(Vector2.UnitX, 45),
                );
                expect(v.isNear(v2)).toBeFalsy();
                expect(v.isNear(v3)).toBeFalsy();
                expect(v.isNear(v3, 1)).toBeTruthy();
                expect(v.isNear(v4, 1)).toBeTruthy();
            });
        });

        describe("geometry", () => {
            it("should find proper distances between vectors", () => {
                const v1 = init(5, 5);
                expect(v1.distance(Vector2.Zero)).toBeCloseTo(Math.sqrt(50));

                const v2 = init(1, -4);
                expect(v2.distance(Vector2.Zero)).toBeCloseTo(Math.sqrt(17));

                const v3 = init(-2, -2);
                expect(v3.distance(Vector2.Zero)).toBeCloseTo(Math.sqrt(8));
            });

            it("should find the same distance both ways", () => {
                const v1 = init(12, 12);
                const v2 = init(1, -4);
                expect(v1.distance(v2)).toBeCloseTo(v2.distance(v1));
            });

            it("should find proper square distances between vectors", () => {
                const v1 = init(5, 5);
                expect(v1.squareDistance(Vector2.Zero)).toBe(50);

                const v2 = init(1, -4);
                expect(v2.squareDistance(Vector2.Zero)).toBe(17);

                const v3 = Vector2.matching(-2);
                expect(v3.squareDistance(Vector2.Zero)).toBe(8);
            });

            it("should find the same square distance both ways", () => {
                const v1 = init(12, 12);
                const v2 = init(1, -4);
                expect(v1.squareDistance(v2)).toBeCloseTo(
                    v2.squareDistance(v1),
                );
            });

            it("should find the correct determinant", () => {
                const v1 = init(1, 5);
                const v2 = init(3, 4);
                expect(v1.determinant(v2)).toBe(-11);
                expect(v2.determinant(v1)).toBe(-v1.determinant(v2));
            });

            it("should find the correct magnitude", () => {
                const v1 = init(3, 4);
                expect(v1.magnitude()).toBe(5);
            });

            it("should find the correct square magnitude", () => {
                const v1 = init(3, 4);
                expect(v1.squareMagnitude()).toBe(25);
            });

            it("should normalize", () => {
                const normalized = init(2, 4).normalize();
                expect(normalized.x).toBeCloseTo(2 / Math.sqrt(20));
                expect(normalized.y).toBeCloseTo(4 / Math.sqrt(20));
            });

            it("should normalize a zero vector to zero", () => {
                const normalized = init(0, 0).normalize();
                expect(normalized.x).toBe(0);
                expect(normalized.y).toBe(0);
            });

            it("should convert to a radian angle", () => {
                const zeros = init(0, 0);
                const halves = init(0.5, 0.5);
                const unit = init(0, 1);
                expect(zeros.toAngleRadians()).toBe(0);
                expect(halves.toAngleRadians()).toBe(Math.PI / 4);
                expect(unit.toAngleRadians()).toBe(Math.PI / 2);
            });

            it("should convert to a degree angle", () => {
                const zeros = init(0, 0);
                const halves = init(0.5, 0.5);
                const unit = init(0, 1);
                expect(zeros.toAngleDegrees()).toBe(0);
                expect(halves.toAngleDegrees()).toBe(45);
                expect(unit.toAngleDegrees()).toBe(90);
            });

            it("should rotate around a radian angle", () => {
                const unit = init(1, 0);
                const unit2 = init(1, 0);
                const unit3 = init(1, 0);
                const unrotated = unit.rotateRadians(0);
                expect(unrotated).toEqualVector2({ x: 1, y: 0 });
                expect(unit2.rotateRadians(Math.PI / 4)).toEqualVector2({
                    x: Math.sqrt(2) / 2,
                    y: Math.sqrt(2) / 2,
                });
                expect(unit3.rotateRadians(Math.PI / 2)).toEqualVector2({
                    x: 0,
                    y: 1,
                });

                const nonUnit = init(2, 0);
                const rotatedNonUnit = nonUnit.rotateRadians(Math.PI / 4);
                expect(unit.magnitude()).toBeCloseTo(
                    Vector2.magnitude(unrotated),
                );
                expect(nonUnit.magnitude()).toBeCloseTo(
                    Vector2.magnitude(rotatedNonUnit),
                );
            });

            it("should rotate around a degree angle", () => {
                const unit = init(1, 0);
                const unit2 = init(1, 0);
                const unit3 = init(1, 0);
                const unrotated = unit.rotateDegrees(0);
                expect(unrotated).toEqualVector2({ x: 1, y: 0 });
                expect(unit2.rotateDegrees(45)).toEqualVector2({
                    x: Math.sqrt(2) / 2,
                    y: Math.sqrt(2) / 2,
                });
                expect(unit3.rotateDegrees(90)).toEqualVector2({ x: 0, y: 1 });

                const nonUnit = init(2, 0);
                const rotatedNonUnit = nonUnit.rotateDegrees(45);
                expect(unit.magnitude()).toBeCloseTo(
                    Vector2.magnitude(unrotated),
                );
                expect(nonUnit.magnitude()).toBeCloseTo(
                    Vector2.magnitude(rotatedNonUnit),
                );
            });
        });

        describe("algebra", () => {
            it("should scale properly", () => {
                const v1 = init(1, -2);
                const { x: xs, y: ys } = v1.scale(2);
                expect(xs).toBe(2);
                expect(ys).toBe(-4);

                const v2 = init(1, -2);
                const { x: xs2, y: ys2 } = v2.scale({ x: 1, y: 0 });
                expect(xs2).toBe(1);
                expect(ys2).toBe(-0);

                const v3 = init(1, -2);
                const { x: xs3, y: ys3 } = v3.scale(5, -3);
                expect(xs3).toBe(5);
                expect(ys3).toBe(6);
            });

            it("should add properly", () => {
                const v1 = init(1, -2);
                const [xa, ya] = v1.add(2);
                expect(xa).toBe(3);
                expect(ya).toBe(0);

                const v2 = init(1, -2);
                const [xa2, ya2] = v2.add({ x: 1, y: 0 });
                expect(xa2).toBe(2);
                expect(ya2).toBe(-2);

                const v3 = init(1, -2);
                const [xa3, ya3] = v3.add(5, -3);
                expect(xa3).toBe(6);
                expect(ya3).toBe(-5);

                const v4 = init(1, -2);
                const va1 = init(3, 3);
                const [xas, yas] = v4.addScaled(va1, -2);
                expect(xas).toBe(-5);
                expect(yas).toBe(-8);
            });

            it("should subtract properly", () => {
                const v1 = init(1, -2);
                const [xs, ys] = v1.subtract(2);
                expect(xs).toBe(-1);
                expect(ys).toBe(-4);

                const v2 = init(1, -2);
                const [xs2, ys2] = v2.subtract({ x: 1, y: 0 });
                expect(xs2).toBe(0);
                expect(ys2).toBe(-2);

                const v3 = init(1, -2);
                const [xs3, ys3] = v3.subtract(5, -3);
                expect(xs3).toBe(-4);
                expect(ys3).toBe(1);

                const v4 = init(1, -2);
                const va1 = init(3, 3);
                const [xas, yas] = v4.subtractScaled(va1, -2);
                expect(xas).toBe(7);
                expect(yas).toBe(4);
            });

            it("should floor properly", () => {
                const v1 = init(1.00123, -5.1931);
                expect(v1.floor()).toEqualVector2({ x: 1, y: -6 });
            });

            it("should ceil properly", () => {
                const v1 = init(1.00123, -5.1931);
                expect(v1.ceil()).toEqualVector2({ x: 2, y: -5 });
            });
        });
    };

    describe("Vector2", () => {
        doInstanceTests((x, y) => new Vector2(x, y));

        it("constant checks", () => {
            const z1 = Vector2.Zero;
            expect(z1).toEqualVector2({ x: 0, y: 0 });

            const o1 = Vector2.Ones;
            expect(o1).toEqualVector2({ x: 1, y: 1 });

            const x1 = Vector2.UnitX;
            expect(x1).toEqualVector2({ x: 1, y: 0 });

            const y1 = Vector2.UnitY;
            expect(y1).toEqualVector2({ x: 0, y: 1 });
        });
    });

    describe("Vector2Mutable", () => {
        doInstanceTests((x, y) => new Vector2Mutable(x, y));

        it("should allow getting multiple constants without mutating them", () => {
            const z1 = Vector2Mutable.Zero;
            expect(z1).toEqualVector2({ x: 0, y: 0 });
            z1.add(5);
            expect(z1).toEqualVector2({ x: 5, y: 5 });

            const z2 = Vector2Mutable.Zero;
            expect(z2).toEqualVector2({ x: 0, y: 0 });

            const o1 = Vector2Mutable.Ones;
            expect(o1).toEqualVector2({ x: 1, y: 1 });
            o1.add(5);
            expect(o1).toEqualVector2({ x: 6, y: 6 });

            const o2 = Vector2Mutable.Ones;
            expect(o2).toEqualVector2({ x: 1, y: 1 });

            const x1 = Vector2Mutable.UnitX;
            expect(x1).toEqualVector2({ x: 1, y: 0 });
            x1.add(5);
            expect(x1).toEqualVector2({ x: 6, y: 5 });

            const x2 = Vector2Mutable.UnitX;
            expect(x2).toEqualVector2({ x: 1, y: 0 });

            const y1 = Vector2Mutable.UnitY;
            expect(y1).toEqualVector2({ x: 0, y: 1 });
            y1.add(5);
            expect(y1).toEqualVector2({ x: 5, y: 6 });

            const y2 = Vector2Mutable.UnitY;
            expect(y2).toEqualVector2({ x: 0, y: 1 });
        });
    });
});
