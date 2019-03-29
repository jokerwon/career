package com.helloworld;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class Main {
    public static void main(String[] args) {
        //1. 创建一个Spring的IOC容器对象
        ApplicationContext context = new FileSystemXmlApplicationContext("E:/IdeaProjects/SpringStudy/src/com/helloworld/spring-config.xml");
        //2. 从IOC容器中获取Bean实例
        HelloWorld helloWorld = (HelloWorld) context.getBean("helloWorld");
        //3. 调用sayHello方法
        helloWorld.sayHello();
    }
}
