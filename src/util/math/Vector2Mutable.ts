import { Equatable } from "../types/Equatable";
import { Hashable } from "../types/Hashable";
import { Representable } from "../types/Representable";
import { Vector2, Vector2Like, Vector2Operatable } from "./Vector2";
import { isNumber } from "../PrimitiveTypeguards";

export class Vector2Mutable
    implements
        Representable,
        Hashable,
        Equatable<Vector2Like>,
        Vector2Like,
        Vector2Operatable<Vector2Mutable>
{
    /**
     * A constant zero vector.
     */
    static get Zero() {
        return new Vector2Mutable(0, 0);
    }

    static get UnitX() {
        return new Vector2Mutable(1, 0);
    }

    static get UnitY() {
        return new Vector2Mutable(0, 1);
    }

    /**
     * A constant one vector.
     */
    static get Ones() {
        return new Vector2Mutable(1, 1);
    }

    constructor(public x: number, public y: number) {}

    public normalize(): Vector2Mutable {
        const magnitude = Vector2.magnitude(this);
        if (magnitude == 0) return this;
        this.x /= magnitude;
        this.y /= magnitude;
        return this;
    }

    squareMagnitude(): number {
        return Vector2.squareMagnitude(this);
    }

    magnitude(): number {
        return Vector2.magnitude(this);
    }

    squareDistance(other: Vector2Like): number {
        return Vector2.squareDistance(this, other);
    }

    determinant(other: Vector2Like): number {
        return Vector2.determinant(this, other);
    }

    distance(other: Vector2Like): number {
        return Vector2.distance(this, other);
    }

    public scale(constant: number): Vector2Mutable;
    public scale(x: number, y: number): Vector2Mutable;
    public scale(vector: Vector2Like): Vector2Mutable;
    public scale(value: number | Vector2Like, other?: number): Vector2Mutable {
        if (!isNumber(value)) {
            this.x *= value.x;
            this.y *= value.y;
            return this;
        }
        this.x *= value;
        this.y *= other ?? value;
        return this;
    }

    public add(constant: number): Vector2Mutable;
    public add(x: number, y: number): Vector2Mutable;
    public add(vector: Vector2Like): Vector2Mutable;
    public add(value: number | Vector2Like, other?: number): Vector2Mutable {
        if (!isNumber(value)) {
            this.x += value.x;
            this.y += value.y;
            return this;
        }
        this.x += value;
        this.y += other ?? value;
        return this;
    }

    /**
     * Adds another vector to this vector, scaling the other by a given factor.
     *
     * @param other The other vector to add.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this + other * scalar.
     */
    public addScaled(other: Vector2Like, scalar: number): Vector2Mutable {
        this.x += other.x * scalar;
        this.y += other.y * scalar;
        return this;
    }

    public subtract(constant: number): Vector2Mutable;
    public subtract(x: number, y: number): Vector2Mutable;
    public subtract(vector: Vector2Like): Vector2Mutable;
    public subtract(
        value: Vector2Like | number,
        other?: number,
    ): Vector2Mutable {
        if (!isNumber(value)) {
            this.x -= value.x;
            this.y -= value.y;
            return this;
        }
        this.x -= value;
        this.y -= other ?? value;
        return this;
    }

    /**
     * Subtracts another vector from this vector, scaling the other by a given
     * factor.
     *
     * @param other The other vector to subtract.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this - other * scalar.
     */
    public subtractScaled(other: Vector2Like, scalar: number): Vector2Mutable {
        this.x -= other.x * scalar;
        this.y -= other.y * scalar;
        return this;
    }

    public floor(): Vector2Mutable {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }

    public ceil(): Vector2Mutable {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }

    public rotateDegrees(degrees: number): Vector2Mutable {
        const radians = (degrees * Math.PI) / 180;
        return this.rotateRadians(radians);
    }

    public rotateRadians(radians: number): Vector2Mutable {
        const { x, y } = this; // preserve original values
        this.x = x * Math.cos(radians) - Math.sin(radians) * y;
        this.y = x * Math.sin(radians) + y * Math.cos(radians);
        return this;
    }

    public [Symbol.iterator]() {
        return [this.x, this.y][Symbol.iterator]();
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

    isNear(other: Vector2Like, threshold?: number): boolean {
        return Vector2.isNear(this, other, threshold);
    }

    toAngleDegrees(): number {
        return Vector2.toAngleDegrees(this);
    }

    toAngleRadians(): number {
        return Vector2.toAngleRadians(this);
    }
}
