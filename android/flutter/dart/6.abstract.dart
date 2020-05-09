abstract class Person {
  say() {

  }
  eat();  // 抽象方法
}

// 被其他类作为接口后，其属性和方法都要被重写
class Study {
  int time;
  learn() {

  }
}
class Sleep {
  sleep() {

  }
}
// 单继承，多实现
class Student extends Person implements Study, Sleep {
  @override
  sleep() {
    // TODO: implement sleep
    return null;
  }

  @override
  learn() {
    // TODO: implement learn
    return null;
  }

  @override
  eat() {
    // TODO: implement eat
    return null;
  }

  @override
  int time;
  
}

void main(List<String> args) {
  
}