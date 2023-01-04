/**
 * 逆变和协变
 * 含义：随着某一个量的变化，随之变化一致的即称为协变，而变化相反的即称为逆变。
 * 举例：如果有 A ≼ B ，协变意味着 Wrapper<A> ≼ Wrapper<B>，而逆变意味着 Wrapper<B> ≼ Wrapper<A>。
 *      这里的变化（Wrapper）即指从单个类型到函数类型的包装过程
 * 结论：函数类型的参数类型使用子类型逆变的方式确定是否成立，而返回值类型使用子类型协变的方式确定。
 *      参数类型-反比            返回值类型-正比
 * 应用：开启 strictFunctionTypes 会对函数参数类型启用逆变检查。
 *      在默认情况下，对函数参数的检查采用 双变（ bivariant ），即逆变与协变都被认为是可接受的。
 */

class Animal {
  asPet() {}
}

class Dog extends Animal {
  bark() {}
}

class Corgi extends Dog {
  cute() {}
}

// Animal > Dog > Corgi

type AsFuncReturnType<T> = (arg: unknown) => T;
type AsFuncArgType<T> = (arg: T) => void;

// 协变，因为 Corgi <= Dog，所以 AsFuncReturnType<Corgi> <= AsFuncReturnType<Dog>
// 1 成立：(T -> Corgi) <= (T -> Dog)
type CheckReturnType = AsFuncReturnType<Corgi> extends AsFuncReturnType<Dog>
  ? 1
  : 2;

// 逆变，因为 Dog <= Animal，所以AsFuncArgType<Dog> > AsFuncArgType<Animal>
// 1 成立：(Animal -> T) <= (Dog -> T)
type CheckArgType = AsFuncArgType<Animal> extends AsFuncArgType<Dog> ? 1 : 2;

function fn(dog: Dog) {
  dog.bark();
}

type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;

// fn 是 func1 的子类型，即 Dog => void 是 Corgi => void 子类型
const func1: CorgiFunc = fn;
// @ts-expect-error
// 无法赋值，说明 Dog => void 是 Animal => void 父类型
const func2: AnimalFunc = fn;
