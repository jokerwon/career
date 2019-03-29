package com.beanfactory;

import org.springframework.beans.factory.FactoryBean;

//需要实现Factory的接口
public class CarFactoryBean implements FactoryBean {
    private String brand;

    public void setBrand(String brand) {
        this.brand = brand;
    }

    //返回 bean 的对象
    @Override
    public Object getObject() throws Exception {
        return new Car(brand,500000);
    }

    //返回 bean 的类型
    @Override
    public Class<?> getObjectType() {
        return Car.class;
    }

    //判断 bean 是否为单例
    @Override
    public boolean isSingleton() {
        return true;
    }
}
