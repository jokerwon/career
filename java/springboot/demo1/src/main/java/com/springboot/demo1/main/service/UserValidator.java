package com.springboot.demo1.main.service;

import com.springboot.demo1.main.bean.User;

public interface UserValidator {
    //检测对象是否为空
    public boolean validator(User user);
}
