package com.trip.TripProject.model;

import co.elastic.clients.util.DateTime;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.boot.context.properties.bind.Nested;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

import java.util.Date;
import java.util.List;

@Data
@Document(indexName = "trip")
@Setting(settingPath = "static/es-settings.json")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Trip {
    @Id
    @Field(name="trip_id", type = FieldType.Keyword)
    private Long tripId;

    @Field(type = FieldType.Date, name = "departure_time")
    private DateTime departureTime;

    @Field(type = FieldType.Long)
    private Long price;

    @Field(name="is_active")
    private boolean isActive;

    @Field(type = FieldType.Nested)
    private Vehicle vehicle;

    @Field(type = FieldType.Nested)
    private Station station;

    @Field(type = FieldType.Nested)
    private Point origin;

    @Field(type = FieldType.Nested)
    private Point destination;

    @Field(type = FieldType.Nested, name = "stop_points")
    private List<StopPoint> stopPoints;

    @Field(type = FieldType.Keyword, name="trip_type")
    private String tripType;
}
