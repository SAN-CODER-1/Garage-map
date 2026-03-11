package com.wheelconnect.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.wheelconnect.Exception.ExceptionMessage;
import com.wheelconnect.entity.UserEntity;
import com.wheelconnect.repositories.userrepo;

@RestController
@RequestMapping("/auth/users")
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {

    private final userrepo userrepo;
    private final PasswordEncoder passwordEncoder;

    public UserController(userrepo userrepo, PasswordEncoder passwordEncoder) {
        this.userrepo = userrepo;
        this.passwordEncoder = passwordEncoder;
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
                .orElseThrow(() -> new ExceptionMessage("User not found with id: " + id));

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
                .orElseThrow(() -> new ExceptionMessage("User not found with id: " + id));

        userrepo.delete(user);

        return ResponseEntity.noContent().build();
    }
}