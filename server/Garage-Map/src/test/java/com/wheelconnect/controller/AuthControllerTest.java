package com.wheelconnect.controller;

import com.wheelconnect.Security.JwtUtil;
import com.wheelconnect.repositories.userrepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private userrepo userRepo;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void loginShouldFailWhenUserNotFound() throws Exception {
        String loginJson = "{\"email\": \"nonexistent@example.com\", \"password\": \"password\"}";

        mockMvc.perform(post("/auth/login")
                .contentType("application/json")
                .content(loginJson))
                .andExpect(status().isInternalServerError()); // Assuming controller throws exception
    }
}
