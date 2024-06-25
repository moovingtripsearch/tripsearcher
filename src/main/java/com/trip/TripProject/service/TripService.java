package com.trip.TripProject.service;

import com.trip.TripProject.helper.UserFilterOptions;
import com.trip.TripProject.helper.UserQuery;
import com.trip.TripProject.helper.UserSortOptions;
import com.trip.TripProject.model.Trip;
import com.trip.TripProject.repository.TripCustomRepository;
//import com.trip.TripProject.repository.TripRepository;
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

//    public void save(final Trip trip){
//        tripRepository.save(trip);
//    }

//    public Trip findById(final Long id) {
//        return tripRepository.findById(id).orElse(null);
//    }

    public SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters) {
        return tripCustomRepository.searchTrip(input, filters);
    }

    public SearchHits<Trip> searchAll() {
        return tripCustomRepository.searchAll();
    }

}



