package com.springboot.demo1.main.dao;

import com.springboot.demo1.main.bean.User;
import org.springframework.stereotype.Repository;

@Repository
public interface MyBatisUserDao {
     public User getUser(Long id);
}
