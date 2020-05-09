// 类的工厂构造方法
class Person {
  static Map<String, Person> _cache;

  String name;

  factory Person() {
    if (_cache == null) {
      _cache = new Map<String, Person>();
    }
    if (_cache["p"] == null) {
      _cache["p"] = Person._inner();
    }
    return _cache["p"];
  }

  Person._inner();

  say() {
    print("saying");
  }
}

// 类的仿真函数：如果类实现了 call 方法，则该类的对象可以作为方法使用
class Student {

  call() {
    print("Student.call");
  }
}

void main(List<String> args) {
  var student = Student();
  student();
}
