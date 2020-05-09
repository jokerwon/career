package com.demo3;

import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author WengJiankai
 * @Date 2019-12-10 16:34
 * @Desciption 使用 Lock锁（since JDK5.0）解决线程安全问题
 *
 * synchronized 和 Lock的异同？
 * 相同点：都可以解决线程安全问题
 * 不同点：synchronized在执行完相应的同步代码后自动释放同步监视器，
 *        Lock需要手动启动同步（lock()）,结束同步也需要手动实现（unlock()）
 * 优先使用顺序
 * Lock => 同步代码块 => 同步方法
 */
public class LockTest {

    public static void main(String[] args) {
        Window w = new Window();
        Thread t1 = new Thread(w);
        Thread t2 = new Thread(w);
        Thread t3 = new Thread(w);
        t1.setName("线程一");
        t2.setName("线程二");
        t3.setName("线程三");
        t1.start();
        t2.start();
        t3.start();
    }
}

class Window implements Runnable {

    private int ticket = 100;
    //1.实例化
    private ReentrantLock lock = new ReentrantLock();

    public void run() {
        while (true) {
            try {
                //2.调用锁定方法
                lock.lock();
                if (ticket > 0) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + ": 票号" + ticket);
                    ticket --;
                } else break;
            } finally {
                //3. 调用解锁方法
                lock.unlock();
            }
        }
    }
}