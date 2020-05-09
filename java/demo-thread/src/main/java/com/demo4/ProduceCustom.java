package com.demo4;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 13:48
 * @Desciption 生产者消费者问题
 */
public class ProduceCustom {
    public static void main(String[] args) {
        Clerk clerk = new Clerk();
        Producer p1 = new Producer(clerk);
        p1.setName("生产者");
        Customer c1 = new Customer(clerk);
        c1.setName("消费者");
        p1.start();
        c1.start();
    }

}

class Clerk {
    private int productCount = 0;

    public synchronized void produce() {
        if (productCount < 20) {
            productCount++;
            notify();
            System.out.println(Thread.currentThread().getName()+"开始生产第"+productCount+"个产品");
        } else {
            //等待
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    public synchronized void consume() {
        if (productCount > 0) {
            System.out.println(Thread.currentThread().getName()+"开始消费第"+productCount+"个产品");
            productCount--;
            notify();
        } else {
            //等待
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class Producer extends Thread {
    private Clerk clerk;

    public Producer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(getName()+"开始生产");
        while (true) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            clerk.produce();
        }
    }
}

class Customer extends Thread {
    private Clerk clerk;

    public Customer(Clerk clerk) {
        this.clerk = clerk;
    }

    @Override
    public void run() {
        System.out.println(getName()+"开始消费");
        while (true) {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            clerk.consume();
        }
    }
}
