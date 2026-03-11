package com.wheelconnect.controller;

import com.wheelconnect.entity.ServiceHistory;
import com.wheelconnect.repositories.ServiceHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service-history")
public class ServiceHistoryController {

    private final ServiceHistoryRepository repository;

    public ServiceHistoryController(ServiceHistoryRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ServiceHistory addServiceHistory(@RequestBody ServiceHistory history) {
        return repository.save(history);
    }

    @GetMapping
    public List<ServiceHistory> getAllHistory() {
        return repository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<ServiceHistory> getUserHistory(@PathVariable Long userId) {
        return repository.findByUserId(userId);
    }
}