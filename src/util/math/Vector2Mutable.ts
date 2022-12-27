import { Equatable } from "../types/Equatable";
import { Hashable } from "../types/Hashable";
import { Representable } from "../types/Representable";
import Vector2, { Vector2Like } from "./Vector2";

export class Vector2Mutable
    extends Vector2
    implements Representable, Hashable, Equatable<Vector2Like>
{
    /**
     * A constant zero vector.
     */
    static override get Zero() {
        return new Vector2Mutable(0, 0);
    }

    /**
     * A constant one vector.
     */
    static override get Ones() {
        return new Vector2Mutable(1, 1);
    }

    public override set x(value: number) {
        this._x = value;
    }

    public override get x(): number {
        return this._x;
    }

    public override set y(value: number) {
        this._y = value;
    }

    public override get y(): number {
        return this._y;
    }

    normalize(): Vector2Mutable {
        const magnitude = Vector2.magnitude(this);
        if (magnitude == 0) return this;
        this._x /= magnitude;
        this._y /= magnitude;
        return this;
    }

    piecewiseScale(scalar: Vector2Like): Vector2Mutable {
        this._x *= scalar.x;
        this._y *= scalar.y;
        return this;
    }

    scale(scalar: number): Vector2Mutable {
        this._x *= scalar;
        this._y *= scalar;
        return this;
    }

    add(other: Vector2): Vector2Mutable {
        this._x += other.x;
        this._y += other.y;
        return this;
    }

    addConstant(x: number, y: number): Vector2Mutable {
        this._x += x;
        this._y += y;
        return this;
    }

    floor(): Vector2Mutable {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
        return this;
    }

    ceil(): Vector2Mutable {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
        return this;
    }

    /**
     * Adds another vector to this vector, scaling the other by a given factor.
     *
     * @param other The other vector to add.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this + other * scalar.
     */
    addScaled(other: Vector2Like, scalar: number): Vector2Mutable {
        this._x += other.x * scalar;
        this._y += other.y * scalar;
        return this;
    }

    subtract(other: Vector2): Vector2Mutable {
        this._x -= other.x;
        this._y -= other.y;
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
    subtractScaled(other: Vector2Like, scalar: number): Vector2Mutable {
        this._x -= other.x * scalar;
        this._y -= other.y * scalar;
        return this;
    }

    rotateDegrees(degrees: number): Vector2Mutable {
        const radians = (degrees * Math.PI) / 180;
        return this.rotateRadians(radians);
    }

    rotateRadians(radians: number): Vector2Mutable {
        this._x = this._x * Math.cos(radians) - Math.sin(radians) * this._y;
        this._y = this._x * Math.sin(radians) + this._y * Math.cos(radians);
        return this;
    }
}
