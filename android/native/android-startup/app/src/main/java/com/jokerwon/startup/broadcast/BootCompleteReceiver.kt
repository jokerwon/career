package com.jokerwon.startup.broadcast

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.jokerwon.startup.util.CommonUtil

class BootCompleteReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        // This method is called when the BroadcastReceiver is receiving an Intent broadcast.
        CommonUtil.toast(context, "已开机", true)
    }
}