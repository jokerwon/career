package com.demo3;

/**
 * @Author WengJiankai
 * @Date 2019-12-10 15:25
 * @Desciption
 */
public class BankTest {
}


//懒汉式单例模式：需要的时候创建对象，存在线程安全问题
class Bank {
    private Bank() {
    }

    private static Bank instance = null;

    /*private static synchronized Bank getInstance() {
        //效率稍差
        if (instance == null) {
            instance = new Bank();
        }
        return instance;
    }*/

    private static Bank getInstance() {
        //效率稍差
        /*synchronized (Bank.class) {
            if (instance == null) {
                instance = new Bank();
            }
            return instance;
        }*/

        //效率更高
        if (instance == null) {
            synchronized (Bank.class) {
                if (instance == null) {
                    instance = new Bank();
                }
            }
        }
        return instance;
    }
}

//饿汉式单例模式：一开始就创建对象，不存在线程安全问题
class Bank1 {
    private static Bank1 instance = new Bank1();
    private Bank1() {}
    private static Bank1 getInstance() {
        return instance;
    }

}