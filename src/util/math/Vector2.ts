import { Numbers } from "../Numbers";
import { isNumber } from "../PrimitiveTypeguards";
import { Equatable } from "../types/Equatable";
import { Hashable } from "../types/Hashable";
import { Representable } from "../types/Representable";
import { objectValidator } from "../Validators";

export interface Vector2Like {
    x: number;
    y: number;
}

export interface Vector2Operatable<T extends Vector2Like> extends Vector2Like {
    normalize(): T;

    squareMagnitude(): number;
    magnitude(): number;
    determinant(other: Vector2Like): number;

    distance(other: Vector2Like): number;
    squareDistance(other: Vector2Like): number;

    scale(constant: number): T;
    scale(x: number, y: number): T;
    scale(vector: Vector2Like): T;

    add(constant: number): T;
    add(x: number, y: number): T;
    add(vector: Vector2Like): T;
    addScaled(other: Vector2Like, scalar: number): T;

    subtract(constant: number): T;
    subtract(x: number, y: number): T;
    subtract(vector: Vector2Like): T;
    subtractScaled(other: Vector2Like, scalar: number): T;

    floor(): T;
    ceil(): T;

    rotateDegrees(degrees: number): T;
    rotateRadians(radians: number): T;
    toAngleRadians(): number;
    toAngleDegrees(): number;

    isNear(other: Vector2Like, threshold?: number): boolean;

    equals(other: unknown): boolean;
    toString(): string;
    hashCode(): number;

    [Symbol.iterator]();
}

/**
 * Immutable Vector2 class.
 */
export class Vector2
    implements
        Vector2Like,
        Vector2Operatable<Vector2>,
        Hashable,
        Representable,
        Equatable<Vector2Like>
{
    public static isVectorLike = objectValidator({
        x: isNumber,
        y: isNumber,
    });

    /**
     * A constant zero vector.
     */
    public static Zero: Vector2 = new Vector2(0, 0);

    public static UnitX: Vector2 = new Vector2(1, 0);

    public static UnitY: Vector2 = new Vector2(0, 1);
    /**
     * A constant one vector.
     */
    public static Ones: Vector2 = new Vector2(1, 1);

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
    static fromAngleDegrees(angle: number, scalar?: number): Vector2 {
        return new Vector2(
            Math.cos(Numbers.degreesToRadians(angle)) * (scalar || 1),
            Math.sin(Numbers.degreesToRadians(angle)) * (scalar || 1),
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

    public static scale(target: Vector2Like, constant: number): Vector2;
    public static scale(target: Vector2Like, x: number, y: number): Vector2;
    public static scale(target: Vector2Like, vector: Vector2Like): Vector2;
    public static scale(
        target: Vector2Like,
        value: number | Vector2Like,
        other?: number,
    ): Vector2 {
        if (!isNumber(value)) {
            return new Vector2(target.x * value.x, target.y * value.y);
        }
        return new Vector2(target.x * value, target.y * (other ?? value));
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
        return new Vector2(target.x + value, target.y + (other ?? value));
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

    public static subtract(target: Vector2Like, constant: number): Vector2;
    public static subtract(target: Vector2Like, x: number, y: number): Vector2;
    public static subtract(target: Vector2Like, vector: Vector2Like): Vector2;
    public static subtract(
        target: Vector2Like,
        value: Vector2Like | number,
        other?: number,
    ): Vector2 {
        if (!isNumber(value)) {
            return new Vector2(target.x - value.x, target.y - value.y);
        }
        return new Vector2(target.x - value, target.y - (other ?? value));
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

    public static floor(target: Vector2Like): Vector2 {
        return new Vector2(Math.floor(target.x), Math.floor(target.y));
    }

    public static ceil(target: Vector2Like): Vector2 {
        return new Vector2(Math.ceil(target.x), Math.ceil(target.y));
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
        if (Vector2.isVectorLike(other)) {
            return (
                Math.abs(other.x - target.x) <= threshold &&
                Math.abs(other.y - target.y) <= threshold
            );
        }
        return false;
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
            Math.abs(target.x - other.x) <= threshold &&
            Math.abs(target.y - other.y) <= threshold
        );
    }

    public distance(other: Vector2Like): number {
        return Vector2.distance(this, other);
    }

    squareDistance(other: Vector2Like): number {
        return Vector2.squareDistance(this, other);
    }

    public squareMagnitude(): number {
        return Vector2.squareMagnitude(this);
    }

    public magnitude(): number {
        return Vector2.magnitude(this);
    }

    public normalize(): Vector2 {
        return Vector2.normalize(this);
    }

    public scale(constant: number): Vector2;
    public scale(x: number, y: number): Vector2;
    public scale(vector: Vector2Like): Vector2;
    public scale(value: number | Vector2Like, other?: number): Vector2 {
        if (!isNumber(value)) {
            return Vector2.scale(this, value);
        }
        return Vector2.scale(this, value, other);
    }

    public add(constant: number): Vector2;
    public add(x: number, y: number): Vector2;
    public add(vector: Vector2Like): Vector2;
    public add(value: number | Vector2Like, other?: number): Vector2 {
        if (!isNumber(value)) {
            return Vector2.add(this, value);
        }
        return Vector2.add(this, value, other);
    }

    public floor(): Vector2 {
        return Vector2.floor(this);
    }

    public ceil(): Vector2 {
        return Vector2.ceil(this);
    }

    /**
     * Adds another vector to this vector, scaling the other by a given factor.
     *
     * @param other The other vector to add.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this + other * scalar.
     */
    public addScaled(other: Vector2Like, scalar: number): Vector2 {
        return Vector2.addScaled(this, other, scalar);
    }

    public subtract(constant: number): Vector2;
    public subtract(x: number, y: number): Vector2;
    public subtract(vector: Vector2Like): Vector2;
    public subtract(value: number | Vector2Like, other?: number): Vector2 {
        if (!isNumber(value)) {
            return Vector2.subtract(this, value);
        }
        return Vector2.subtract(this, value, other ?? value);
    }

    /**
     * Subtracts another vector from this vector, scaling the other by a given
     * factor.
     *
     * @param other The other vector to subtract.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this - other * scalar.
     */
    public subtractScaled(other: Vector2Like, scalar: number): Vector2 {
        return Vector2.subtractScaled(this, other, scalar);
    }

    public rotateDegrees(degrees: number): Vector2 {
        return Vector2.rotateDegrees(this, degrees);
    }

    public rotateRadians(radians: number): Vector2 {
        return Vector2.rotateRadians(this, radians);
    }

    public toAngleRadians(): number {
        return Vector2.toAngleRadians(this);
    }

    public toAngleDegrees(): number {
        return Vector2.toAngleDegrees(this);
    }

    public determinant(other: Vector2Like): number {
        return Vector2.determinant(this, other);
    }

    public isNear(other: Vector2Like, threshold = 0.0001): boolean {
        return Vector2.isNear(this, other, threshold);
    }

    public [Symbol.iterator]() {
        return [this._x, this._y][Symbol.iterator]();
    }

    toString(): string {
        return Vector2.toString(this);
    }

    hashCode(): number {
        return Vector2.hashCode(this);
    }

    equals(other: unknown): boolean {
        return Vector2.equals(this, other);
    }
}

export type Point = Vector2;
