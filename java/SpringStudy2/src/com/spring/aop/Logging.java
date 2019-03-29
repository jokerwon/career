package com.spring.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Logging {

    //定义一个选择所有方法的切点，通知将适用于所有方法
    @Pointcut("execution(* com.spring.aop.*.*(..))")
    private void selectAll(){}

    //前置通知：选定的方法执行之前执行的方法。此处指向 selectAll() 方法，即选定所有方法
    @Before("selectAll()")
    public void beforeAdvice(){
        System.out.println("[beforeAdvice] Going to setup student profile.");
    }
}
