package com.factory;

/*
* 静态工厂方法
*   直接调用某一个类的静态方法就可以返回 bean 实例
* */

import java.util.HashMap;
import java.util.Map;

public class StaticCarFactory {
    private static Map<String,Car> cars = new HashMap<String, Car>();

    static {
        cars.put("Audi",new Car("Audi",300000));
        cars.put("Ford",new Car("Ford",400000));
    }

    public static Car getCar(String name){
        return cars.get(name);  //根据名字获得Car的对象
    }

}
