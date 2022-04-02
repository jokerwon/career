package com.jokerwon.startup.ui.activity

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.jokerwon.startup.databinding.ActivitySecondBinding
import com.jokerwon.startup.util.CommonUtil

class SecondActivity : AppCompatActivity() {
    private lateinit var binding: ActivitySecondBinding
    private lateinit var timeChangeReceiver: TimeChangeReceiver

    private fun initUI() {
        // 隐藏默认导航栏
        supportActionBar?.hide()

        binding = ActivitySecondBinding.inflate(layoutInflater)
        val stringArrayExtra: String? = intent.getStringExtra("extraData")
        val textView = binding.textview;
        if (stringArrayExtra != null && stringArrayExtra.isNotEmpty()) {
            Log.d("SecondActivity", "onCreate: $stringArrayExtra")
            textView.text = stringArrayExtra;
        }
        binding.sendBroadcastBtn.setOnClickListener {
            val intent = Intent("com.jokerwon.startup.MY_BROADCAST")
            /**
             * NOTE:
             * 在Android 8.0系统之后，静态注册的BroadcastReceiver是无法接收隐式广播的，而默认情况下我们发出的自定义广播恰恰都是隐式广播。
             * 因此这里一定要调用setPackage()方法，指定这条广播是发送给哪个应用程序的，从而让它变成一条显式广播，
             * 否则静态注册的BroadcastReceiver将无法接收到这条广播。
             */
            intent.setPackage(packageName)
            sendBroadcast(intent)
        }

        // NOTE: 此处如果继续使用 R 来引用资源，会导致 Line24 的修改失效
//        setContentView(R.layout.activity_second)
        val rootView = binding.root;
        setContentView(rootView)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        initUI()

        // 动态注册广播监听
        val intentFilter = IntentFilter()
        intentFilter.addAction("android.intent.action.TIME_TICK")
        timeChangeReceiver = TimeChangeReceiver()
        // 注册广播监听实例
        registerReceiver(timeChangeReceiver, intentFilter)
    }

    override fun onDestroy() {
        super.onDestroy()
        unregisterReceiver(timeChangeReceiver)
    }

    inner class TimeChangeReceiver: BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            CommonUtil.toast(context, "onReceive", true)
        }
    }
}