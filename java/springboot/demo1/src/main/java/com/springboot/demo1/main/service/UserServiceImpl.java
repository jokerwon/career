package com.springboot.demo1.main.service;

import com.springboot.demo1.main.bean.User;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public void printUsers(User user) {
        if (user == null){
            throw new RuntimeException("检查用户参数是否为空");
        }
        System.out.print("id = " + user.getId());
        System.out.print("\tusername = " + user.getUserName());
        System.out.println("\tid = " + user.getNote());

    }
}
