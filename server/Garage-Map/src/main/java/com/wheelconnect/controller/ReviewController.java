package com.wheelconnect.controller;

import com.wheelconnect.entity.Review;
import com.wheelconnect.repositories.ReviewRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewRepository repository;

    public ReviewController(ReviewRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return repository.save(review);
    }

    @GetMapping("/garage/{garageId}")
    public List<Review> getGarageReviews(@PathVariable Long garageId) {
        return repository.findByGarageId(garageId);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return repository.findAll();
    }
}