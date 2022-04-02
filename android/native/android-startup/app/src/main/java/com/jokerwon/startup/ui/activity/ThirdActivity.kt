package com.jokerwon.startup.ui.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.jokerwon.startup.R
import com.jokerwon.startup.api.AppService
import com.jokerwon.startup.data.App
import com.jokerwon.startup.databinding.ActivityThirdBinding
import com.jokerwon.startup.util.ServiceCreator
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class ThirdActivity : AppCompatActivity() {
    private lateinit var binding: ActivityThirdBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityThirdBinding.inflate(layoutInflater)

        binding.searchButton.setOnClickListener {
            val appService = ServiceCreator.create<AppService>()
            appService.getAppList().enqueue(object : Callback<List<App>> {
                override fun onResponse(call: Call<List<App>>, response: Response<List<App>>) {
                    val list = response.body()
                    if (list != null) {
                        for (app in list) {
                            Log.d("ThirdActivity", "onResponse: id=${app.id},name=${app.name}")
                        }
                    }
                }

                override fun onFailure(call: Call<List<App>>, t: Throwable) {
                    t.printStackTrace()
                }
            })
        }

        setContentView(binding.root)
    }
}