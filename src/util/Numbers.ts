export class Numbers {
    public static readonly Constants = {
        PiSixths: Math.PI / 6,
        PiThirds: Math.PI / 3,
        PiFourths: Math.PI / 4,
        PiHalves: Math.PI / 2,
        TwoPiThirds: (2 * Math.PI) / 3,
        ThreePiFourths: (3 * Math.PI) / 4,
        FivePiSixths: (5 * Math.PI) / 6,

        SevenPiSixths: (7 * Math.PI) / 6,
        FivePiFourths: (5 * Math.PI) / 4,
        FourPiThirds: (4 * Math.PI) / 3,
        ThreePiHalves: (3 * Math.PI) / 2,
        FivePiThirds: (5 * Math.PI) / 3,
        SevenPiFourths: (7 * Math.PI) / 4,
        ElevenPiSixths: (11 * Math.PI) / 6,
    } as const;

    public static distance(a: number, b: number): number {
        return Math.abs(a - b);
    }

    public static sum(...values: number[]): number {
        return values.reduce((total, current) => total + current, 0);
    }

    public static product(...values: number[]): number {
        return values.reduce((total, current) => total * current, 1);
    }

    public static mean(...values: number[]): number {
        return Numbers.sum(...values) / values.length;
    }

    public static isWithin(expected: number, actual: number, range: number) {
        return Numbers.distance(expected, actual) <= range;
    }

    public static normalize(
        value: number,
        oldMin: number,
        oldMax: number,
        newMin: number,
        newMax: number,
    ): number {
        if (oldMin == oldMax || newMin == newMax) {
            return 0;
        }
        return (
            ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin
        );
    }

    /**
     * Similar to JavaScript's `%` operator, but only returns a positive result.
     *
     * @returns A positive number equivalent to the dividend mod the divisor.
     */
    public static unsignedMod(dividend: number, divisor: number): number {
        return ((dividend % divisor) + divisor) % divisor;
    }

    public static radiansToDegrees(value: number): number {
        return (value * 180) / Math.PI;
    }

    public static degreesToRadians(value: number): number {
        return (value * Math.PI) / 180;
    }

    /**
     * Converts degrees to radians, disallowing overflow.
     */
    public static degreesToRadiansClamped(value: number): number {
        return this.unsignedMod(this.degreesToRadians(value), Math.PI * 2);
    }

    /**
     * Converts radians to degrees, disallowing overflow.
     */
    public static radiansToDegreesClamped(value: number): number {
        return this.unsignedMod(this.radiansToDegrees(value), 360);
    }

    public static clamp(value: number, min: number, max: number): number {
        return min > max ? NaN : Math.max(min, Math.min(max, value));
    }
}
