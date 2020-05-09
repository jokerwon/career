package com.demo3;

import java.util.concurrent.locks.ReentrantLock;

/**
 * @Author WengJiankai
 * @Date 2019-12-11 10:16
 * @Desciption
 */
public class SaveMoneyExercise {
    public static void main(String[] args) {
        Account account = new Account(0);
        Customer c1 = new Customer(account);
        Customer c2 = new Customer(account);
        c1.setName("甲");
        c2.setName("乙");
        c1.start();
        c2.start();
    }
}

class Account {
    private double balance;

    public Account(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double balance) {

            if (balance > 0) {
                this.balance += balance;
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName()+"存钱成功，余额为" + this.balance);
            }
    }
}

class Customer extends Thread {
    private Account account;
    private static ReentrantLock lock = new ReentrantLock();

    public Customer(Account account) {
        this.account = account;
    }

    @Override
    public void run() {
        for (int i = 0; i < 3; i++) {
            try {
                lock.lock();
                this.account.deposit(1000);
            } finally {
                lock.unlock();
            }
        }
    }
}
