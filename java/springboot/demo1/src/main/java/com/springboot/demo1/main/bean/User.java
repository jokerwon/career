package com.springboot.demo1.main.bean;

import com.springboot.demo1.main.enumeration.SexEnum;
import org.apache.ibatis.type.Alias;

@Alias(value = "user")  //MyBatis 指定别名
public class User {
    private long id = 0;
    private String userName = null;
    //性别枚举，这里需要使用typeHandler进行转换
    private SexEnum sex = null;
    private String note = null;


    public User(){}

    public User(long id, String userName, String note) {
        this.userName = userName;
        this.id = id;
        this.note = note;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public SexEnum getSex() {
        return sex;
    }

    public void setSex(SexEnum sex) {
        this.sex = sex;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
