package com.wheelconnect.controller;

import com.wheelconnect.Security.JwtUtil;
import com.wheelconnect.dto.LoginRequest;
import com.wheelconnect.entity.UserEntity;
import com.wheelconnect.repositories.userrepo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final userrepo userrepo;
    private final PasswordEncoder passwordEncoder;

    public AuthController(JwtUtil jwtUtil, userrepo userrepo, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userrepo = userrepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public UserEntity login(@RequestBody LoginRequest request, HttpServletResponse response) {

        UserEntity user = userrepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        Cookie cookie = new Cookie("wheelconnect_token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);

        response.addCookie(cookie);

        return user;
    }
}