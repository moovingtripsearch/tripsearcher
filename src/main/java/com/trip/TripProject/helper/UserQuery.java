package com.trip.TripProject.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserQuery {
    private String origin;
    private String destination;
    private String tripType;
    private GeoPoint geoLocation;

    static public UserQuery parseJsonStringToEntity(String jsonString) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.readValue(jsonString, UserQuery.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON string to entity", e);
        }
    }
}
