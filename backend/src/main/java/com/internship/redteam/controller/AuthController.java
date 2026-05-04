package com.internship.redteam.controller;

import com.internship.redteam.entity.User;
import com.internship.redteam.security.JwtUtil;
import com.internship.redteam.service.UserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private JwtUtil jwtUtil;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User dbUser = userService.login(user.getEmail(), user.getPassword());

        if (dbUser == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // 🔥 IMPORTANT (ROLE INCLUDED)
        String token = jwtUtil.generateToken(dbUser.getEmail(), dbUser.getRole());

        return ResponseEntity.ok(token);
    }
}