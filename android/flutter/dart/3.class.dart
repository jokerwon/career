void main(List<String> args) {
  Animal animal = Animal("cat");

  Person person = Person();
  person._learn();

}

class Animal {
  // 类变量（静态变量）
  static int height;

  // 成员变量
  String name;

  // 构造方法
  Animal(String name) {
    this.name = name;
  }

  // 成员方法
  eat() {}
}

// 构造方法不支持重载
// 通过命名的构造方法实现构造方法重载
class Student {
  String name;
  int age;

  // Student(String name, int age) {
  //   this.name = name;
  //   this.age = age;
  // }
  // 相当于
  Student(this.name, this.age);

  // 命名的构造方法
  Student.withName(this.name);
}

// 成员的访问控制
class Person {
  String name;
  int _age;

  int get age {
    return this._age;
  }

  set age(int age) {
    this._age = age;
  }

  void _learn() {

  }
}