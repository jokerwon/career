class Person {
  constructor(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }

  toString() {
    return `Person[name=${this.name}, gender=${this.gender}, age=${this.age}]`
  }
}

const person = new Person('Joker', 'male', 23);
// person.name = 'Joker';
// person.gender = 'male';
// person.age = 23;
console.log(person.toString());