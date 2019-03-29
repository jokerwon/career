package com.annotation.repository;

import org.springframework.stereotype.Repository;

@Repository
public class UserJDBCRepository implements UserRepository {
    @Override
    public void save() {
        System.out.println("UserJDBCRepository save...");
    }
}
