// 条件泛型
type isEqual<T> = T extends true ? 1 : 2;

type A = isEqual<true>; // 1
type B = isEqual<false>; // 2
type C = isEqual<"">; // 2

// 泛型默认值
type Factory<T = boolean> = T | number | string;

const foo: Factory = false;

// 泛型约束
// A extends B : 意味着 A 是 B 的子类型，也就是说 A 比 B 的类型更精确，或者说更复杂
// - 更精确，如字面量类型是对应原始类型的子类型，即 'linbudu' extends string，599 extends number 成立。类似的，联合类型子集均为联合类型的子类型，即 1、 1 | 2 是 1 | 2 | 3 | 4 的子类型。
// - 更复杂，如 { name: string } 是 {} 的子类型，因为在 {} 的基础上增加了额外的类型，基类与派生类（父类与子类）同理。

type ResStatus<ResCode extends number = 10000> = ResCode extends
  | 10000
  | 10001
  | 10002
  ? "success"
  : "failure";

type Res1 = ResStatus<10000>; // "success"
type Res2 = ResStatus<20000>; // "failure"
type Res3 = ResStatus; // "success"
// type Res3 = ResStatus<"20000">; // Error

// 多泛型关联
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;

type Result1 = Conditional<"linbudu", string, "passed!", "rejected!">; // "passed!"
type Result2 = Conditional<"linbudu", boolean, "passed!", "rejected!">; // "rejected!"

type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput
> = number;

// 对象类型中的泛型
interface IRes<TData = unknown> {
  code: number;
  error?: string;
  data: TData;
}
// eg.1
interface IUserProfileRes {
  name: string;
  homepage: string;
  avatar: string;
}
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
  return Promise.resolve({
    code: 0,
    data: {
      name: "",
      homepage: "",
      avatar: "",
    },
  });
}

// eg.2
type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {
  return Promise.resolve({ code: 0, data: false });
}

// 泛型嵌套
interface IPaginationRes<TItem = unknown> {
  data: TItem[];
  page: number;
  totalCount: number;
  hasNextPage: boolean;
}

function fetchUserProfileList(): Promise<
  IRes<IPaginationRes<IUserProfileRes>>
> {
  return Promise.resolve({
    code: 0,
    data: {
      data: [{ name: "", homepage: "", avatar: "" }],
      page: 1,
      totalCount: 0,
      hasNextPage: false,
    },
  });
}

// 函数中的泛型
const arrowFun = <T>(input: T): T => input;

function handle<T>(input: T): T {
  return input;
}
const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"
let authorAge = 18; // 使用 let 声明，被推导为 number
handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

function swap<T, U>([start, end]: [T, U]): [U, T] {
  return [end, start];
}
const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);

function handle1<T extends string | number>(input: T): T {
  return input;
}

function swap1<T extends number, U extends number>([start, end]: [T, U]): [
  U,
  T
] {
  return [end, start];
}
