package com.mooving.tripsearch.service;

import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.repository.TripCustomRepository;
//import com.trip.Tripsearch.repository.TripRepository;
import com.mooving.tripsearch.repository.TripRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Data
@RequiredArgsConstructor
public class TripService {
    @Autowired
    private final TripCustomRepository tripCustomRepository;
    @Autowired
    private final TripRepository tripRepository;

    public SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters) {
        return tripCustomRepository.searchTrip(input, filters);
    }


    public long count() {
        return tripRepository.count();
    }

    // Find a trip by its ID
    public Optional<Trip> findById(Long id) {
        return tripRepository.findById(id);
    }

    // Example method: find all trips
    public List<Trip> findAll(Pageable pageable) {
        return tripRepository.findAll(pageable).getContent();
    }

    // Example method: delete a trip by ID
    public void deleteById(Long id) {
        tripRepository.deleteById(id);
    }

    // Save or update a trip
    @Transactional
    public List<Trip> saveAll(List<Trip> trips) {
        return (List<Trip>) tripRepository.saveAll(trips);
    }
}



