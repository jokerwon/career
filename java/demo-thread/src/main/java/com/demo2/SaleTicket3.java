package com.demo2;

/**
 * @Author WengJiankai
 * @Date 2019-09-05 20:30
 * @Desciption 实现接口的同步机制 [同步方法]
 */
public class SaleTicket3 implements Runnable {
    private int ticket = 100;

    public void run() {
        while (true) {
            show();
        }
    }

    private synchronized void show() {  //同步监视器 this
        if (ticket > 0) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ": 卖票，票号为" + ticket);
            ticket--;
        }
    }

    public static void main(String[] args) {
        SaleTicket3 st = new SaleTicket3();
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
