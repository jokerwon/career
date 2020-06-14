## HTML 和 CSS

### 1. HTML

#### 语义化

#### 多媒体

#### SEO



### 2. CSS

#### 布局

##### 水平垂直居中

1. ##### 定位

   ~~~css
   .father {
     position: relative;
   }
   .son {
     position: absolute;
     top: 50%;
     left: 50%;
     width: 200px;
     height: 100px;
     background-color: #2797ff;
     /* 已知宽高 */
     margin-top: -50px;
     margin-left: -100px;
     /* 未知宽高 */
     transform: translate(-50%, -50%);
   }
   ~~~

2. ##### flex

   ~~~css
   .father {
     display: flex;
     justify-content: center;
     aligh-items: center
   }
   ~~~

##### 双飞翼布局

~~~html
<body class="clearfix">
  <div class="container">
    <div class="center"></div>    
  </div>
  <div class="left"></div>
  <div class="right"></div>
</body>
~~~

~~~css
.container {
  float: left;
  width: 100%;
}

.center {
  height: 200px;
  margin-left: 110px;
  margin-right: 220px;
  background: green;
}

.center::after {
  content: '';
  display: block;
  font-size: 0;
  height: 0;
  zoom: 1;
  clear: both;
}

.left {
  float: left;
  height: 200px;
  width: 100px;
  margin-left: -100%;
  background: red;
}

.right {
  float: right;
  height: 200px;
  width: 200px;
  margin-left: -200px;
  background: blue;
}
~~~

##### 圣杯布局

~~~html
<div class="container clearfix">
  <div class="center"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
~~~

~~~css
.container {
  margin-left: 120px;
  margin-right: 220px;
}

.main {
  float: left;
  width: 100%;
  height: 300px;
  background: green;
}

.left {
  position: relative;
  left: -120px;
  float: left;
  height: 300px;
  width: 100px;
  margin-left: -100%;
  background: red;
}

.right {
  position: relative;
  right: -220px;
  float: right;
  height: 300px;
  width: 200px;
  margin-left: -200px;
  background: blue;
}
~~~







#### 盒子模型

##### 标准盒模型（content-box）

盒子大小 = content(width) + padding + border + margin

##### 怪异盒模型（旧版本IE）(border-box)

盒子大小 = (content + padding + border)(width) + margin

##### Flex 盒模型



#### BFC

#### Flex

#### Grid

#### 响应式布局

##### @media

##### rem

##### flex

##### vh/vw



## JavaScript

### 1. 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。当产生闭包时，闭包中的变量会常驻内存，所以使用时要注意内存泄漏问题。

在定时器、事件监听、ajax 请求等任务中，只要使用了回调函数，实际上就是在使用闭包。

闭包一般被用来封装私有变量，例如 IIFE 中就利用了闭包来进行封装。



### 2. 作用域

#### 词法作用域

词法作用域就是定义在词法阶段的作用域，简单来说可以指编写代码时所产生的作用域。与词法作用域对应的是动态作用域。

#### 函数作用域

函数作用域是指属于这个函数的全部变量可以在整个函数范围内（包括其内部嵌套的函数作用域）使用以及复用。在函数作用域外部无法直接访问内部的变量。

浏览器中存在一个全局作用域，指向 `window` 对象。Node 环境中的全局作用域指向的是 `global` 对象。

#### 作用域链

**由内层的函数作用域层层牵引到全局作用域的这个过程，产生了一条作用域链。**作用域链是为了保证对执行环境有权访问的所有变量和函数的有序访问。

#### 块级作用域

在 ES6 之前，大概只有 `with` 和` try...catch...` 的 `catch`分支中存在块级作用域。ES6 新增了 `let`  和 `const` 关键字，从而方便地实现了块级作用域。

在有 `let` 或 `const` 声明的块级作用域中，会产生一个暂时性死区，就是说由 `let` 声明的变量，在声明之前都是无法使用的，这意味着 `let` 和 `const` 不存在变量提升，由其声明的变量也无法重复声明。



### 3. 原型

#### 原型对象

无论什么时候，只要创建了一个新函数，就会根据一组特定的规则为该函数创建一个 `prototype` 属性，这个属性指向函数的原型对象。在默认情况（重写原型对象可能会造成 `constructor` 属性丢失），所有原型对象会自动获得一个 `constructor` 属性，指向 `prototype` 所在的函数。在检索某个对象的属性时，会先从对象本身开始搜索，如果搜索到则直接返回，否则会去对象的 `[[prototype]]` 所指向的原型对象中搜索。

#### 原型链

如果让原型对象指向另一个类型的实例，那么原型对象中将包含一个指向另一个原型的指针（`[[prototype]]`），加入另一个原型也是其他某一个类型的实例，那么上述关系依然成立，如此层层递进，就构成了原型链。



### 4. 创建对象的方法

#### 1) 工厂模式

~~~js
function createPerson(name, age, job) {
  let o = new Object();
  o.name= name;
  o.age = age;
  o.job = job;
  return o;
}
let person1 = createPerson("Sam", 22, "FE");
let person2 = createPerson("Tam", 24, "BE");
~~~

**问题：**

1. 无法识别对象类型

#### 2) 构造函数

~~~js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}
let person1 = new Person("Sam", 22, "FE");
let person2 = new Person("Tam", 24, "BE");
~~~

**问题：**

1. 无法共享方法

#### 3) 原型模式

~~~js
function Person() {}
Person.prototype.name = "Sam";
Person.prototype.age = 22;
Person.prototype.job = "FE";
Person.prototype.friends = ["Tim", "Cat"];
Person.prototype.sayName = function() {
  console.log(this.name);
};
let person1 = new Person();
let person2 = new Person();
~~~

**注意：**

