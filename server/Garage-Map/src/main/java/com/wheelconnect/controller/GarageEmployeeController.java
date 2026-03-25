package com.wheelconnect.controller;

import com.wheelconnect.entity.GarageEmployee;
import com.wheelconnect.repositories.GarageEmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:8081", allowCredentials = "true")
public class GarageEmployeeController {

    private final GarageEmployeeRepository repository;

    public GarageEmployeeController(GarageEmployeeRepository repository) {
        this.repository = repository;
    }

    // create employee
    @PostMapping
    public GarageEmployee addEmployee(@RequestBody GarageEmployee employee) {
        return repository.save(employee);
    }

    // get all employees
    @GetMapping
    public List<GarageEmployee> getAllEmployees() {
        return repository.findAll();
    }

    // get employees by garage
    @GetMapping("/garage/{garageId}")
    public List<GarageEmployee> getGarageEmployees(@PathVariable Long garageId) {
        return repository.findByGarageId(garageId);
    }

    // update availability
    @PutMapping("/{id}/availability")
    public GarageEmployee updateAvailability(
            @PathVariable Long id,
            @RequestParam String status) {

        GarageEmployee emp = repository.findById(id).orElseThrow();
        emp.setAvailabilityStatus(status);
        return repository.save(emp);
    }

    // delete employee
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        repository.deleteById(id);
    }
}