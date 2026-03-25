package com.wheelconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.wheelconnect.Exception.ExceptionMessage;
import com.wheelconnect.Security.JwtUtil;
import com.wheelconnect.entity.UserEntity;
import com.wheelconnect.repositories.userrepo;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:8081", allowCredentials = "true")
public class UserController {

    private final userrepo userrepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(userrepo userrepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userrepo = userrepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // IMPORTANT: place this before /{id}
    @GetMapping("/me")
    public UserEntity getCurrentUser(HttpServletRequest request) {

        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("wheelconnect_token")) {
                    token = cookie.getValue();
                }
            }
        }

        if (token == null) {
            throw new ExceptionMessage("Unauthorized");
        }

        String email = jwtUtil.extractUsername(token);

        return userrepo.findByEmail(email)
                .orElseThrow(() -> new ExceptionMessage("User not found"));
    }

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userrepo.findAll();
    }

    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable Long id) {
        return userrepo.findById(id)
                .orElseThrow(() -> new ExceptionMessage("User not found with id: " + id));
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {

        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(hashedPassword);

        UserEntity savedUser = userrepo.save(user);

        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/{id}")
    public UserEntity updateUser(@PathVariable Long id, @RequestBody UserEntity user) {

        UserEntity existingUser = userrepo.findById(id)
                .orElseThrow(() -> new ExceptionMessage("User not found"));

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setSubscriptionPlan(user.getSubscriptionPlan());
        existingUser.setAccountStatus(user.getAccountStatus());

        return userrepo.save(existingUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        UserEntity user = userrepo.findById(id)
                .orElseThrow(() -> new ExceptionMessage("User not found"));

        userrepo.delete(user);

        return ResponseEntity.noContent().build();
    }
}