package com.jokerwon.startup.util

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ServiceCreator {
    // 10.0.2.2 会映射到本机的 127.0.0.1
    private const val BASE_URL = "http://10.0.2.2:3003/"

    val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build();

    // 泛型实化
    inline fun <reified T> create(): T = retrofit.create(T::class.java)
}