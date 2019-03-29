package com.znv.database.demodatabase;

import com.znv.database.demodatabase.dao.EmployeeDao;
import com.znv.database.demodatabase.dao.MyBatisUserDao;
import com.znv.database.demodatabase.pojo.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@Configuration
@ComponentScan(basePackages = "com.znv.database.demodatabase")
@SpringBootTest
public class DemoDatabaseApplicationTests {
    @Autowired
    private MyBatisUserDao myBatisUserDao;

    @Autowired
    private EmployeeDao employeeDao;

    @Test
    public void testDelele(){
        int flag = myBatisUserDao.deleteUser("tommy");
        System.out.println(flag);
    }

    @Test
    public void testEmployeeDao(){
        Employee employee = employeeDao.getEmpAndDept(1);
        System.out.println(employee);
        System.out.println(employee.getDepartment());
    }

}
