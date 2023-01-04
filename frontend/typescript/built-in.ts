// 属性修饰工具类型 >>>>>>>>>>>>>>>
type PartialCustom<T> = {
  [P in keyof T]?: T[P];
};
type RequiredCustom<T> = {
  [P in keyof T]-?: T[P];
};

export type Nullable<T> = T | null;

type ReadonlyCustom<T> = {
  readonly [P in keyof T]: T[P];
};
// 相反
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 结构工具类型 >>>>>>>>>>>>>>>>>>>
type RecordCustom<K extends keyof any, T> = {
  [P in K]: T;
};

type PickCustom<T, K extends keyof T> = {
  [P in K]: T[P];
};
interface Foo {
  name: string;
  age: number;
}
type PickedFoo = Pick<Foo, "age">;

type OmitCustom<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// 集合工具类型 >>>>>>>>>>>>>>>>>>>
// 交集
type ExtractCustom<T, U> = T extends U ? T : never;
// 差集
type ExcludeCustom<T, U> = T extends U ? never : T;

// 应用
// 并集
export type Concurrence<A, B> = A | B;
// 交集
export type Intersection<A, B> = A extends B ? A : never;
// 差集
export type Difference<A, B> = A extends B ? never : A;
// 补集
export type Complement<A, B extends A> = Difference<A, B>;

// 模式匹配工具类型 >>>>>>>>>>>>>>>>>>>
type FunctionType = (...args: any) => any;
type ParametersCustom<T extends FunctionType> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ReturnTypeCustom<T extends FunctionType> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

type ClassType = abstract new (...args: any) => any;
type ConstructorParameters<T extends ClassType> = T extends abstract new (
  ...args: infer P
) => any
  ? P
  : never;
type InstanceType<T extends ClassType> = T extends abstract new (
  ...args: any
) => infer R
  ? R
  : any;

// 应用
type FirstParameter<T extends FunctionType> = T extends (
  arg: infer P,
  ...args: any
) => any
  ? P
  : never;

type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FooFirstParameter = FirstParameter<FuncFoo>; // number
type BarFirstParameter = FirstParameter<FuncBar>; // string

type PromiseValueType<T> = T extends Promise<infer Value> ? Value : never;
type PromisiValue = PromiseValueType<Promise<number>>;
