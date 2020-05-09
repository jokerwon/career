package com.createthread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 16:00
 * @Desciption 使用线程池 - 创建线程
 */

class NumberThread1 implements Runnable {

    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) System.out.println(Thread.currentThread().getName()+":"+i);
        }
    }
}

class NumberThread2 implements Runnable {

    public void run() {
        for (int i = 1; i <= 100; i++) {
            if (i % 2 != 0) System.out.println(Thread.currentThread().getName()+":"+i);
        }
    }
}

public class ThreadPool {


    public static void main(String[] args) {
        //创建线程池
        ExecutorService service1 = Executors.newFixedThreadPool(10);
        ThreadPoolExecutor service = (ThreadPoolExecutor) service1;
        //设置连接池属性
//        service.setCorePoolSize();
//        service.setKeepAliveTime();
//        service.setMaximumPoolSize();



        service.execute(new NumberThread1());  //适合于Runnable
        service.execute(new NumberThread2());
//        service.submit();  //适合于Callable
        //关闭线程池
        service.shutdown();
    }
}
