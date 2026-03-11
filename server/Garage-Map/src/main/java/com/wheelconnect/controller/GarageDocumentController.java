package com.wheelconnect.controller;

import com.wheelconnect.entity.GarageDocument;
import com.wheelconnect.repositories.GarageDocumentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/garage-documents")
public class GarageDocumentController {

    private final GarageDocumentRepository repository;

    public GarageDocumentController(GarageDocumentRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public GarageDocument uploadDocument(@RequestBody GarageDocument doc) {
        return repository.save(doc);
    }

    @GetMapping("/garage/{garageId}")
    public List<GarageDocument> getGarageDocuments(@PathVariable Long garageId) {
        return repository.findByGarageId(garageId);
    }

}