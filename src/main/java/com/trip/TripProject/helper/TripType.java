package com.trip.TripProject.helper;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Defines the trip type during the search process. Can either be an inter-urban trip or an urban trip
 */
public enum TripType {
    URBAN("intra"),
    INTERURBAN("inter");

    final private String value;

    TripType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static TripType fromValue(String value) {
        for (TripType type : TripType.values()) {
            if (type.value.equals(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown enum type " + value);
    }
}

