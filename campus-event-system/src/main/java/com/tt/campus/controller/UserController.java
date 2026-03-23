package com.tt.campus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tt.campus.entity.User;
import com.tt.campus.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        User loggedIn = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedIn == null) {
            throw new RuntimeException("Invalid email or password");
        }
        return loggedIn;
    }
}