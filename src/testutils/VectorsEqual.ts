import { Vector2, Vector2Like } from "../util/math/Vector2";
import { Numbers } from "../util/Numbers";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface AsymmetricMatchers {
            toEqualVector2(expected: Vector2Like, range?: number): void;
        }
        interface Matchers<R> {
            toEqualVector2(expected: Vector2Like, range?: number): R;
        }
    }
}

expect.extend({
    toEqualVector2(actual: Vector2Like, expected: Vector2Like, range = 0.0001) {
        const passX = Numbers.isWithin(expected.x, actual.x, range);
        const passY = Numbers.isWithin(expected.y, actual.y, range);
        const pass = passX && passY;
        if (pass) {
            return {
                pass,
                message: () =>
                    `Expected ${this.utils.printReceived(
                        Vector2.toString(actual),
                    )} to not be equal to vector ${this.utils.printExpected(
                        `${Vector2.toString(
                            Vector2.add(expected, range),
                        )}-${Vector2.toString(
                            Vector2.subtract(expected, range),
                        )}`,
                    )}`,
            };
        } else {
            return {
                pass,
                message: () =>
                    `Expected ${this.utils.printReceived(
                        Vector2.toString(actual),
                    )} to not be equal to vector ${this.utils.printExpected(
                        `${Vector2.toString(
                            Vector2.add(expected, range),
                        )}-${Vector2.toString(
                            Vector2.subtract(expected, range),
                        )}`,
                    )}`,
            };
        }
    },
});

export {};
