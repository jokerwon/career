package com.jokerwon.startup.ui.activity

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.widget.Toast
import com.jokerwon.startup.R
import com.jokerwon.startup.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding

    private fun toast(text: String, isLong: Boolean) {
        val duration: Int = if (isLong) Toast.LENGTH_SHORT else Toast.LENGTH_SHORT
        Toast.makeText(this, text, duration).show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 常规
//        setContentView(R.layout.activity_main)
//        val button: Button = findViewById<Button>(R.id.button)
//        button.setOnClickListener {
//            Toast.makeText(this, "Clicked", Toast.LENGTH_SHORT).show()
//        }

        // 使用 ViewBinding 后
        // layoutInflater 是Kotlin语法糖，实际调用了父类 Activity 的 getLayoutInflater 方法
        binding = ActivityMainBinding.inflate(layoutInflater)

        binding.exitButton.setOnClickListener {
//            toast("Clicked", false)
            finish() // 销毁当前 Activity
        }

        binding.explicitIntentButton.setOnClickListener{
            // 显式Intent
            val intent = Intent(this, SecondActivity::class.java)
            val data = "Hello Second from Main"
            intent.putExtra("extraData", data)
            // 启动 Activity，并期待返回当前Activity时获取返回数据
            startActivityForResult(intent, RESULT_OK)
        }

        binding.implicitIntentButton.setOnClickListener{
            // 隐式Intent
            val intent = Intent("com.jokerwon.startup.ACTION_START")
            intent.addCategory("com.jokerwon.startup.MY_CATEGORY")
            startActivity(intent)
        }

        binding.openWebView.setOnClickListener{
            // 启动其他程序的 Activity
            // 打开网页
            val intent = Intent(Intent.ACTION_VIEW);
            intent.data = Uri.parse("https://www.baidu.com")
            startActivity(intent)
        }

        binding.openDialogue.setOnClickListener{
            // 启动其他程序的 Activity
            // 打开拨号盘
            val intent = Intent(Intent.ACTION_DIAL);
            intent.data = Uri.parse("tel:10086")
            startActivity(intent)
        }
        binding.goToThirdBtn.setOnClickListener{
            val intent = Intent(this, ThirdActivity::class.java);
            startActivity(intent)
        }

        val rootView = binding.root;
        setContentView(rootView)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main, menu)
        return true // 返回 false 表示不显示菜单
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.add_item -> toast("Clicked Add", true)
            R.id.remove_item -> toast("Clicked Remove", true)
        }
        return true
    }
}