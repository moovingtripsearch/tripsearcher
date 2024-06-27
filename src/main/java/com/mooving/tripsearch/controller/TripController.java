package com.mooving.tripsearch.controller;

import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/trip")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @GetMapping("/search")
    public ResponseEntity<List<Trip>> searchTrip(@RequestParam("query") String userQuery, @RequestParam("filters") String filters) {
        UserQuery query = UserQuery.parseJsonStringToEntity(userQuery);
        UserFilterOptions filterOptions = UserFilterOptions.parseJsonStringToEntity(filters);
        ResponseEntity<List<Trip>> res;
        if ((query.getOrigin() == null || query.getOrigin().isBlank()) && (query.getDestination() == null || query.getDestination().isBlank())) {
            int count = 5;
            Pageable pageable = PageRequest.ofSize(count);
            res = ResponseEntity.ok(tripService.findAll(pageable));
        } else {
            res = ResponseEntity.ok(tripService.searchTrip(query, filterOptions).getSearchHits().stream().map(SearchHit::getContent).toList());
        }
        System.out.println(res);
        return res;
    }


}
