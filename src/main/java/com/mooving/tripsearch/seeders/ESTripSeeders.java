package com.mooving.tripsearch.seeders;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mooving.tripsearch.model.PointOfInterest;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.service.TripService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ESTripSeeders {

    @Autowired
    private TripService tripService;

    private boolean isInitialized() {
        return tripService.count() > 0;
    }

    @PostConstruct
    public void seedData() {
        if (!isInitialized()) {
            try {
                // Load JSON file
                ClassPathResource resource = new ClassPathResource("seeder_data/generated_trips.json");

                ObjectMapper mapper = new ObjectMapper();

                // Parse JSON file to list of points
                List<Trip> trips = mapper.readValue(resource.getInputStream(), new TypeReference<>() {
                });

                // Save points to Elasticsearch
                tripService.saveAll(trips);
                System.out.println("Points data seeded successfully.");
            } catch (IOException e) {
                e.printStackTrace();
                System.err.println("Failed to seed points data.");
            }
        }
    }
}
