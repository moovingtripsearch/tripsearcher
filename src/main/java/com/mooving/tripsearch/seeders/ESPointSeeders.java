package com.mooving.tripsearch.seeders;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mooving.tripsearch.model.Point;
import com.mooving.tripsearch.service.PointService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class ESPointSeeders {

    @Autowired
    private PointService pointService;

    private boolean isInitialized() {
        return pointService.count() > 0;
    }

    @PostConstruct
    public void seedData() {
        if (!isInitialized()) {
            try {
                // Load JSON file
                ClassPathResource resource = new ClassPathResource("seeder_data/points.json");
                ObjectMapper mapper = new ObjectMapper();

                // Parse JSON file to list of points
                List<Point> points = mapper.readValue(resource.getInputStream(), new TypeReference<>() {
                });

                // Save points to Elasticsearch
                pointService.saveAll(points);
                System.out.println("Points data seeded successfully.");
            } catch (IOException e) {
                e.printStackTrace();
                System.err.println("Failed to seed points data.");
            }
        }
    }
}
