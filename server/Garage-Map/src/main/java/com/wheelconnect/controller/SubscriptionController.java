package com.wheelconnect.controller;

import com.wheelconnect.entity.Subscription;
import com.wheelconnect.repositories.SubscriptionRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subscriptions")
public class SubscriptionController {

    private final SubscriptionRepository repository;

    public SubscriptionController(SubscriptionRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Subscription createSubscription(@RequestBody Subscription sub) {
        return repository.save(sub);
    }

    @GetMapping("/user/{userId}")
    public Subscription getUserSubscription(@PathVariable Long userId) {
        return repository.findByUserId(userId).orElse(null);
    }
}