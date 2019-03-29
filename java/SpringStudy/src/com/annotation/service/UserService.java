package com.annotation.service;


import com.annotation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    //如果有多个同类型的 bean，通过 @Qualifier指定引用的 bean
    //@Qualifier("userJDBCRepository") 或 @Qualifier("userRepositoryImpl"),括号中参数为IOC中默认的bean名称
    private UserRepository userRepository;

    public void add(){
        System.out.println("UserService add...");
        userRepository.save();
    }
}
