package com.trip.TripProject.repository;

import com.trip.TripProject.helper.UserFilterOptions;
import com.trip.TripProject.helper.UserQuery;
import com.trip.TripProject.helper.UserSortOptions;
import com.trip.TripProject.model.Trip;
import org.springframework.data.elasticsearch.core.SearchHits;

public interface TripCustomRepository {
    SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters, UserSortOptions sortOptions);
}
