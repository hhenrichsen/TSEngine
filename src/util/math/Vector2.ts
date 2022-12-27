import { isNumber } from "../PrimitiveTypeguards";
import { Equatable } from "../types/Equatable";
import { Hashable, Hasher } from "../types/Hashable";
import { Representable, Representer } from "../types/Representable";

export interface Vector2Like {
    x: number;
    y: number;
}

/**
 * Immutable Vector2 class.
 */
export class Vector2
    implements Vector2Like, Hashable, Representable, Equatable<Vector2Like>
{
    /**
     * A constant zero vector.
     */
    static Zero: Vector2 = new Vector2(0, 0);

    /**
     * A constant one vector.
     */
    static Ones: Vector2 = new Vector2(1, 1);

    protected _x = 0;
    protected _y = 0;

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    /**
     * Initializes a vector with X and Y components.
     *
     * @param x The X component.
     * @param y The Y component.
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    static random(
        maxX = 1,
        minX = 0,
        maxY: number = maxX,
        minY: number = minX,
    ): Vector2 {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);
        return new Vector2(x, y);
    }

    /**
     * @returns A normalized random vector.
     */
    static randomNormal(): Vector2 {
        return Vector2.normalize({
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1,
        });
    }

    /**
     * @returns A normalized random vector in Quadrant 1.
     */
    static randomPositiveNormal(): Vector2 {
        return Vector2.normalize({ x: Math.random(), y: Math.random() });
    }

    /**
     * @param angle The angle to create the vector from, in degrees.
     * @returns A unit vector pointing towards the given angle.
     */
    static fromAngle(angle: number, scalar?: number): Vector2 {
        return new Vector2(
            Math.cos(angle * (Math.PI / 180)) * (scalar || 1),
            Math.sin(angle * (Math.PI / 180)) * (scalar || 1),
        );
    }

    /**
     * @param angle The angle to create the vector from, in radians.
     * @returns A unit vector pointing towards the given angle.
     */
    static fromAngleRadians(angle: number, scalar?: number): Vector2 {
        return new Vector2(
            Math.cos(angle) * (scalar || 1),
            Math.sin(angle) * (scalar || 1),
        );
    }

    /**
     * @param number The number to put into both components of the vector.
     * @returns A vector with both components equal to number.
     */
    static matching(number: number): Vector2 {
        return new Vector2(number, number);
    }

    /**
     * Finds the distance between two Vector2s.
     *
     * @param pos1 The first point.
     * @param pos2 The second point.
     * @returns The distance between the two points.
     */
    public static distance(pos1: Vector2Like, pos2: Vector2Like): number {
        return Math.sqrt(
            Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2),
        );
    }

    /**
     * Finds the square distance between two Vector2s. Tends to be faster than
     * {@link Vector2#distance}.
     *
     * @param pos1 The first point.
     * @param pos2 The second point.
     * @returns The distance between the two points.
     */
    public static squareDistance(pos1: Vector2Like, pos2: Vector2Like): number {
        return Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    public static squareMagnitude(target: Vector2Like): number {
        return Math.pow(target.x, 2) + Math.pow(target.y, 2);
    }

    public static magnitude(target: Vector2Like): number {
        return Math.sqrt(Math.pow(target.x, 2) + Math.pow(target.y, 2));
    }

    public static normalize(target: Vector2Like): Vector2 {
        const magnitude = Vector2.magnitude(target);
        if (magnitude == 0) {
            return Vector2.Zero;
        }
        return new Vector2(target.x / magnitude, target.y / magnitude);
    }

    public static scale(
        target: Vector2Like,
        scalar: number | Vector2Like,
    ): Vector2 {
        if (isNumber(scalar)) {
            return new Vector2(target.x * scalar, target.y * scalar);
        }
        return new Vector2(target.x * scalar.x, target.y * scalar.y);
    }

    public static add(target: Vector2Like, constant: number): Vector2;
    public static add(target: Vector2Like, x: number, y: number): Vector2;
    public static add(target: Vector2Like, vector: Vector2Like): Vector2;
    public static add(
        target: Vector2Like,
        value: number | Vector2Like,
        other?: number,
    ): Vector2 {
        if (!isNumber(value)) {
            return new Vector2(target.x + value.x, target.y + value.y);
        }
        return new Vector2(target.x + value, target.y + other ?? value);
    }

    public static floor(target: Vector2Like): Vector2 {
        return new Vector2(Math.floor(target.x), Math.floor(target.y));
    }

    public static ceil(target: Vector2Like): Vector2 {
        return new Vector2(Math.ceil(target.x), Math.ceil(target.y));
    }

    /**
     * Adds another vector to this vector, scaling the other by a given factor.
     *
     * @param other The other vector to add.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this + other * scalar.
     */
    public static addScaled(
        target: Vector2Like,
        other: Vector2Like,
        scalar: number,
    ): Vector2 {
        return new Vector2(
            target.x + other.x * scalar,
            target.y + other.y * scalar,
        );
    }

    public static subtract(target: Vector2Like, other: Vector2Like): Vector2 {
        return new Vector2(target.x - other.x, target.y - other.y);
    }

    /**
     * Subtracts another vector from this vector, scaling the other by a given
     * factor.
     *
     * @param other The other vector to subtract.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this - other * scalar.
     */
    public static subtractScaled(
        target: Vector2Like,
        other: Vector2Like,
        scalar: number,
    ): Vector2 {
        return new Vector2(
            target.x - other.x * scalar,
            target.y - other.y * scalar,
        );
    }

    public static rotateDegrees(target: Vector2Like, degrees: number): Vector2 {
        const radians = (degrees * Math.PI) / 180;
        return Vector2.rotateRadians(target, radians);
    }

    public static rotateRadians(target: Vector2Like, radians: number): Vector2 {
        return new Vector2(
            target.x * Math.cos(radians) - Math.sin(radians) * target.y,
            target.x * Math.sin(radians) + target.y * Math.cos(radians),
        );
    }

    public static toAngleRadians(target: Vector2Like): number {
        return Math.atan2(target.y, target.x);
    }

    public static toAngleDegrees(target: Vector2Like): number {
        return Math.atan2(target.y, target.x) * (180 / Math.PI);
    }

    public static determinant(target: Vector2Like, other: Vector2Like): number {
        return target.x * other.y - target.y * other.x;
    }

    public static toString(target: Vector2Like): string {
        return `<${target.x}, ${target.y}>`;
    }

    public static equals(
        target: Vector2Like,
        other: unknown,
        threshold = 0,
    ): boolean {
        return (
            other !== undefined &&
            typeof other === "object" &&
            // TODO(hhenrichsen): Fix with validators
            Object.prototype.hasOwnProperty.call(other, "_x") &&
            Object.prototype.hasOwnProperty.call(other, "_y") &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore We literally test for it above
            Math.abs(other.x - target.x) <= threshold &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore We literally test for it above
            Math.abs(other.y - target.y) <= threshold
        );
    }

    public static hashCode(target: Vector2Like): number {
        return 31 * target.x + target.y;
    }

    public static isNear(
        target: Vector2Like,
        other: Vector2Like,
        threshold = 0.0001,
    ): boolean {
        return (
            Math.abs(target.x - other.x) < threshold &&
            Math.abs(target.y - other.y) < threshold
        );
    }

    public [Symbol.iterator]() {
        let first = true;
        return {
            next: () => {
                const res = {
                    value: first ? this._x : this._y,
                    done: !first,
                };
                first = false;
                return res;
            },
        };
    }

    toString(): string {
        return Vector2.toString(this);
    }

    hashCode(): number {
        return Vector2.hashCode(this);
    }

    equals(other: Vector2Like): boolean {
        return this.x === other.x && this.y === other.y;
    }
}

export const hashVector: Hasher<Vector2Like> = Vector2.hashCode;
export const representVector: Representer<Vector2Like> = Vector2.toString;

export default Vector2;
