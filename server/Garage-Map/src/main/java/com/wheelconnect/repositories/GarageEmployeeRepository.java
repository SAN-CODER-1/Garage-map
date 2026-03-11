package com.wheelconnect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wheelconnect.entity.GarageEmployee;

import java.util.List;

public interface GarageEmployeeRepository extends JpaRepository<GarageEmployee, Long> {

    List<GarageEmployee> findByGarageId(Long garageId);

    List<GarageEmployee> findByAvailabilityStatus(String availabilityStatus);

}