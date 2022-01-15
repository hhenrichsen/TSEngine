/**
 * Immutable Vector2 class.
 */
export class Vector2 {
    /**
     * A constant zero vector.
     */
    static ZERO: Vector2 = new Vector2(0, 0);

    /**
     * A constant one vector.
     */
    static ONES: Vector2 = new Vector2(1, 1);

    protected _x = 0;
    protected _y = 0;

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

    /**
     * @returns A normalized random vector in Quadrant 1.
     */
    static random(): Vector2 {
        return new Vector2(Math.random(), Math.random()).normalize();
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
    public static distance(pos1: Vector2, pos2: Vector2): number {
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
    public static squareDistance(pos1: Vector2, pos2: Vector2): number {
        return Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    squareMagnitude(): number {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }

    magnitude(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize(): Vector2 {
        const magnitude = this.magnitude();
        if (magnitude == 0) {
            return Vector2.ZERO;
        }
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }

    piecewiseScale(scalar: Vector2): Vector2 {
        return new Vector2(this.x * scalar.x, this.y * scalar.y);
    }

    scale(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    addConstant(x: number, y: number): Vector2 {
        return new Vector2(this.x + x, this.y + y);
    }

    floor(): Vector2 {
        return new Vector2(Math.floor(this.x), Math.floor(this.y));
    }

    ceil(): Vector2 {
        return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
    }

    /**
     * Adds another vector to this vector, scaling the other by a given factor.
     *
     * @param other The other vector to add.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this + other * scalar.
     */
    addScaled(other: Vector2, scalar: number): Vector2 {
        return new Vector2(
            this.x + other.x * scalar,
            this.y + other.y * scalar,
        );
    }

    subtract(other: Vector2): Vector2 {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    /**
     * Subtracts another vector from this vector, scaling the other by a given factor.
     *
     * @param other The other vector to subtract.
     * @param scalar The amount to scale the other vector by.
     * @returns The resulting vector of this - other * scalar.
     */
    subtractScaled(other: Vector2, scalar: number): Vector2 {
        return new Vector2(
            this.x - other.x * scalar,
            this.y - other.y * scalar,
        );
    }

    rotateDegrees(degrees: number): Vector2 {
        const radians = (degrees * Math.PI) / 180;
        return this.rotateRadians(radians);
    }

    rotateRadians(radians: number): Vector2 {
        return new Vector2(
            this.x * Math.cos(radians) - Math.sin(radians) * this.y,
            this.x * Math.sin(radians) + this.y * Math.cos(radians),
        );
    }

    toAngle(): number {
        return Math.atan2(this.y, this.x) * (180 / Math.PI);
    }

    determinant(other: Vector2): number {
        return this.x * other.y - this.y * other.x;
    }

    toString(): string {
        return `${this.x},${this.y}`;
    }

    public equals(other: unknown, threshold = 0): boolean {
        return (
            other !== undefined &&
            typeof other === "object" &&
            Object.prototype.hasOwnProperty.call(other, "_x") &&
            Object.prototype.hasOwnProperty.call(other, "_y") &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore We literally test for it above
            Math.abs(other.x - this.x) <= threshold &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore We literally test for it above
            Math.abs(other.y - this.y) <= threshold
        );
    }

    public hashCode(): number {
        return 31 * this.x + this.y;
    }
}

export default Vector2;
