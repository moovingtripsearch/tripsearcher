package com.mooving.tripsearch.repository;

import com.mooving.tripsearch.model.PointOfInterest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointRepository extends ElasticsearchRepository<PointOfInterest, String> {
}
