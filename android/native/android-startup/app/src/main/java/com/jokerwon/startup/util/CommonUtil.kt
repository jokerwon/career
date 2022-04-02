package com.jokerwon.startup.util

import android.content.Context
import android.widget.Toast

object CommonUtil {
    fun toast(context: Context, text: String, isLong: Boolean) {
        val duration: Int = if (isLong) Toast.LENGTH_SHORT else Toast.LENGTH_SHORT
        Toast.makeText(context, text, duration).show()
    }
}