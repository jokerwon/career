void main(List<String> args) {
  /*
   * int 和 double 是 num 的子类
   */
  num a = 1;
  num b = 2.00;

  int c = 1;
  double d = 1.32;

  String str = 'Hello';
  String str1 = "World";
  String str2 = '''
 可以换行的字符串
''';
  String str3 = "$str and $str1";
  String str4 = r"$str and $str1";
  print(str3);
  print(str4);

  bool isTrue = true;
  bool isFalse = false;

  var list = [1, 2, 2, 4, 5];
  List list1 = [3, 656, 7];
  var list3 = new List();
  list[0] = 100;
  print(list[0]);
  list.add(300);
  list.remove(100);
  print(list);

  var constList = const [1, 243, 453];
  // constList.add(12);  // 报错，Cannot add to an unmodifiable list
  constList.forEach(print);

  var user = const {
    "name": "张三",
    "age": 22,
    "hobbies": ["eating", "drinking"]
  };

  user.forEach((k, v) => {print("$k => $v")});
  Map user2 = {
    "name": "张三",
    "age": 22,
    "hobbies": ["eating", "drinking"]
  };
  var user3 = new Map();
  user3["name"] = "李四";
}

String getUserName(String username) {
  return username;
}

// 箭头函数
String getFun(String name) => name;

// 可选参数
String fun1(String name, [int age]) {
  return "";
}

String fun2(String name, {int age, int sex}) {
  return "";
}
// fun2("adam", sex: 3);

// 默认值
fun3({String name = "Hello"}) {

}
