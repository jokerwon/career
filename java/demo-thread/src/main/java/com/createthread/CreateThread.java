package com.createthread;

/*
* 常用方法
* 1. start(): 启动当前线程；调用当前线程的 run()
* 2. run(): 将创建的线程要执行的操作声明在此方法中，通常要被重写
* 3. static currentThread(): 返回执行当前代码的线程对象
* 4. getName(): 获取当前线程的名字
* 5. setName(): 设置当前线程的名字
* 6. yield(): 释放当前 CPU的执行权，可能在下一刻 CUP继续执行此线程
* 7. join(): 在线程 a中调用线程 b的 join()方法，a会进入阻塞状态，直到线程 b执行完成后线程 a结束阻塞状态
* 8. stop(): 强制线程生命期结束，不推荐使用
* 9. isAlive(): 判断线程的生命状态
* 10. sleep(long millis): 让当前线程进入阻塞状态 millis毫秒
*
* 线程的优先级(概率抢占低优先级的执行权)
* 1. MAX_PRIORITY    10
*    MIN_PRIORITY     1
*    NORMAL_PRIORITY  5  --默认优先级
* 2. 获取和设置优先级
*    getPriority(): 获取线程的优先级
*    setPriority(int p): 设置线程优先级
*
* 创建线程的四种方式
* 1. 继承Thread
* 2. 实现Runnable接口
* 3. 实现Callable接口
* 4. 线程池
* */

/**
 * @Author WengJiankai
 * @Date 2019-12-11 13:48
 * @Desciption 继承Thread - 创建线程
 */
class MyThread extends Thread {
    public MyThread() {}
    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                /*try {
                    sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }*/
                System.out.println(Thread.currentThread().getName() + ":" + Thread.currentThread().getPriority() + ":" + i);
            }
            if (i % 20 == 0)
                yield();
        }
    }
}

public class CreateThread {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();
        // 为线程命名
        myThread.setName("线程一");
        // 设置线程一的优先级
        myThread.setPriority(Thread.MAX_PRIORITY);
        myThread.start();
        /*MyThread myThread1 = new MyThread("线程二");
        myThread1.start();*/
        // 为主线程命名
        Thread.currentThread().setName("主线程");
        Thread.currentThread().setPriority(Thread.MIN_PRIORITY);
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0)
                System.out.println(Thread.currentThread().getName() + ":" + Thread.currentThread().getPriority() + ":" + i);
            /*if (i == 20) {
                try {
                    myThread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }*/
        }
        System.out.println(myThread.isAlive());  // false
    }
}
