package com.mooving.tripsearch.service;

import co.elastic.clients.elasticsearch._types.SortMode;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.query_dsl.Operator;
import com.mooving.tripsearch.model.Point;
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

    public List<Point> saveAll(List<Point> points) {
        return (List<Point>) pointRepository.saveAll(points);
    }

    public long count() {
        return this.pointRepository.count();
    }

    /**
     * Town name auto-completion enabled
     *
     * @param keywords
     * @return
     */
    public List<Point> suggest(String keywords, Pageable pageable) {
        NativeQuery query = NativeQuery.builder()
                .withQuery(q0 ->
                        q0.match(m -> m.field("name").query(keywords).operator(Operator.Or))
                )
                .withPageable(pageable)
                .build();

        SearchHits<Point> result = operations.search(query, Point.class, index);
        return result.stream().map(SearchHit::getContent).collect(Collectors.toList());
    }
}
