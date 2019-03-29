package com.znv.database.demodatabase.controllers.management;

import com.znv.database.demodatabase.dao.MyBatisUserDao;
import com.znv.database.demodatabase.pojo.User;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/management/user")
public class UserController {
    @Autowired
    private MyBatisUserDao myBatisUserDao;

    //设定返回值类型为 JSON 字符串
    @RequestMapping(value = "/insert", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String insertUser(int id, String username, String password){
        User user = new User(id, username, password);
        int flag = myBatisUserDao.insertUser(user);
        JSONObject result = new JSONObject();
        result.put("success",flag);
        return result.toString();
    }

    @RequestMapping(value = "/delete", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteUser(String username){
        int flag = myBatisUserDao.deleteUser(username);
        JSONObject result = new JSONObject();
        result.put("success",flag);
        return result.toString();
    }

    @PostMapping(value = "/update", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String updateUser(@RequestBody User user){  //@RequestBody String jsonStr
        //将 json 字符串转换为 json 对象
        //JSONObject jsonObject = JSONObject.fromObject(jsonStr);
        //将 json 对象转换为 bean
        //User user = (User) JSONObject.toBean(jsonObject, User.class);
        int flag = myBatisUserDao.updateUser(user);
        JSONObject result = new JSONObject();
        result.put("success",flag);
        return result.toString();
    }

    @RequestMapping(value = "/getuser/{username}", produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String getUserByUsername(@PathVariable("username") String username){
        JSONObject result = JSONObject.fromObject(myBatisUserDao.getUserByUsername(username));
        return result.toString();
    }

}
