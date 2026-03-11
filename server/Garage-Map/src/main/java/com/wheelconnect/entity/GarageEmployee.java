package com.wheelconnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "garage_employees")
public class GarageEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "garage_id")
    private Long garageId;

    @Column(name = "employee_name")
    private String employeeName;

    @Column(name = "experience_years")
    private int experienceYears;

    private String specialization;

    private double rating;

    @Column(name = "availability_status")
    private String availabilityStatus;

    // Constructors
    public GarageEmployee() {}

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public Long getGarageId() {
        return garageId;
    }

    public void setGarageId(Long garageId) {
        this.garageId = garageId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }
}