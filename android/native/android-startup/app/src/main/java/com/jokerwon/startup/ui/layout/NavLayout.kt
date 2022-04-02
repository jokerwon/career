package com.jokerwon.startup.ui.layout

import android.app.Activity
import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.LayoutInflater
import android.widget.LinearLayout
import android.widget.Toast
import com.jokerwon.startup.R
import com.jokerwon.startup.databinding.NavBarBinding

/**
 * @description 携带导航栏的布局
 */
class NavLayout : LinearLayout {
    private lateinit var binding: NavBarBinding

    constructor(context: Context, attrs: AttributeSet) : super(context, attrs) {
        val layoutInflater = LayoutInflater.from(context)
        binding = NavBarBinding.inflate(layoutInflater);
        // FIXME 使用 binding 引用导致设置监听无效
        binding.backNavBarButton.setOnClickListener {
            val activity = context as Activity
            activity.finish()
        }
        binding.editNavBarButton.setOnClickListener {
            Toast.makeText(context, "Edit button is clicked.", Toast.LENGTH_SHORT).show()
        }

        layoutInflater.inflate(R.layout.nav_bar, this)
    }

}