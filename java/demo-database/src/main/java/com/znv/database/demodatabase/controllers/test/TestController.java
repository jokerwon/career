package com.znv.database.demodatabase.controllers.test;

import com.znv.database.demodatabase.pojo.User;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/test")
public class TestController {
    @PostMapping(value = "/castbean")
    @ResponseBody
    public String jsonToBean(@RequestBody String jsonStr){
        //将接受的 JSON 字符串转为 JSON 对象
        JSONObject jsonObject = JSONObject.fromObject(jsonStr);
        //将 JSON 对象转为 Java 对象
        User user = (User) JSONObject.toBean(jsonObject, User.class);
        System.out.println(user);
        //return user.toString();
        System.out.println(jsonStr);
        System.out.println(jsonObject);
        return "{'result':ok}";
    }
}
