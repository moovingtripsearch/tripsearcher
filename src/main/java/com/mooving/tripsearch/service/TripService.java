package com.mooving.tripsearch.service;

import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.repository.TripCustomRepository;
//import com.trip.Tripsearch.repository.TripRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

@Service
@Data
@RequiredArgsConstructor
public class TripService {
    //    private final TripRepository tripRepository;
    private final TripCustomRepository tripCustomRepository;

    public SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters) {
        return tripCustomRepository.searchTrip(input, filters);
    }

    public SearchHits<Trip> searchAll() {
        return tripCustomRepository.searchAll();
    }

}



