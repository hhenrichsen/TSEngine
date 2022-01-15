import Vector2 from "./Vector2";

export class Vector2Mutable extends Vector2 {
    /**
     * A constant zero vector.
     */
    static override get ZERO() {
        return new Vector2Mutable(0, 0);
    }

    /**
     * A constant one vector.
     */
    static override get ONES() {
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

    override normalize(): Vector2 {
        const magnitude = this.magnitude();
        if (magnitude == 0) return this;
        this._x /= magnitude;
        this._y /= magnitude;
        return this;
    }

    override piecewiseScale(scalar: Vector2): Vector2 {
        this._x *= scalar.x;
        this._y *= scalar.y;
        return this;
    }

    override scale(scalar: number): Vector2 {
        this._x *= scalar;
        this._y *= scalar;
        return this;
    }

    override add(other: Vector2): Vector2 {
        this._x += other.x;
        this._y += other.y;
        return this;
    }

    override addConstant(x: number, y: number): Vector2 {
        this._x += x;
        this._y += y;
        return this;
    }

    override floor(): Vector2 {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);
        return this;
    }

    override ceil(): Vector2 {
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
    override addScaled(other: Vector2, scalar: number): Vector2 {
        this._x += other.x * scalar;
        this._y += other.y * scalar;
        return this;
    }

    override subtract(other: Vector2): Vector2 {
        this._x -= other.x;
        this._y -= other.y;
        return this;
    }

    /**
     * Subtracts another vector from this vector, scaling the other by a given factor.
     *
     * @param other The other vector to subtract.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this - other * scalar.
     */
    override subtractScaled(other: Vector2, scalar: number): Vector2 {
        this._x -= other.x * scalar;
        this._y -= other.y * scalar;
        return this;
    }

    override rotateDegrees(degrees: number): Vector2 {
        const radians = (degrees * Math.PI) / 180;
        return this.rotateRadians(radians);
    }

    override rotateRadians(radians: number): Vector2 {
        this._x = this._x * Math.cos(radians) - Math.sin(radians) * this._y;
        this._y = this._x * Math.sin(radians) + this._y * Math.cos(radians);
        return this;
    }
}
