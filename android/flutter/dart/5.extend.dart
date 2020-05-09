/**
 * 单继承
 */
class Parent {
 int x;
 int _y;

 getX() {
   return this.x;
 }
}

class Child extends Parent {
  String z;

  @override
  getX() {
    return super.getX() + 1;
  }

  getZ() {
    return this.z;
  }
}

void main(List<String> args) {
  var child = new Child();
  child.z = 'sd';
  print(child.getZ());
}