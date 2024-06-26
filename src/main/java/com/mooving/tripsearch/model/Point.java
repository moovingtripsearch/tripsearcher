package com.mooving.tripsearch.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;

@Data
@Document(indexName = "points")
@Setting(settingPath = "es-config/elastic-analyzer.json")
public class Point {
    @Id
    private String id;

    @Field(name = "place", type = FieldType.Text)
    private String place;

    @Field(name = "coordinates")
    private GeoPoint coordinates;

    @MultiField(
            mainField = @Field(type = FieldType.Text, analyzer = "autocomplete_index", searchAnalyzer = "autocomplete_search"),
            otherFields = {
//                    This for sorting
                    @InnerField(suffix = "keyword", type = FieldType.Keyword)
            }
    )
    private String name;
}