1. 原型的动态性：由于在原型中查找值的过程是一次搜索，所以原型对象的任何修改都能立即在从实例上反映出来。

**问题：**

1. 未单独初始化属性，每个实例属性默认值都相同。
2. 复杂数据类型共享问题。

#### 4) 组合使用构造函数模式和原型模式

~~~js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Tim", "Cat"];
}
Person.prototype.sayName = function() {
  console.log(this.name);
};
let person1 = new Person("Sam", 22, "FE");
let person2 = new Person("Tam", 24, "BE");
~~~

**问题：**

1. 属性和方法分开定义。

#### 5) 动态原型模式

~~~js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Tim", "Cat"];
  if(typeof this.sayName != "function") {
    Person.prototype.sayName = function() {
  		console.log(this.name);
		};
  }
}
let person1 = new Person("Sam", 22, "FE");
~~~

#### 6) 寄生构造函数模式

~~~js
function Person(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}
let person1 = new Person("Sam", 22, "FE");
~~~

**问题：**

1. 无法用 `instanceof` 来确定对象类型。

#### 7) 稳妥构造函数模式

~~~js
function Person(name, age, job) {
  let o = new Object();
  //在此处定义私有成员和方法
  ...
  o.sayName = function() {
    console.log(name);  // 不使用 this
  };
  return o;
}
// 只有 sayName 可以访问成员
~~~

稳妥对象：指没有公共属性，其方法也不引用 `this` 的对象。

与寄生构造函数模式有两点不同：

1. 新创建对象的实例方法不引用 `this`。
2. 不适用 `new` 操作符调用构造函数。



### 5. 继承

#### 1) 原型链继承

~~~js
function Super() {}
function Sub() {}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;
~~~

**问题：**

1. 包含引用类型属性的原型存在共享问题。
2. 创建子类时无法向父类构造函数传参。

#### 2) 借用构造函数

~~~js
function Super() {}
function Sub() {
  Super.call(this, ...args);
}
~~~

**优势：**

1. 可以向父类构造函数传参。

**问题：**

1. 当父类方法在原型中定义时，无法进行函数复用，即**无法继承父类的原型中的属性**。

#### 3) 组合继承

~~~js
function Super() {}
function Sub() {
  Super.call(this, ...args);  // 第二次调用父类构造函数
}
Sub.prototype = new Super();  // 第一次调用父类构造函数
Sub.prototype.constructor = Sub;
~~~

**问题：**

1. 调用两次父类构造函数。

#### 4) 原型式继承

~~~js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
let person = {
  name: "John",
  friends: ["Tim", "Cat"]
}
let anotherPerson = object(person);  // 可以用 Object.create(person)
anotherPerson.name = "Tam";
anotherPerson.friends.push("Jerry");
person.friends  // ["Tim", "Cat", "Jerry"],修改了原型中的属性
~~~

**说明：**

1. `Object.create()` 只传一个参数时的行为与 `object()` 相同。
2. 其第二个参数与 `Object.defineProperties()` 的第二个参数相同，用于覆盖原型对象上的同名属性。

#### 5) 寄生式继承

~~~js
function createAnother(original) {
  let clone = object(original);  // 可以用 Object.create(person)
  clone.sayHi = function() {
    console.log("hi");
  }
}
~~~

#### 6) 寄生组合式继承

~~~js
function inheritPrototype(subType, superType) {
  let prototype = object(superType.prototype);  // 可以用 Object.create(person)
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function Super() {}
function Sub(name) {
  Super.call(this, ...args);  // 第二次调用父类构造函数
  this.name = name
}
// Sub.prototype = new Super();  // 第一次调用父类构造函数
inheritPrototype(Sub, Super);
Sub.prototype.sayName = function() {
  console.log(this.name)
};
~~~



### 6. new



### 7. this

#### 定义

`this` 是在运行时进行绑定的，而非编写时绑定。当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数被调用的位置、函数的调用方式、传入的参数等信息。`this` 是这个记录的一个属性，会在函数执行的过程中用到。

#### 绑定规则

##### 1) 默认绑定

独立函数调用。如果使用严格模式（strict mode），则不能将全局对象用于默认绑定，因此this会绑定到 `undefined` 。

##### 2) 隐式绑定

调用位置有上下文对象，或者被某个对象拥有或者包含时，可能会产生隐式绑定。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。

~~~js
function foo() {
  console.log(this.a);
}
let obj2 = {
  a: 42,
  foo: foo
};
let obj1 = {
  a: 2,
  obj2: obj2
};
obj1.obj2.foo();  // 42
~~~

**隐式丢失**

一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 `this` 绑定到全局对象或者 `undefined` 上，取决于是否是严格模式。

~~~js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  fn();
}

let obj = {
  a: 2,
  foo: foo
};
var a = "ops, global";
doFoo(obj.foo);  // ops, gloabal
~~~

##### 3) 显示绑定

直接指定this的绑定对象。

**硬绑定**

使用 `call`, `apply` , `bind` 进行 `this` 绑定。

**API 调用的上下文**

例如 `forEach` 的第二个参数。

##### 4) new 绑定

使用 `new` 来调用构造函数时会创建一个新对象，并把该对象绑定到构造函数调用中的 `this` 上。

##### 优先级

一般情况下，new绑定 > 显示绑定 > 隐式绑定 > 默认绑定。

如果将 this 利用`call`, `apply` , 或`bind`显示绑定到 `null` 或者 `undefined` 上，这些值会被忽略，实际应用的是默认绑定。

间接引用时，调用函数会应用默认绑定。



### 8. 事件循环

### 9. 垃圾回收

### 10. DOM 和 BOM

### 11. 模块化

### 12. 跨域

### 13. 客户端存储



## HTTP