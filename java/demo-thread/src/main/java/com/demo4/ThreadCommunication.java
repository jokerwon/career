package com.demo4;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 10:54
 * @Desciption 线程通信举例
 *
 * wait(): 调用此方法的线程会进入阻塞状态，并释放同步监视器
 * notify(): 唤醒被 wait()的一个线程。如果有多个被wait的线程，则唤醒优先级高的。
 * notifyAll(): 唤醒所有被wait的线程
 *
 * 注意：
 * 1. 这三个方法必须使用在同步代码块或者同步方法中
 * 2. 这三个方法的调用者必须是<b>同步监视器<b/>
 * 3. 这三个方法定义在 Object下。
 *
 * sleep() 和 wait() 的异同
 * 相同点：都可以使当前线程进入阻塞状态
 * 不同点：1) 二者声明的位置不同。Thread.sleep(), new Object().wait()
 *        2) 调用场景不同。sleep()可以在任何场景下调用，wait()只能在同步代码块或同步方法中调用
 *        3) 如果二者都用在同步中，sleep()不会释放同步监视器，wait()会释放
 *        4） 被sleep的线程会在指定时间后自动唤醒，被wait的线程需要手动调用notify()/notifyAll()唤醒。
 */
public class ThreadCommunication {
    public static void main(String[] args) {
        Number number = new Number();
        Thread t1 = new Thread(number);
        Thread t2 = new Thread(number);
        t1.start();
        t2.start();
    }
}

class Number implements Runnable{
    private int number = 1;
    private Object object = new Object();

    public void run() {
        while (true) {
            synchronized (object) {
                //唤醒另一个线程
                object.notify();
                if (number <= 100) {
                    System.out.println(Thread.currentThread().getName() + ":" + number);
                    number++;

                    try {
                        //使调用wait()的线程进入阻塞状态
                        object.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else break;
            }
        }
    }
}
