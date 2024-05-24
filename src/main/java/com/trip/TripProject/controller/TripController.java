package com.trip.TripProject.controller;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.security.GetUserRequest;
import co.elastic.clients.elasticsearch.security.get_token.UserRealm;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.trip.TripProject.helper.TripType;
import com.trip.TripProject.helper.UserFilterOptions;
import com.trip.TripProject.helper.UserQuery;
import com.trip.TripProject.helper.UserSortOptions;
import com.trip.TripProject.model.LuggageType;
import com.trip.TripProject.model.Trip;
import com.trip.TripProject.repository.TripCustomRepository;
import com.trip.TripProject.service.TripService;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/trip/")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @GetMapping("/search")
    public SearchHits<Trip> searchTrip(@RequestParam("user_query") String userQuery, @RequestParam("user_filter") String filters) {
        System.out.println(userQuery);
        UserQuery query = UserQuery.parseJsonStringToEntity(userQuery);
        System.out.println(query);
        UserFilterOptions filterOptions = UserFilterOptions.parseJsonStringToEntity(filters);
        System.out.println(filterOptions);
        return tripService.searchTrip(query, filterOptions, null);
    }
}
