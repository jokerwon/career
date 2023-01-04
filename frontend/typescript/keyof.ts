interface Foo {
  linbudu: 1;
  599: 2;
}

// 索引类型查询
type FooKeys = keyof Foo; // "linbudu" | 599
// type FooKeys = Object.keys(Foo).join(" | ");

const antherFooKey: FooKeys = "linbudu";

// 索引类型访问
interface NumberRecord {
  [key: string]: number;
}
interface StringRecord {
  prop: string;
}

type PropType = NumberRecord[string]; // number
type PropType1 = StringRecord["prop"]; // string
const num: PropType = 133;
const str: PropType1 = "133";

interface Foo {
  propA: number;
  propB: boolean;
  propC: string;
}

type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
let d: PropTypeUnion = "";
d = 123;
d = false;
// d = null;

// 映射类型
type Stringify<T> = {
  [K in keyof T]: string;
};


interface Bar {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: () => void;
}

type StringifiedFoo = Stringify<Bar>;
// const StringifiedFoo = {};
// for (const k of Object.keys(Foo)){
//   StringifiedFoo[k] = string;
// }

// 等价于
// interface StringifiedFoo {
//   prop1: string;
//   prop2: string;
//   prop3: string;
//   prop4: string;
// }

const o: StringifiedFoo = {
  prop1: "",
  prop2: "",
  prop3: "",
  prop4: "",
};


type Clone<T> = {
  [K in keyof T]: T[K];
};

export {};
