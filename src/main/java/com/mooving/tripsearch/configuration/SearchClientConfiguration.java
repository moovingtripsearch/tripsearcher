package com.mooving.tripsearch.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

//
@Configuration
@EnableElasticsearchRepositories(basePackages = "com.trip.Tripsearch.repository")
@ComponentScan(basePackages = {"com.trip.Tripsearch"})
public class SearchClientConfiguration extends ElasticsearchConfiguration {
    @Autowired
    private Environment env;

    @Override
    public ClientConfiguration clientConfiguration() {
        String elasticsearchUrl = env.getProperty("SPRING_ELASTICSEARCH_URIS", "localhost:9200");
        return ClientConfiguration.builder().connectedTo(elasticsearchUrl).build();
    }
}