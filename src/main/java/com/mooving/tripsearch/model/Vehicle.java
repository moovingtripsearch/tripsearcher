package com.mooving.tripsearch.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;

@Data

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Vehicle {
    @Id
    @Field(name = "id")
    private long id;
    @Field(name = "vehicle_type")
    private String vehicleType;
    @Field(name = "serial_number")
    private String serialNumber;
    private String brand;
    @Field(name = "number_of_seats")
    private int numberOfSeats;
    @Field(name = "photo_url")
    private String photoUrl;
}
