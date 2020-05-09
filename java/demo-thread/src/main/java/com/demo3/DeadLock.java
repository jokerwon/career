package com.demo3;

/**
 * @Author WengJiankai
 * @Date 2019-12-10 15:58
 * @Desciption 演示死锁问题
 * 死锁：死锁是指两个或两个以上的线程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象，
 *      若无外力作用，它们都将无法推进下去。
 *      此时称系统处于死锁状态或系统产生了死锁，这些永远在互相等待的进程称为死锁进程。
 * 出现死锁后，不会抛异常，不会出现提示，所有的线程都处于阻塞状态，无法继续。
 */
public class DeadLock {


    public static void main(String[] args) {

        final StringBuffer s1 = new StringBuffer();
        final StringBuffer s2 = new StringBuffer();
        new Thread() {
            @Override
            public void run() {
                synchronized (s1) {
                    s1.append("a");
                    s2.append("1");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s2) {
                        s1.append("b");
                        s2.append("2");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }.start();

        new Thread(new Runnable() {
            public void run() {
                synchronized (s2) {
                    s1.append("c");
                    s2.append("3");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    synchronized (s1) {
                        s1.append("d");
                        s2.append("4");

                        System.out.println(s1);
                        System.out.println(s2);
                    }
                }
            }
        }).start();
    }
}
