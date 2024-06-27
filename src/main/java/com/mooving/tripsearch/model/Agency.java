package com.mooving.tripsearch.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.List;

@Data

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Agency {
    @Id
    @Field(name = "agency_id")
    private long agencyId;

    @Field(name = "agency_name")
    private String agencyName;

    @Field(type = FieldType.Nested)  // Mark stations as nested objects
    private List<Station> stations;

    @Field(type = FieldType.Nested)  // Mark vehicles as nested objects
    private List<Vehicle> vehicles;

    @Field(type = FieldType.Text)
    private String phoneNumber;
}
