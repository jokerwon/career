package com.znv.database.demodatabase.controllers.index;

import com.znv.database.demodatabase.dao.MyBatisUserDao;
import com.znv.database.demodatabase.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping
public class BaseController {
    @Autowired
    private MyBatisUserDao myBatisUserDao;

    @RequestMapping("/index")
    public String showIndex(Model model){
        List<User> list = (List<User>) myBatisUserDao.findAllUsers();
        model.addAttribute("user",null);
        model.addAttribute("list",list);
        return "index";
    }

    @RequestMapping("/login")
    public String showLogin(){
        return "login";
    }

    @RequestMapping("/dologin")
    public String doLogin(String username, String password, Model model) {
        User user = (User) myBatisUserDao.getUserByUsername(username);
        System.out.println(user instanceof List);
        boolean flag = password.equals(user.getPassword());
        System.out.println(flag);
        if (user == null ) {
            return "login";
        } else if(!flag){
            return "login";
        }else {
            List<User> list = (List<User>) myBatisUserDao.findAllUsers();
            model.addAttribute("user",user);
            model.addAttribute("list",list);
            return "index";
        }
    }//doLogin end
}
