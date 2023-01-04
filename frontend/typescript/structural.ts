// 问题1
class Cat {
  eat() {}
}
class Dog {
  eat() {}
}
function feedCat(cat: Cat) {}
// 并没有类型报错
feedCat(new Dog());
// TypeScript 比较两个类型并非通过类型的名称（即 feedCat 函数只能通过 Cat 类型调用），
// 而是比较这两个类型上实际拥有的属性与方法。
// 也就是说，这里实际上是比较 Cat 类型上的属性是否都存在于 Dog 类型上。

// 问题2
type USD = number;
type CNY = number;

const CNYCount: CNY = 200;
const USDCount: USD = 200;

function addCNY(source: CNY, input: CNY) {
  return source + input;
}

addCNY(CNYCount, USDCount);

export {};
