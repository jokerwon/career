package com.springboot.demo1.main;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;

//
@SpringBootApplication
//
@MapperScan(
        basePackages = "com.springboot.demo1.main.*",
        //指定 sqlSessionFactoryRef，如果 sqlSessionTemplateRef 被指定，则作废
        sqlSessionFactoryRef = "sqlSessionFactory",
        //指定 sqlSessionTemplateRef，将忽略 sqlSessionFactoryRef 的配置
        sqlSessionTemplateRef = "sqlSessionTemplate",
        annotationClass = Repository.class
)

public class Demo1Application {

    //定义切面
    @Bean(name = "myAspect")
    public MyAspect initMyAspect(){
        return new MyAspect();
    }

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

}
