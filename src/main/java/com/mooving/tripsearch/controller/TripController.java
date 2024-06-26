package com.mooving.tripsearch.controller;

import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/trip/")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @GetMapping("/search")
    public ResponseEntity<List<Trip>> searchTrip(@RequestParam("user_query") String userQuery, @RequestParam("user_filter") String filters) {
        System.out.println(userQuery);
        UserQuery query = UserQuery.parseJsonStringToEntity(userQuery);

        System.out.println(query);
        UserFilterOptions filterOptions = UserFilterOptions.parseJsonStringToEntity(filters);


        System.out.println(filterOptions);
        ResponseEntity<List<Trip>> res;
        if (query.getOrigin().isBlank() || query.getDestination().isBlank()) {
            res = ResponseEntity.ok(tripService.searchAll().getSearchHits().stream().map(SearchHit::getContent).toList().subList(0, 4));
        } else {
            res = ResponseEntity.ok(tripService.searchTrip(query, filterOptions).getSearchHits().stream().map(SearchHit::getContent).toList());
        }
        System.out.println(res);
        return res;
    }


}
