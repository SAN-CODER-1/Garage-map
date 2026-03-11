package com.wheelconnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long garageId;
    private Long bookingId;

    private int rating;

    @Column(length = 500)
    private String reviewComment;

    private int serviceQuality;
    private int punctuality;
    private int costFairness;

    private LocalDateTime createdAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getGarageId() {
		return garageId;
	}

	public void setGarageId(Long garageId) {
		this.garageId = garageId;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getReviewComment() {
		return reviewComment;
	}

	public void setReviewComment(String reviewComment) {
		this.reviewComment = reviewComment;
	}

	public int getServiceQuality() {
		return serviceQuality;
	}

	public void setServiceQuality(int serviceQuality) {
		this.serviceQuality = serviceQuality;
	}

	public int getPunctuality() {
		return punctuality;
	}

	public void setPunctuality(int punctuality) {
		this.punctuality = punctuality;
	}

	public int getCostFairness() {
		return costFairness;
	}

	public void setCostFairness(int costFairness) {
		this.costFairness = costFairness;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    // Getters and Setters
}