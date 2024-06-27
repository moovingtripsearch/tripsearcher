package com.mooving.tripsearch.repository;

import com.mooving.tripsearch.model.Trip;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface TripRepository extends ElasticsearchRepository<Trip, Long> {
}
