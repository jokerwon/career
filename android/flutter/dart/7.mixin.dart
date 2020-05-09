/**
 * mixins 实现类的多继承 with
 * 注意：使用 with 继承时，被继承的类不可显示地声明构造方法
 */
class A{
  a() {
    print('a');
  }
}

class B {
  b() {
    print('b');
  }
}

// class C extends A with B {
class C with A, B {
  c() {
    print('c');
  }
}

void main(List<String> args) {
  var c = new C();
  c.a();
  c.b();
}