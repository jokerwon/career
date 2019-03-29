package com.springconfig;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring-config.xml");
        Car car1 = (Car) context.getBean("car");
        System.out.println(car1);

        Person person = (Person) context.getBean("person2");
        System.out.println(person);
    }
}
