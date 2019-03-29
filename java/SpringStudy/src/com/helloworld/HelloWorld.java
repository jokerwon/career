package com.helloworld;

public class HelloWorld {
    private String name;

    public HelloWorld() {
        System.out.println("constructor");
    }

    public void setName(String name) {
        this.name = name;
        System.out.println("setName function");
    }

    public void sayHello(){
        System.out.println("Hello" + name);
    }
}
