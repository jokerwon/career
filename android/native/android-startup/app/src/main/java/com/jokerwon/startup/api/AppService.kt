package com.jokerwon.startup.api

import com.jokerwon.startup.data.App
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface AppService {

    @GET("app")
    fun getAppList(): Call<List<App>>

    @GET("app/{id}")
    fun getApp(@Path("id") id: Int): Call<App>

    @GET("app")
    fun getAppList(@Query("name") name: String): Call<List<App>>
}