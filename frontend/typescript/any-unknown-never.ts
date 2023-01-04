// any >>>>>>>>>>>>>
// any 的本质是类型系统中的顶级类型，即 Top Type
// 被标记为 any 类型的变量可以拥有任意类型的值
let anyVar: any = "linbudu";

anyVar = false;
anyVar = "linbudu";
anyVar = {
  site: "juejin"
};

anyVar = () => { }

// 标记为具体类型的变量也可以接受任何 any 类型的值
const val1: string = anyVar;
const val2: number = anyVar;
const val3: () => {} = anyVar;
const val4: {} = anyVar;


// unknown >>>>>>>>>>>>>>
let unknownVar: unknown = "linbudu";

unknownVar = false;
unknownVar = "linbudu";
unknownVar = {
  site: "juejin"
};

unknownVar = () => { }

// const val1: string = unknownVar; // Error
// const val2: number = unknownVar; // Error
// const val3: () => {} = unknownVar; // Error
// const val4: {} = unknownVar; // Error

const val5: any = unknownVar;
const val6: unknown = unknownVar;

// never >>>>>>>>>>>>>>>
// 在编程语言的类型系统中，never 类型被称为 Bottom Type，是整个类型系统层级中最底层的类型。
// 和 null、undefined 一样，它是所有类型的子类型，但只有 never 类型的变量能够赋值给另一个 never 类型变量。
declare let v1: never;
declare let v2: void;

// v1 = v2; // X 类型 void 不能赋值给类型 never

v2 = v1;


export {};
