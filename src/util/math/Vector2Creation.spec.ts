import { Numbers } from "../Numbers";
import { Vector2 } from "./Vector2";
import "../../testutils/WithinRange";

// NOTE(hhenrichsen): This was created in this file because some of these tests
// are pretty verbose. I think I can make them more concise, but I also want to
// prove that these work the way I want them to.
describe(module.id, () => {
    describe("constants and creation functions", () => {
        const RandomVectorCount = 1000;

        it("should have proper constants", () => {
            const zero = Vector2.Zero;
            expect(zero.x).toBe(0);
            expect(zero.y).toBe(0);

            const ones = Vector2.Ones;
            expect(ones.x).toBe(1);
            expect(ones.y).toBe(1);
        });

        const doBulkRandomTest = (
            generate: (
                upperX: number,
                lowerX: number,
                upperY: number,
                lowerY: number,
            ) => Vector2,
            upperX = 1,
            lowerX = 0,
            upperY: number = upperX,
            lowerY: number = lowerX,
        ) => {
            // Require a sufficiently large N for the law of large numbers
            expect(RandomVectorCount).toBeGreaterThan(30);
            const percentTolerance = 0.17;

            let sumX = 0;
            let sumY = 0;

            for (let trial = 0; trial < RandomVectorCount; trial++) {
                const vector = generate(upperX, lowerX, upperY, lowerY);

                expect(vector.x <= upperX && vector.x >= lowerX).toBeTruthy();
                expect(vector.y <= upperY && vector.y >= lowerY).toBeTruthy();

                sumX += vector.x;
                sumY += vector.y;
            }

            // By the law of large numbers, these should be true with a
            // sufficiently large N
            const rangeX = Numbers.distance(upperX, lowerX);
            const rangeY = Numbers.distance(upperY, lowerY);
            const toleranceX = rangeX * percentTolerance;
            const toleranceY = rangeY * percentTolerance;
            const expectedX = Numbers.mean(upperX, lowerX);
            const expectedY = Numbers.mean(upperY, lowerY);

            const meanX = sumX / RandomVectorCount;
            const meanY = sumY / RandomVectorCount;

            expect(meanX).toBeWithinRange(expectedX, toleranceX);
            expect(meanY).toBeWithinRange(expectedY, toleranceY);
        };

        it("random vectors by default should mirror Vector2#randomPositiveNormal with no args", () => {
            doBulkRandomTest(Vector2.random);
        });

        it("random vectors by default should be positive with args", () => {
            doBulkRandomTest(Vector2.random, 10);
        });

        it("random vectors with one set of bounds should fall within bounds", () => {
            doBulkRandomTest(Vector2.random, 10, -10);
        });

        it("random vectors with both sets of bounds should fall within bounds", () => {
            doBulkRandomTest(Vector2.random, 10, -10, 100, -100);
        });

        it("random normal vectors should have proper ranges", () => {
            doBulkRandomTest(Vector2.randomNormal, 1, -1);
        });

        it("random normal vectors should have proper ranges", () => {
            doBulkRandomTest(Vector2.randomPositiveNormal);
        });

        it("should create proper vectors from degrees", () => {
            const underflow_east = Vector2.fromAngleDegrees(-360);
            expect(underflow_east.x).toBeCloseTo(1);
            expect(underflow_east.y).toBeCloseTo(0);

            const underflow_north_east_east = Vector2.fromAngleDegrees(-330);
            expect(underflow_north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(underflow_north_east_east.y).toBeCloseTo(1 / 2);

            const underflow_north_east = Vector2.fromAngleDegrees(-315);
            expect(underflow_north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(underflow_north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const underflow_north_north_east = Vector2.fromAngleDegrees(-300);
            expect(underflow_north_north_east.x).toBeCloseTo(1 / 2);
            expect(underflow_north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const underflow_north = Vector2.fromAngleDegrees(-270);
            expect(underflow_north.x).toBeCloseTo(0);
            expect(underflow_north.y).toBeCloseTo(1);

            const underflow_north_north_west = Vector2.fromAngleDegrees(-240);
            expect(underflow_north_north_west.x).toBeCloseTo(-1 / 2);
            expect(underflow_north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const underflow_north_west = Vector2.fromAngleDegrees(-225);
            expect(underflow_north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(underflow_north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const underflow_north_west_west = Vector2.fromAngleDegrees(-210);
            expect(underflow_north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(underflow_north_west_west.y).toBeCloseTo(1 / 2);

            const underflow_west = Vector2.fromAngleDegrees(-180);
            expect(underflow_west.x).toBeCloseTo(-1);
            expect(underflow_west.y).toBeCloseTo(0);

            const underflow_south_west_west = Vector2.fromAngleDegrees(-150);
            expect(underflow_south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(underflow_south_west_west.y).toBeCloseTo(-1 / 2);

            const underflow_south_west = Vector2.fromAngleDegrees(-135);
            expect(underflow_south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(underflow_south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const underflow_south_south_west = Vector2.fromAngleDegrees(-120);
            expect(underflow_south_south_west.x).toBeCloseTo(-1 / 2);
            expect(underflow_south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const underflow_south = Vector2.fromAngleDegrees(-90);
            expect(underflow_south.x).toBeCloseTo(0);
            expect(underflow_south.y).toBeCloseTo(-1);

            const underflow_south_south_east = Vector2.fromAngleDegrees(-60);
            expect(underflow_south_south_east.x).toBeCloseTo(1 / 2);
            expect(underflow_south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const underflow_south_east = Vector2.fromAngleDegrees(-45);
            expect(underflow_south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(underflow_south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const underflow_south_east_east = Vector2.fromAngleDegrees(-30);
            expect(underflow_south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(underflow_south_east_east.y).toBeCloseTo(-1 / 2);

            const east = Vector2.fromAngleDegrees(0);
            expect(east.x).toBeCloseTo(1);
            expect(east.y).toBeCloseTo(0);

            const north_east_east = Vector2.fromAngleDegrees(30);
            expect(north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(north_east_east.y).toBeCloseTo(1 / 2);

            const north_east = Vector2.fromAngleDegrees(45);
            expect(north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const north_north_east = Vector2.fromAngleDegrees(60);
            expect(north_north_east.x).toBeCloseTo(1 / 2);
            expect(north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const north = Vector2.fromAngleDegrees(90);
            expect(north.x).toBeCloseTo(0);
            expect(north.y).toBeCloseTo(1);

            const north_north_west = Vector2.fromAngleDegrees(120);
            expect(north_north_west.x).toBeCloseTo(-1 / 2);
            expect(north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const north_west = Vector2.fromAngleDegrees(135);
            expect(north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const north_west_west = Vector2.fromAngleDegrees(150);
            expect(north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(north_west_west.y).toBeCloseTo(1 / 2);

            const west = Vector2.fromAngleDegrees(180);
            expect(west.x).toBeCloseTo(-1);
            expect(west.y).toBeCloseTo(0);

            const south_west_west = Vector2.fromAngleDegrees(210);
            expect(south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(south_west_west.y).toBeCloseTo(-1 / 2);

            const south_west = Vector2.fromAngleDegrees(225);
            expect(south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const south_south_west = Vector2.fromAngleDegrees(240);
            expect(south_south_west.x).toBeCloseTo(-1 / 2);
            expect(south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const south = Vector2.fromAngleDegrees(270);
            expect(south.x).toBeCloseTo(0);
            expect(south.y).toBeCloseTo(-1);

            const south_south_east = Vector2.fromAngleDegrees(300);
            expect(south_south_east.x).toBeCloseTo(1 / 2);
            expect(south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const south_east = Vector2.fromAngleDegrees(315);
            expect(south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const south_east_east = Vector2.fromAngleDegrees(330);
            expect(south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(south_east_east.y).toBeCloseTo(-1 / 2);

            const overflow_east = Vector2.fromAngleDegrees(360);
            expect(overflow_east.x).toBeCloseTo(1);
            expect(overflow_east.y).toBeCloseTo(0);

            const overflow_north_east_east = Vector2.fromAngleDegrees(390);
            expect(overflow_north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(overflow_north_east_east.y).toBeCloseTo(1 / 2);

            const overflow_north_east = Vector2.fromAngleDegrees(405);
            expect(overflow_north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(overflow_north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const overflow_north_north_east = Vector2.fromAngleDegrees(420);
            expect(overflow_north_north_east.x).toBeCloseTo(1 / 2);
            expect(overflow_north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const overflow_north = Vector2.fromAngleDegrees(450);
            expect(overflow_north.x).toBeCloseTo(0);
            expect(overflow_north.y).toBeCloseTo(1);

            const overflow_north_north_west = Vector2.fromAngleDegrees(480);
            expect(overflow_north_north_west.x).toBeCloseTo(-1 / 2);
            expect(overflow_north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const overflow_north_west = Vector2.fromAngleDegrees(495);
            expect(overflow_north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(overflow_north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const overflow_north_west_west = Vector2.fromAngleDegrees(510);
            expect(overflow_north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(overflow_north_west_west.y).toBeCloseTo(1 / 2);

            const overflow_west = Vector2.fromAngleDegrees(540);
            expect(overflow_west.x).toBeCloseTo(-1);
            expect(overflow_west.y).toBeCloseTo(0);

            const overflow_south_west_west = Vector2.fromAngleDegrees(570);
            expect(overflow_south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(overflow_south_west_west.y).toBeCloseTo(-1 / 2);

            const overflow_south_west = Vector2.fromAngleDegrees(585);
            expect(overflow_south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(overflow_south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const overflow_south_south_west = Vector2.fromAngleDegrees(600);
            expect(overflow_south_south_west.x).toBeCloseTo(-1 / 2);
            expect(overflow_south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const overflow_south = Vector2.fromAngleDegrees(630);
            expect(overflow_south.x).toBeCloseTo(0);
            expect(overflow_south.y).toBeCloseTo(-1);

            const overflow_south_south_east = Vector2.fromAngleDegrees(660);
            expect(overflow_south_south_east.x).toBeCloseTo(1 / 2);
            expect(overflow_south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const overflow_south_east = Vector2.fromAngleDegrees(675);
            expect(overflow_south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(overflow_south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const overflow_south_east_east = Vector2.fromAngleDegrees(690);
            expect(overflow_south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(overflow_south_east_east.y).toBeCloseTo(-1 / 2);
        });

        it("should create proper vectors from radians", () => {
            const underflow_east = Vector2.fromAngleRadians(-2 * Math.PI);
            expect(underflow_east.x).toBeCloseTo(1);
            expect(underflow_east.y).toBeCloseTo(0);

            const underflow_north_east_east = Vector2.fromAngleRadians(
                -Numbers.Constants.ElevenPiSixths,
            );
            expect(underflow_north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(underflow_north_east_east.y).toBeCloseTo(1 / 2);

            const underflow_north_east = Vector2.fromAngleRadians(
                -Numbers.Constants.SevenPiFourths,
            );
            expect(underflow_north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(underflow_north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const underflow_north_north_east = Vector2.fromAngleRadians(
                -Numbers.Constants.FivePiThirds,
            );
            expect(underflow_north_north_east.x).toBeCloseTo(1 / 2);
            expect(underflow_north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const underflow_north = Vector2.fromAngleRadians(
                -Numbers.Constants.ThreePiHalves,
            );
            expect(underflow_north.x).toBeCloseTo(0);
            expect(underflow_north.y).toBeCloseTo(1);

            const underflow_north_north_west = Vector2.fromAngleRadians(
                -Numbers.Constants.FourPiThirds,
            );
            expect(underflow_north_north_west.x).toBeCloseTo(-1 / 2);
            expect(underflow_north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const underflow_north_west = Vector2.fromAngleRadians(
                -Numbers.Constants.FivePiFourths,
            );
            expect(underflow_north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(underflow_north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const underflow_north_west_west = Vector2.fromAngleRadians(
                -Numbers.Constants.SevenPiSixths,
            );
            expect(underflow_north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(underflow_north_west_west.y).toBeCloseTo(1 / 2);

            const underflow_west = Vector2.fromAngleRadians(-Math.PI);
            expect(underflow_west.x).toBeCloseTo(-1);
            expect(underflow_west.y).toBeCloseTo(0);

            const underflow_south_west_west = Vector2.fromAngleRadians(
                -Numbers.Constants.FivePiSixths,
            );
            expect(underflow_south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(underflow_south_west_west.y).toBeCloseTo(-1 / 2);

            const underflow_south_west = Vector2.fromAngleRadians(
                -Numbers.Constants.ThreePiFourths,
            );
            expect(underflow_south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(underflow_south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const underflow_south_south_west = Vector2.fromAngleRadians(
                -Numbers.Constants.TwoPiThirds,
            );
            expect(underflow_south_south_west.x).toBeCloseTo(-1 / 2);
            expect(underflow_south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const underflow_south = Vector2.fromAngleRadians(
                -Numbers.Constants.PiHalves,
            );
            expect(underflow_south.x).toBeCloseTo(0);
            expect(underflow_south.y).toBeCloseTo(-1);

            const underflow_south_south_east = Vector2.fromAngleRadians(
                -Numbers.Constants.PiThirds,
            );
            expect(underflow_south_south_east.x).toBeCloseTo(1 / 2);
            expect(underflow_south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const underflow_south_east = Vector2.fromAngleRadians(
                -Numbers.Constants.PiFourths,
            );
            expect(underflow_south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(underflow_south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const underflow_south_east_east = Vector2.fromAngleRadians(
                -Numbers.Constants.PiSixths,
            );
            expect(underflow_south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(underflow_south_east_east.y).toBeCloseTo(-1 / 2);

            const east = Vector2.fromAngleRadians(0);
            expect(east.x).toBeCloseTo(1);
            expect(east.y).toBeCloseTo(0);

            const north_east_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiSixths,
            );
            expect(north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(north_east_east.y).toBeCloseTo(1 / 2);

            const north_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiFourths,
            );
            expect(north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const north_north_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiThirds,
            );
            expect(north_north_east.x).toBeCloseTo(1 / 2);
            expect(north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const north = Vector2.fromAngleRadians(Numbers.Constants.PiHalves);
            expect(north.x).toBeCloseTo(0);
            expect(north.y).toBeCloseTo(1);

            const north_north_west = Vector2.fromAngleRadians(
                Numbers.Constants.TwoPiThirds,
            );
            expect(north_north_west.x).toBeCloseTo(-1 / 2);
            expect(north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const north_west = Vector2.fromAngleRadians(
                Numbers.Constants.ThreePiFourths,
            );
            expect(north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const north_west_west = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiSixths,
            );
            expect(north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(north_west_west.y).toBeCloseTo(1 / 2);

            const west = Vector2.fromAngleRadians(Math.PI);
            expect(west.x).toBeCloseTo(-1);
            expect(west.y).toBeCloseTo(0);

            const south_west_west = Vector2.fromAngleRadians(
                Numbers.Constants.SevenPiSixths,
            );
            expect(south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(south_west_west.y).toBeCloseTo(-1 / 2);

            const south_west = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiFourths,
            );
            expect(south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const south_south_west = Vector2.fromAngleRadians(
                Numbers.Constants.FourPiThirds,
            );
            expect(south_south_west.x).toBeCloseTo(-1 / 2);
            expect(south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const south = Vector2.fromAngleRadians(
                Numbers.Constants.ThreePiHalves,
            );
            expect(south.x).toBeCloseTo(0);
            expect(south.y).toBeCloseTo(-1);

            const south_south_east = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiThirds,
            );
            expect(south_south_east.x).toBeCloseTo(1 / 2);
            expect(south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const south_east = Vector2.fromAngleRadians(
                Numbers.Constants.SevenPiFourths,
            );
            expect(south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const south_east_east = Vector2.fromAngleRadians(
                Numbers.Constants.ElevenPiSixths,
            );
            expect(south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(south_east_east.y).toBeCloseTo(-1 / 2);

            const overflow_east = Vector2.fromAngleRadians(0 + Math.PI * 2);
            expect(overflow_east.x).toBeCloseTo(1);
            expect(overflow_east.y).toBeCloseTo(0);

            const overflow_north_east_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiSixths + Math.PI * 2,
            );
            expect(overflow_north_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(overflow_north_east_east.y).toBeCloseTo(1 / 2);

            const overflow_north_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiFourths + Math.PI * 2,
            );
            expect(overflow_north_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(overflow_north_east.y).toBeCloseTo(Math.sqrt(2) / 2);

            const overflow_north_north_east = Vector2.fromAngleRadians(
                Numbers.Constants.PiThirds + Math.PI * 2,
            );
            expect(overflow_north_north_east.x).toBeCloseTo(1 / 2);
            expect(overflow_north_north_east.y).toBeCloseTo(Math.sqrt(3) / 2);

            const overflow_north = Vector2.fromAngleRadians(
                Numbers.Constants.PiHalves + Math.PI * 2,
            );
            expect(overflow_north.x).toBeCloseTo(0);
            expect(overflow_north.y).toBeCloseTo(1);

            const overflow_north_north_west = Vector2.fromAngleRadians(
                Numbers.Constants.TwoPiThirds + Math.PI * 2,
            );
            expect(overflow_north_north_west.x).toBeCloseTo(-1 / 2);
            expect(overflow_north_north_west.y).toBeCloseTo(Math.sqrt(3) / 2);

            const overflow_north_west = Vector2.fromAngleRadians(
                Numbers.Constants.ThreePiFourths + Math.PI * 2,
            );
            expect(overflow_north_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(overflow_north_west.y).toBeCloseTo(Math.sqrt(2) / 2);

            const overflow_north_west_west = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiSixths + Math.PI * 2,
            );
            expect(overflow_north_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(overflow_north_west_west.y).toBeCloseTo(1 / 2);

            const overflow_west = Vector2.fromAngleRadians(Math.PI * 3);
            expect(overflow_west.x).toBeCloseTo(-1);
            expect(overflow_west.y).toBeCloseTo(0);

            const overflow_south_west_west = Vector2.fromAngleRadians(
                Numbers.Constants.SevenPiSixths + Math.PI * 2,
            );
            expect(overflow_south_west_west.x).toBeCloseTo(-Math.sqrt(3) / 2);
            expect(overflow_south_west_west.y).toBeCloseTo(-1 / 2);

            const overflow_south_west = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiFourths + Math.PI * 2,
            );
            expect(overflow_south_west.x).toBeCloseTo(-Math.sqrt(2) / 2);
            expect(overflow_south_west.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const overflow_south_south_west = Vector2.fromAngleRadians(
                Numbers.Constants.FourPiThirds + Math.PI * 2,
            );
            expect(overflow_south_south_west.x).toBeCloseTo(-1 / 2);
            expect(overflow_south_south_west.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const overflow_south = Vector2.fromAngleRadians(
                Numbers.Constants.ThreePiHalves + Math.PI * 2,
            );
            expect(overflow_south.x).toBeCloseTo(0);
            expect(overflow_south.y).toBeCloseTo(-1);

            const overflow_south_south_east = Vector2.fromAngleRadians(
                Numbers.Constants.FivePiThirds + Math.PI * 2,
            );
            expect(overflow_south_south_east.x).toBeCloseTo(1 / 2);
            expect(overflow_south_south_east.y).toBeCloseTo(-Math.sqrt(3) / 2);

            const overflow_south_east = Vector2.fromAngleRadians(
                Numbers.Constants.SevenPiFourths + Math.PI * 2,
            );
            expect(overflow_south_east.x).toBeCloseTo(Math.sqrt(2) / 2);
            expect(overflow_south_east.y).toBeCloseTo(-Math.sqrt(2) / 2);

            const overflow_south_east_east = Vector2.fromAngleRadians(
                Numbers.Constants.ElevenPiSixths + Math.PI * 2,
            );
            expect(overflow_south_east_east.x).toBeCloseTo(Math.sqrt(3) / 2);
            expect(overflow_south_east_east.y).toBeCloseTo(-1 / 2);
        });

        it("should create proper vectors from matching numbers", () => {
            expect(Vector2.matching(0)).toEqual(Vector2.Zero);
            expect(Vector2.matching(1)).toEqual(Vector2.Ones);
        });
    });
});
