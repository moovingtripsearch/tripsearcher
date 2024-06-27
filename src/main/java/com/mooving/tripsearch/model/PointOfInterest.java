package com.mooving.tripsearch.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Document(indexName = "points")
@Setting(settingPath = "es-config/elastic-analyzer.json")
public class PointOfInterest {
    @Id
    private String id;

    @Field(name = "place", type = FieldType.Text)
    private String place;

    @Field(name = "coordinates")
    private GeoPoint coordinates;

    @MultiField(
            mainField = @Field(type = FieldType.Text, analyzer = "autocomplete_index", searchAnalyzer = "autocomplete_search"),
            otherFields = {@InnerField(suffix = "keyword", type = FieldType.Keyword)}
    )
    private String name;
}