import { Arrays } from "./Arrays";

export function expectEachToBe<T, R>(
    fn: (value: T) => R,
    inputs: T[],
    expectedValues: R | R[]
) {
    const outputs = expectedValues instanceof Array ? expectedValues : Arrays.init(inputs.length, () => expectedValues);
    const pairs = Arrays.zipTruncated(inputs, outputs);

    pairs.forEach(([input, output]) => {
        expect(fn(input)).withContext(
            `${fn.name}(${JSON.stringify(input)}) should be ${output}`,
        ).toBe(output);
    });
}

export function expectEachToEqual<T, R>(
    fn: (value: T) => R,
    inputs: T[],
    expectedValues: R | R[]
) {
    const outputs = expectedValues instanceof Array ? expectedValues : Arrays.init(inputs.length, () => expectedValues);
    const pairs = Arrays.zipTruncated(inputs, outputs);

    pairs.forEach(([input, output]) => {
        expect(fn(input)).withContext(
            `${fn.name}(${JSON.stringify(input)}) should equal ${output}`,
        ).toEqual(output);
    });
}

export function expectEachToBeCloseTo<T, R extends number>(
    fn: (value: T) => R,
    threshold: number,
    inputs: T[],
    expectedValues: R | R[]
) {
    const outputs = expectedValues instanceof Array ? expectedValues : Arrays.init(inputs.length, () => expectedValues);
    const pairs = Arrays.zipTruncated(inputs, outputs);

    pairs.forEach(([input, output]) => {
        expect(fn(input)).withContext(
            `${fn.name}(${JSON.stringify(input)}) should equal ${output}`,
        ).toBeCloseTo(output, threshold);
    });
}