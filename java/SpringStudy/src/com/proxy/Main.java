package com.proxy;

public class Main {
    public static void main(String[] args) {
        ArithmeticCaculator target = new ArithmeticCaculatorImpl();
        ArithmeticCaculator proxy = new ArithmeticCaculatorLoggingProxy(target).getLoggingProxy();

        int result = proxy.add(1,2);
        System.out.println(result);
        result = proxy.div(4,2);
        System.out.println(result);
    }
}
