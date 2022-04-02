package com.jokerwon.startup

fun main() {
    val const = "Hello"
    var variable = "Kotlin"
    var num: Int = 123
    num = 32
    val welcome = test("Joker")
    println(const + variable)
    println(welcome)
}

fun test(name: String): String {
    return "hello$name";
}

fun max(num1: Int, num2: Int): Int {
    return max(num1, num2)
}

// NOTE: if 语句有返回值
fun largeNum(num1: Int, num2: Int): Int {
    return if (num1 >= num2) {
        num1
    } else {
        num2
    }
}

// 语法糖
// 函数只有一行代码时可以省略函数体
fun largeNum2(num1: Int, num2: Int) = if (num1 >= num2) {
    num1
} else {
    num2
};

// when 语句
fun getScore(name: String) = when (name) {
    "Tom" -> 23
    "Joker" -> 43
    else -> 0
}
// 类型匹配
fun validateNumber(num: Number) {
    when (num) {
        is Int -> println("num is Int")
        is Double -> println("num is Double")
        else -> println("num not support")
    }
}
// when 中不传参数
fun getScore1(name: String) = when  {
        name.startsWith("1") -> 32
        name == "Tom" -> 86
        else -> 0
    }
