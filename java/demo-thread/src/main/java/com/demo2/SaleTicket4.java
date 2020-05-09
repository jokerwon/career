package com.demo2;

/**
 * @Author WengJiankai
 * @Date 2019-09-05 20:30
 * @Desciption 继承的同步机制  [同步方法]
 */
public class SaleTicket4 extends Thread {
    private static int ticket = 100;

    public void run() {
        while (true) {
            show();
        }
    }

    //    private synchronized void show() {  //同步监视器 st、st1、st2
    private static synchronized void show() {  //同步监视器 SaleTicket4.class
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
        SaleTicket4 st = new SaleTicket4();
        SaleTicket4 st1 = new SaleTicket4();
        SaleTicket4 st2 = new SaleTicket4();
        st.setName("窗口一");
        st1.setName("窗口二");
        st2.setName("窗口三");
        st.start();
        st1.start();
        st2.start();
    }
}
