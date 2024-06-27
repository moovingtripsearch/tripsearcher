package com.mooving.tripsearch.repository;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.RangeQuery;
import co.elastic.clients.json.JsonData;
import com.mooving.tripsearch.model.Trip;
import com.mooving.tripsearch.helper.UserFilterOptions;
import com.mooving.tripsearch.helper.UserQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class TripCustomRepository {
    private final ElasticsearchOperations operations;

    IndexCoordinates index = IndexCoordinates.of("trips");

    public SearchHits<Trip> searchAll() {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.bool(b0 -> b0
                        .must(QueryBuilders.match(m -> m.field("trip_type").query("inter"))
                        ))).build();
        return operations.search(searchQuery, Trip.class, index);
    }

    public SearchHits<Trip> searchTrip(UserQuery input, UserFilterOptions filters) {
        NativeQuery searchQuery = NativeQuery.builder()
                .withQuery(q -> q.bool(b0 -> b0
                        .must(Arrays.asList(
                                QueryBuilders.match(m -> m.field("trip_type").query(input.getTripType())),
                                QueryBuilders.bool(b1 -> {
                                    List<Query> queryList = new ArrayList<>();
                                    queryList.add(
                                            QueryBuilders.bool(b2 -> b2
                                                    .must(Arrays.asList(
                                                            QueryBuilders.nested(ns -> ns.path("origin").query(q1 -> q1.match(m -> m.field("origin.name").query(input.getOrigin())))),
                                                            QueryBuilders.nested(ns -> ns.path("destination").query(q1 -> q1.match(m -> m.field("destination.name").query(input.getDestination()))))
                                                    )))
                                    );
                                    if (filters.getAllowOriginAsStopPoint()) {
                                        System.out.println("1111111111");
                                        queryList.add(
                                                QueryBuilders.bool(b2 -> b2
                                                        .must(Arrays.asList(
                                                                QueryBuilders.nested(ns -> ns.path("origin").query(q1 -> q1.match(m -> m.field("origin.name").query(input.getOrigin())))),
                                                                QueryBuilders.nested(ns -> ns.path("stop_points").query(q1 -> q1.bool(b3 -> b3.must(Arrays.asList(
//                                                                    QueryBuilders.match(m -> m.field("stop_points.drop").query(true)),
                                                                        QueryBuilders.match(m -> m.field("stop_points.name").query(input.getDestination()))
                                                                )))))
                                                        )))
                                        );
                                    }
                                    if (filters.getAllowDestinationAsStopPoint()) {

                                        System.out.println("--1111111111");
                                        queryList.add(
                                                QueryBuilders.bool(b2 -> b2
                                                        .must(Arrays.asList(
                                                                QueryBuilders.nested(ns -> ns.path("stop_points").query(q1 -> q1.bool(b3 -> b3.must(Arrays.asList(
//                                                                    QueryBuilders.match(m -> m.field("stop_points.pickup").query(true)),
                                                                        QueryBuilders.match(m -> m.field("stop_points.name").query(input.getOrigin()))
                                                                ))))),
                                                                QueryBuilders.nested(ns -> ns.path("destination").query(q1 -> q1.match(m -> m.field("destination.name").query(input.getDestination()))))
                                                        )))
                                        );
                                    }

                                    if (filters.getAllowOriginAsStopPoint() && filters.getAllowDestinationAsStopPoint()) {
                                        System.out.println("---1111111111");
                                        queryList.add(
                                                QueryBuilders.bool(b2 -> b2
                                                        .must(Arrays.asList(
                                                                QueryBuilders.nested(ns -> ns.path("stop_points").query(q1 -> q1.bool(b3 -> b3.must(Arrays.asList(
//                                                                        QueryBuilders.match(m -> m.field("stop_points.pickup").query(true)),
                                                                        QueryBuilders.match(m -> m.field("stop_points.name").query(input.getOrigin()))
                                                                ))))),
                                                                QueryBuilders.nested(ns -> ns.path("stop_points").query(q1 -> q1.bool(b3 -> b3.must(Arrays.asList(
//                                                                        QueryBuilders.match(m -> m.field("stop_points.drop").query(true)),
                                                                        QueryBuilders.match(m -> m.field("stop_points.name").query(input.getDestination()))
                                                                )))))
                                                        )))
                                        );
                                    }

                                    return b1.should(queryList);
                                })
                        ))))
//                .withFilter(f -> {
//                    if (filters.getAgencyName() != null && !filters.getAgencyName().isBlank()) {
//                        System.out.println("Called Agency name");
//                        f.match(m0 -> m0.field("agency_name").query(filters.getAgencyName()));
//                    }
//                    if (filters.getMaxPrice() != null || filters.getMinPrice() != null) {
//
//                        System.out.println("Called Price ");
//                        RangeQuery.Builder range = QueryBuilders.range().field("price");
//                        if (filters.getMaxPrice() != null) {
//
//                            System.out.println("Called Price max");
//                            range.lte(JsonData.of(filters.getMaxPrice()));
//                        }
//                        if (filters.getMinPrice() != null) {
//
//                            System.out.println("Called Price min");
//                            range.gte(JsonData.of(filters.getMinPrice()));
//                        }
//                        f.range(range.build());
//                    }
//                    if (filters.getVipOption() != null && !filters.getVipOption().isBlank()) {
//
//                        System.out.println("Called Standing");
//                        f.match(m0 -> m0.field("standing").query(filters.getVipOption()));
////                    if (filters.getLuggageType() != null && !(filters.getLuggageType().length == 0)) {
////                        f.terms(t0 -> t0.field("luggage_type").terms(filters.getLuggageType());
////                    }
//                    }
//                    if (filters.getVehicleType() != null && !filters.getVehicleType().isBlank()) {
//                        System.out.println("Called vehicle type");
//                        f.term(t0 -> t0.field("vehicle.vehicle_type").value(filters.getVehicleType()));
//                    }
//                    if (filters.getNumberOfSeats() != null) {
//
//                        System.out.println("Called Number of seats");
//                        f.range(r0 -> r0.field("number_of_seats").gte(JsonData.of(filters.getNumberOfSeats())));
//                    }
////                    if (input.getGeoLocation() != null && filters.getMaxDistanceFromStation() != null)
////                        f.geoDistance(gd -> gd.field("station.location").distanceType(GeoDistanceType.Plane).location(l0 -> l0.latlon(l1 -> l1.lat(input.getGeoLocation().getLat()).lon(input.getGeoLocation().getLon()))));
////
//                    return f;
//                })
                .build();

        return operations.search(searchQuery, Trip.class, index);
    }
}
