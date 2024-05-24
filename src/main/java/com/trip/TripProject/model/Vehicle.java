package com.trip.TripProject.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

@Data
public class Vehicle {
    @Id
    @Field(name = "vehicle_id")
    private long vehicleId;
    @Field(name = "vehicle_type")
    private String vehicleType;
    @Field(name = "serial_number")
    private String serialNumber;
    private String brand;
    @Field(name = "number_of_seats")
    private int numberOfSeats;
}
