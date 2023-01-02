import { Numbers } from "../util/Numbers";

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface AsymmetricMatchers {
            toBeWithinRange(expected: number, range: number): void;
        }
        interface Matchers<R> {
            toBeWithinRange(expected: number, range: number): R;
        }
    }
}

expect.extend({
    toBeWithinRange(actual, expected, range) {
        const pass = Numbers.isWithin(expected, actual, range);
        if (pass) {
            return {
                pass,
                message: () =>
                    `Expected ${this.utils.printReceived(
                        actual,
                    )} to not be within ${this.utils.printExpected(
                        `${expected - range}-${expected + range}`,
                    )}`,
            };
        } else {
            return {
                pass,
                message: () =>
                    `Expected ${this.utils.printReceived(
                        actual,
                    )} to be within ${this.utils.printExpected(
                        `${expected - range}-${expected + range}`,
                    )}`,
            };
        }
    },
});

export {};
