// 字符串类型
let msg: string = "";

// 数值类型
let num: number = 1;
num = 1.11;

// boolean
let isSingleDog: boolean = true;

// undefined  null
let undef: undefined = undefined;
let nul: null = null;

// 数组
let numArr: number[] = [1, 2, 3];
let numArr1: Array<number> = [3, 5];

// 元组: 规定了元素数量和每个元素类型的“数组”
let tup1: [string, number, boolean] = ["Tim", 18, true]; // 数组中每个元素的类型与注解中一致
console.log(tup1[0]);
console.log(tup1.length);

// 枚举: 枚举项一般用英文和数字，枚举值一般用整型数字
enum Gun {
  M416 = 1,
  AK47 = 2,
  Groza = 3,
}
// 使用默认枚举值, 枚举值默认从0开始
enum Season {
  SPRING,
  SUMMER,
  AUTUMN,
  WINTER,
}
// <=>
enum Season1 {
  SPRING = 0,
  SUMMER = 1,
  AUTUMN = 2,
  WINTER = 3,
}
let srpingCode: Season = Season.SPRING;

// any: 任意类型
let anyType: any = 2;
anyType = "ssa";

// void: 没有类型，一般用于无返回值的函数
function voidFun(): void {
  console.log("hahah");
}

// never: 不存在的值的类型，常用于 抛出异常 或 无限循环的函数返回值类型
// 所有类型都是 never类型 的父类，所以可以将 never类型的值 赋值给任意类型变量
function neverFun(): never {
  throw new Error("Error");
}
function neverFun1(): never {
  while (true) {}
}

// 变量声明和初始化在同一行时，可以省略类型声明
let ellipsis = "...";
// ellipsis = 2;  // 报错

// 联合类型
let mutilType: number | string = 12;
mutilType = "sdaf";

// 函数形参可选参数和默认值
function alternativeValue(name: string, age?: number): void {
  console.log(name + age);
}
// 带默认值的参数也是可选参数
function defaultValue(name: string = "Joker", age: number = 24): void {
  console.log(name + age);
}

// 剩余参数
function sum(n1: number, n2: number, ...rest: number[]): void {}

// 类
class Person1 {
  name: string;
  age: number = 2; // 初始值

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.log("eating");
  }
}

// 接口
interface Person {
  firstName: string;
  lastName: string;
}
class Student implements Person {
  firstName: string = "Joker";
  lastName: string = "Won";
}

export {};
