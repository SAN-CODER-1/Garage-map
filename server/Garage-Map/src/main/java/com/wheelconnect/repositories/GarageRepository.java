package com.wheelconnect.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wheelconnect.entity.GarageEntity;

public interface GarageRepository extends JpaRepository<GarageEntity, Long> {

	GarageEntity findByOwnerId(Long id);
}