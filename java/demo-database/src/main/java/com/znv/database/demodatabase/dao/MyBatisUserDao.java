package com.znv.database.demodatabase.dao;

import com.znv.database.demodatabase.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyBatisUserDao {
    //增加用户，返回增加结果，1 代表成功，其他代表失败，下同
    public int insertUser(User user);
    //删除用户
    public int deleteUser(String username);
    //更新用户
    public int updateUser(User user);
    //通过用户名查找用户信息，返回符合条件的对象
    public User getUserByUsername(String username);
    //返回所有用户的列表
    public List<User> findAllUsers();

}
