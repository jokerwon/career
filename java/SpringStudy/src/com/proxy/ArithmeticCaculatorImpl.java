package com.proxy;

public class ArithmeticCaculatorImpl implements ArithmeticCaculator {
    @Override
    public int add(int i, int j) {
        int result = i + j;
        return i + j;
    }

    @Override
    public int sub(int i, int j) {
        return i - j;
    }

    @Override
    public int mul(int i, int j) {
        return i * j;
    }

    @Override
    public int div(int i, int j) {
        return i / j;
    }
}
