
void main(List<String> args) {
  print("Hello World");
  var a = 2;
  // a = 'sadfas'; // 报错，类型推断，无法赋值不同数据类型
  a = 123;
  dynamic b = 33;
  b = 'adsfa';
  final num= 12;
  // num = 323;  // 报错，无法修改的值

  const constant = 22;
  // constant = 23;  // 报错，编译时常量

  final num1 = getNum();
  // const num2 = getNum();  // 报错，需要运行前初始化

  

  printNum(num);
}

getNum() {
  return 1;
}

printNum(int number) {
  print('This is a number $number');
}