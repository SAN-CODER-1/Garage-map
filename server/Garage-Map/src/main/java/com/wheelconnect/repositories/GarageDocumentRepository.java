package com.wheelconnect.repositories;

import com.wheelconnect.entity.GarageDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GarageDocumentRepository extends JpaRepository<GarageDocument, Long> {

    List<GarageDocument> findByGarageId(Long garageId);

}