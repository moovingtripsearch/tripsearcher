package com.mooving.tripsearch.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;

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
