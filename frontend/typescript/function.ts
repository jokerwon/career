function foo(name: string): number {
  return name.length;
}

const foo1 = function (name: string): number {
  return name.length;
};

const foo2: (name: string) => number = function (name) {
  return name.length;
};

// 重载
function func(foo: number, bar: true): string; // 重载签名1
function func(foo: number, bar?: false): number; // 重载签名2
// 实现签名，会包含重载签名的所有可能情况。
function func(foo: number, bar?: boolean): string | number {
  if (bar) {
    return String(foo);
  } else {
    return foo * 599;
  }
}

/**
 * public：default, 此类成员在类、类的实例、子类中都能被访问。
 * private：此类成员仅能在类的内部被访问。
 * protected：此类成员仅能在类与子类中被访问，你可以将类和类的实例当成两种概念，即一旦实例化完毕（出厂零件），那就和类（工厂）没关系了，即不允许再访问受保护的成员。
 */
class Foo {
  static staticHandler() {}

  private prop: string;

  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`);
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`;
  }
}


enum LoginType {
  WeChat,
  TaoBao,
  TikTok,
  // ...
}

// 抽象类
abstract class LoginHandler {
  abstract handler(): void
}

// 实现抽象类
class WeChatLoginHandler implements LoginHandler {
  handler() { }
}

class TaoBaoLoginHandler implements LoginHandler {
  handler() { }
}

class TikTokLoginHandler implements LoginHandler {
  handler() { }
}

class Login {
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.TikTok]: new TikTokLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler(),

  }
  public static handler(type: LoginType) {
    Login.handlerMap[type].handler()
  }
}

export {};
