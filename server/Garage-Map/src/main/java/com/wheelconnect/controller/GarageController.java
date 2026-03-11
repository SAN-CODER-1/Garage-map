package com.wheelconnect.controller;

import com.wheelconnect.entity.GarageEntity;
import com.wheelconnect.repositories.GarageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/garages")
public class GarageController {

    @Autowired
    private GarageRepository garageRepository;

    // Create Garage
    @PostMapping
    public GarageEntity createGarage(@RequestBody GarageEntity garage) {
        return garageRepository.save(garage);
    }

    // Get all garages
    @GetMapping
    public List<GarageEntity> getAllGarages() {
        return garageRepository.findAll();
    }

    // Get garage by id
    @GetMapping("/{id}")
    public Optional<GarageEntity> getGarageById(@PathVariable Long id) {
        return garageRepository.findById(id);
    }

    // Update garage
    @PutMapping("/{id}")
    public GarageEntity updateGarage(@PathVariable Long id, @RequestBody GarageEntity updatedGarage) {

    	GarageEntity garage = garageRepository.findById(id).orElseThrow();

        garage.setGarageName(updatedGarage.getGarageName());
        garage.setAddress(updatedGarage.getAddress());
        garage.setGarageType(updatedGarage.getGarageType());
        garage.setYearsOfService(updatedGarage.getYearsOfService());
        garage.setServiceQualityScore(updatedGarage.getServiceQualityScore());
        garage.setTrustScore(updatedGarage.getTrustScore());
        garage.setDocumentsVerified(updatedGarage.getDocumentsVerified());

        return garageRepository.save(garage);
    }

    // Delete garage
    @DeleteMapping("/{id}")
    public String deleteGarage(@PathVariable Long id) {
        garageRepository.deleteById(id);
        return "Garage deleted";
    }
}