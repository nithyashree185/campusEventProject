package com.tt.campus.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tt.campus.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by email only
    User findByEmail(String email);

    boolean existsByEmail(String email);
}