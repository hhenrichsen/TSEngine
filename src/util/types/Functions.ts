export type FirstArgument<FunctionType> = FunctionType extends (
    x: infer ParamType,
    ...args: any[]
) => any
    ? ParamType
    : never;

export type SecondArgument<FunctionType> = FunctionType extends (
    x: any,
    y: infer ParamType,
    ...args: any[]
) => any
    ? ParamType
    : never;

export type DropFirst<FunctionType> = FunctionType extends (
    x: any,
    ...args: infer ParameterTypes
) => infer ReturnType
    ? (...args: ParameterTypes) => ReturnType
    : never;
