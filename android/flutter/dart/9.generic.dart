/**
 * 
 */

// 泛型方法
show<T>(T t) {
  print(t);
} 

void main(List<String> args) {
  var list = new List<String>();
  // list.add(12);  // 报错
  list.add('dawfda');

  show<String>('asdf');
}