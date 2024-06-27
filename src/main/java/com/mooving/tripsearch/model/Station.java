package com.mooving.tripsearch.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Station {
    @Id
    @Field(name = "station_id")
    private long stationId;

    @Field(name = "station_name")
    private String stationName;

    @Field(name = "point_id")
    private long pointId;
}
