package com.factory;

import java.util.HashMap;
import java.util.Map;

/*
* 实例工厂方法
*   即需要创建工厂本身，再调用工厂的实例方法来返回bean实例
* */

public class InstanceCarFactory {
    private Map<String,Car> cars = null;

    public InstanceCarFactory(){
        cars = new HashMap<String, Car>();
        cars.put("Audi",new Car("Audi",300000));
        cars.put("Ford",new Car("Ford",400000));
    }
    public Car getCar(String name){
        return cars.get(name);
    }
}
