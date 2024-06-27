package com.mooving.tripsearch.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Document(indexName = "trips")
@Setting(settingPath = "es-config/elastic-analyzer.json")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Trip {
    @Id
    @Field(name = "trip_id", type = FieldType.Keyword)
    private Long tripId;

    @Field(type = FieldType.Long)
    private Long price;

    @Field(type = FieldType.Nested)
    private Vehicle vehicle;

    @Field(type = FieldType.Nested)
    private Agency agency;

    @Field(type = FieldType.Nested)
    private Station station;

    @Field(type = FieldType.Nested)
    private PointOfInterest origin;

    @Field(type = FieldType.Nested)
    private PointOfInterest destination;

    @Field(type = FieldType.Nested, name = "stop_points")
    private List<PointOfInterest> stopPoints;

    @Field(type = FieldType.Keyword, name = "trip_type")
    private String tripType;

    @Field(type = FieldType.Integer, name = "number_of_passengers")
    private Integer numberOfPassengers;

    @Field(type = FieldType.Integer, name = "number_of_reservations")
    private Integer numberOfReservations;

    @Field(type = FieldType.Text)
    private String latestReservationDate;

    @Field(type = FieldType.Text)
    private List<String> luggage_types;

    @Field(type = FieldType.Keyword)
    private String standing;

    @Field(type = FieldType.Text)
    private String departureTime;

    @Field(type = FieldType.Text)
    private String departureDate;
}
