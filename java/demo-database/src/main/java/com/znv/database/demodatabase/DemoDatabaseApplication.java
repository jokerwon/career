package com.znv.database.demodatabase;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.znv.database.demodatabase.dao")
public class DemoDatabaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoDatabaseApplication.class, args);
    }

}
