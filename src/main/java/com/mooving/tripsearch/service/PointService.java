package com.mooving.tripsearch.service;

import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import com.mooving.tripsearch.model.PointOfInterest;
import com.mooving.tripsearch.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointService {
    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private ElasticsearchOperations operations;
    IndexCoordinates index = IndexCoordinates.of("points");

    public List<PointOfInterest> saveAll(List<PointOfInterest> pointOfInterests) {
        return (List<PointOfInterest>) pointRepository.saveAll(pointOfInterests);
    }

    public long count() {
        return this.pointRepository.count();
    }

    /**
     * Town name auto-completion enabled
     *
     * @param keywords
     * @param tripType
     * @return
     */

    public List<PointOfInterest> suggest(String keywords, String tripType, Pageable pageable) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q0 ->
                        q0.match(m -> m.field("name").query(keywords).operator(Operator.Or))
                )
                .withFilter(f -> {
                    if (tripType.equals("inter")) {
                        return f.bool(b -> b
                                .should(s -> s.match(m -> m.field("place").query("city").operator(Operator.Or)))
                                .should(s -> s.match(m -> m.field("place").query("village").operator(Operator.Or)))
                        );
                    } else {
                        return f.bool(b -> b
                                .mustNot(m -> m.match(mq -> mq.field("place").query("city").operator(Operator.Or)))
                                .mustNot(m -> m.match(mq -> mq.field("place").query("village").operator(Operator.Or)))
                        );
                    }
                })
                .withPageable(pageable)
                .build();

        SearchHits<PointOfInterest> result = operations.search(query, PointOfInterest.class, index);
        return result.stream().map(SearchHit::getContent).collect(Collectors.toList());
    }

}
