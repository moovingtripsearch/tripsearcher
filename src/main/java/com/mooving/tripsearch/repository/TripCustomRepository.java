package com.mooving.tripsearch.repository;

import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import org.springframework.data.elasticsearch.core.SearchHits;

public interface TripCustomRepository {
    SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters);

    SearchHits<Trip> searchAll();
}
