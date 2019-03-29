package com.springboot.demo1.main.controller;

import com.springboot.demo1.main.bean.User;
import com.springboot.demo1.main.service.UserService;
import com.springboot.demo1.main.service.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
//定义类请求路径
@RequestMapping("/user")
public class UserController {
    //注入用户服务
    @Autowired
    private UserService userService = null;

    //定义请求
    @RequestMapping("/print")
    //转换为JSON
    @ResponseBody
    public User printUser(Long id, String username, String note){
        User user = new User(id,username,note);
        userService.printUsers(user);
        return user;
    }

    @RequestMapping("/vp")
    @ResponseBody
    public User validatorAndPrint(Long id, String username, String note){
        User user = new User(id,username,note);
        //强转
        UserValidator userValidator = (UserValidator) userService;
        if(userValidator.validator(user)){
            userService.printUsers(user);
        }
        return user;
    }

}
