package com.mooving.tripsearch.controller;

import com.mooving.tripsearch.model.PointOfInterest;
import com.mooving.tripsearch.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/points")
public class PointController {
    @Autowired
    private PointService pointService;

    @GetMapping(path = "/suggest")
    public ResponseEntity<List<PointOfInterest>> suggestPoints(@RequestParam String query, @RequestParam(name = "trip_type") String tripType) {
        System.out.println(query);
        Sort sort = Sort.by(Sort.Direction.ASC, "name.keyword");
        Pageable pageable = PageRequest.of(0, 20);
        List<PointOfInterest> pointOfInterests = this.pointService.suggest(query, tripType, pageable);
        System.out.println(pointOfInterests);

        return ResponseEntity.ok(pointOfInterests);
    }

}
