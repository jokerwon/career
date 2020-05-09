package com.znv.demo;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @Author WengJiankai
 * @Date 2019-12-12 13:58
 * @Desciption
 */
public class ReflectionTest {

    @Test
    public void test1() throws Exception {
        Class clazz = Person.class;
        //1.通过反射创建对象
        Constructor constructor = clazz.getConstructor(String.class, int.class);
        Person tom = (Person) constructor.newInstance("Tom", 12);
        System.out.println(tom);

        //2.通过反射调用对象指定的属性、方法
        Field age = clazz.getDeclaredField("age");
        age.set(tom, 10);
        System.out.println(tom);
        Method show = clazz.getDeclaredMethod("show");
        show.invoke(tom);

        //3.调用私有构造器、属性、方法
        Constructor constructor1 = clazz.getDeclaredConstructor(int.class);
        constructor1.setAccessible(true);
        Person p = (Person) constructor1.newInstance(22);
        System.out.println(p);
        Method showNation = clazz.getDeclaredMethod("showNation", String.class);
        showNation.setAccessible(true);
        String nation = (String) showNation.invoke(p, "中国");
        System.out.println(nation);

    }


    //获取Class的实例的方式
    @Test
    public void test2() throws ClassNotFoundException {
        //1.通过运行时类的属性 T.class
        Class<Person> clazz = Person.class;

        //2.通过运行时类的对象调用 getClass()
        Person person = new Person();
        Class clazz1 = person.getClass();

        //3.调用Class的静态方法 forName(String classPath)
        Class clazz2 = Class.forName("com.znv.demo.Person");

        //4.使用类加载器 ClassLoader
        ClassLoader classLoader = ReflectionTest.class.getClassLoader();
        Class clazz3 = classLoader.loadClass("com.znv.demo.Person");

        System.out.println(clazz == clazz1); //true
        System.out.println(clazz == clazz2); //true
        System.out.println(clazz == clazz3); //true
    }
}
