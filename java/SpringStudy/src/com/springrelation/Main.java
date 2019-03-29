package com.springrelation;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-relation.xml");
        Friend friend = ctx.getBean(Friend.class);
        System.out.println(friend);
    }

}
