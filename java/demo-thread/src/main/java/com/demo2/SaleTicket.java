package com.demo2;

/**
 * @Author WengJiankai
 * @Date 2019-09-05 20:30
 * @Desciption 同步机制 [Runnable]
 * 方式一: 同步代码块
 * synchronize(同步监视器){
 *     //需要被同步的代码块（操作共享数据的代码），包含的代码块要适量，不宜过多
 *
 * }
 *  说明: 同步监视器，即锁。任何一个类的对象，都可以充当锁。
 *       要求: 多个线程必须要共用同一把锁，即同一个对象。
 *
 * 方式二: 同步方法
 * 如果操作共享数据的代码被完整地声明在一个方法中，不妨将此方法声明为同步的。
 *
 * 好处: 解决了线程的安全问题
 * 局限: 操作同步代码时，只能有一个线程参与，其他进程等待。相当于单线程工作，效率低。
 */
public class SaleTicket implements Runnable {
    private int ticket = 100;
    Object obj = new Object();
    public void run() {
        while (true) {
//            synchronized (this) {
            synchronized (SaleTicket.class) {  // 推断: 类也是对象
                // 慎用 this作同步监视器，考虑使用当前类充当同步监视器
                if (ticket > 0) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + ": 卖票，票号为" + ticket);
                    ticket--;
                } else {
                    break;
                }
            }
        }
    }

    public static void main(String[] args) {
        SaleTicket st = new SaleTicket();
        Thread win1 = new Thread(st);
        win1.setName("窗口一");
        Thread win2 = new Thread(st);
        win2.setName("窗口二");
        Thread win3 = new Thread(st);
        win3.setName("窗口三");
        win2.start();
        win1.start();
        win3.start();
    }
}
