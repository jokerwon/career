package com.znv.demo;

/**
 * @Author WengJiankai
 * @Date 2019-12-12 13:56
 * @Desciption
 */
public class Person {
    private String name;
    public int age;

    public void show() {
        System.out.println("balabala");
    }

    private String showNation(String nation) {
        System.out.println("我的国籍是"+nation);
        return nation;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public Person() {
    }

    private Person(int age) {
        this.age = age;
    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
