package com.annotation.repository;

import org.springframework.stereotype.Repository;

//指定 bean 在配置文件中的id
@Repository("userRepository")  //如果在IOC中有多个同类型的bean，在此指定引用的名字
public class UserRepositoryImpl implements UserRepository {
    @Override
    public void save() {
        System.out.println("UserRepository Save...");
    }
}
