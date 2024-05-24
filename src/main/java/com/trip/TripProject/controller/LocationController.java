package com.trip.TripProject.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
public class LocationController {

    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}";

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/current-location")
    public String getCurrentLocation() {
        // Get user's IP address from the HTTP request
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ipAddress = request.getRemoteAddr();

        // Perform reverse geocoding lookup using Nominatim API
        Map response = restTemplate.getForObject(NOMINATIM_URL, Map.class, getLatitude(ipAddress), getLongitude(ipAddress));

        // Extract relevant location information
        assert response != null;
        String location = response.get("display_name").toString();
        System.out.println(location);

        return location;
    }

    // Helper method to get latitude based on IP address
    private double getLatitude(String ipAddress) {
        // Implement logic to get latitude from IP address
        return 0.0;
    }

    // Helper method to get longitude based on IP address
    private double getLongitude(String ipAddress) {
        // Implement logic to get longitude from IP address
        return 0.0;
    }
}
