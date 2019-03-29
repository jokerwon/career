package com.springboot.demo1.main.service;

import com.springboot.demo1.main.bean.User;

public class UserValidatorImpl implements UserValidator {
    @Override
    public boolean validator(User user) {
        System.out.println("引入新的接口：" + UserValidator.class.getSimpleName());
        return user != null;
    }
}
