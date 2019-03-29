package com.znv.database.demodatabase.dao;

import com.znv.database.demodatabase.pojo.Employee;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDao {
    public Employee getEmpAndDept(int id);
}
