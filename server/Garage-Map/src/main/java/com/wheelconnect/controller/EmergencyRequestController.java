package com.wheelconnect.controller;

import com.wheelconnect.entity.EmergencyRequest;
import com.wheelconnect.repositories.EmergencyRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emergency")
public class EmergencyRequestController {

    private final EmergencyRequestRepository repository;

    public EmergencyRequestController(EmergencyRequestRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public EmergencyRequest createEmergency(@RequestBody EmergencyRequest request) {
        return repository.save(request);
    }

    @GetMapping("/user/{userId}")
    public List<EmergencyRequest> getUserEmergencies(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }

}