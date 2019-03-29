package com.springboot.demo1.main;

import com.springboot.demo1.main.bean.User;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

@Aspect
public class MyAspect {

//    增强 UserServiceImpl服务
//    @DeclareParents(value = "com.springboot.demo1.main.service.UserServiceImpl+",
//        defaultImpl = com.springboot.demo1.main.service.UserValidatorImpl.class)
//    public UserValidator userValidator;

    @Pointcut("execution(* com.springboot.demo1.main.service.UserServiceImpl.printUsers(..))")
    public void pointCut(){}

    @Before("pointCut() && args(user)")
    public void beforeParam(JoinPoint joinPoint, User user){
        Object[] args = joinPoint.getArgs();
        System.out.println("before with param...");
    }

    @Before("pointCut()")
    public void before(){
        System.out.println("before...");
    }

    @After("pointCut()")
    public void after(){
        System.out.println("after...");
    }

    @AfterReturning("pointCut()")
    public void afterReturning(){
        System.out.println("afterReturning...");
    }

    @AfterThrowing("pointCut()")
    public void afterThrowing(){
        System.out.println("afterThrowing...");
    }

    @Around("pointCut()")
    public void around(ProceedingJoinPoint joinPoint) throws Throwable{
        System.out.println("around before...");
        joinPoint.proceed();
        System.out.println("around after...");

    }
}

