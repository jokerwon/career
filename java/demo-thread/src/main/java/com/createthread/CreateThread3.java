package com.createthread;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 15:31
 * @Desciption 实现Callable接口 - 创建线程
 *
 * Callable为何比Runnable更强大
 * 1. call()有返回值
 * 2. call()可以抛出异常
 * 3. Callable支持泛型
 */
public class CreateThread3 {
    public static void main(String[] args) {
        //3.创建Callable接口实现类的对象
        NumberThread numberThread = new NumberThread();
        //4.将该对象传递给FutureTask构造器，创建FutureTask对象
        FutureTask<Integer> futureTask = new FutureTask(numberThread);
        //5.将FutureTask对象作为参数传递到Thread类的构造器，创建线程后调用start()方法
        new Thread(futureTask).start();
//        futureTask.run();
        try {
            //6.通过FutureTask对象调用get()方法获取Callable的call()方法的返回值
            int sum = futureTask.get();
            System.out.println("sum:" + sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}

//1.创建一个实现Callable的实现类
class NumberThread implements Callable<Integer> {
    //2.实现call方法
    public Integer call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
//                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}