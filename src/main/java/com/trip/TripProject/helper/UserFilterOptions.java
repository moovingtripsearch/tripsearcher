package com.trip.TripProject.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.Date;
import java.util.List;

/**
 * Contains nullable fields the user can use to filter in/out trips
 */
@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFilterOptions {
    private Double minPrice;
    private Double maxPrice;
    private String[] luggageType;
    private String vehicleType;
    private Integer numberOfSeats;
    private String agencyName;
    private Boolean allowOriginAsStopPoint = true;
    private Boolean allowDestinationAsStopPoint = true;
    private Double maxDistanceFromStation;
    private String date;
    private String time;
    private Object tripDuration;

    static public UserFilterOptions parseJsonStringToEntity(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(jsonString, UserFilterOptions.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON string to entity", e);
        }
    }
}
