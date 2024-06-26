package com.mooving.tripsearch.controller;

import com.mooving.tripsearch.model.Point;
import com.mooving.tripsearch.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/points")
public class PointController {
    @Autowired
    private PointService pointService;

    @GetMapping(path = "/suggest")
    public List<Point> suggestPoints(@RequestParam String keywords) {
        Sort sort = Sort.by(Sort.Direction.ASC, "name.keyword");
        Pageable pageable = PageRequest.of(0, 20, sort);
        return this.pointService.suggest(keywords, pageable);
    }

}
