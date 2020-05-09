package com.demo2;

/**
 * @Author WengJiankai
 * @Date 2019-09-05 20:30
 * @Desciption 继承的同步机制 [同步代码块]
 */
public class SaleTicket2 extends Thread {
    private static int ticket = 100;

    private static Object obj = new Object();

    @Override
    public void run() {
        while (true) {
            //synchronized (this) {  //主函数中实例化了三个对象，如果用this，同步监视器中的this指向的不是同一个对象
            synchronized (obj) {
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
        SaleTicket2 st1 = new SaleTicket2();
        SaleTicket2 st2 = new SaleTicket2();
        SaleTicket2 st3 = new SaleTicket2();
        st1.setName("窗口一");
        st2.setName("窗口二");
        st3.setName("窗口三");
        st1.start();
        st2.start();
        st3.start();
    }
}
