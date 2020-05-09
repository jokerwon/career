package com.createthread;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 13:48
 * @Desciption 实现Runnable接口 - 创建线程
 */
class MyThread1 implements Runnable {

    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0)
                System.out.println(Thread.currentThread().getName()+ ":" + i);
        }
    }
}


public class CreateThread2 {
    public static void main(String[] args) {
        MyThread1 thread = new MyThread1();
        Thread t1 = new Thread(thread);
        Thread t2 = new Thread(thread);
        t1.start();
        t2.start();
    }
}
