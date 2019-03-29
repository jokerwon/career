package com.spring.aop;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Student {
    private Integer age;
    private String name;

    public Integer getAge() {
        System.out.println("Age : " + age);
        return age;
    }

    @Value("22")
    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        System.out.println("Name : " + name);
        return name;
    }

    @Value("Joker")
    public void setName(String name) {
        this.name = name;
    }

    public void printThrowException(){
        System.out.println("Exception raised");
        throw new IllegalArgumentException();
    }


}
