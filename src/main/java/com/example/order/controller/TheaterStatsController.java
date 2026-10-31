package com.example.order.controller;

import com.example.order.dto.TheaterStatsResponse;
import com.example.order.service.TheaterStatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@Tag(name = "Analytics", description = "Theater box office revenue and auditorium occupancy analytics")
public class TheaterStatsController {

    private final TheaterStatsService statsService;

    @Autowired
    public TheaterStatsController(TheaterStatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    @Operation(summary = "Get overall cinema analytics, seats sold, revenue, and occupancy rate")
    public ResponseEntity<TheaterStatsResponse> getStats() {
        return ResponseEntity.ok(statsService.getTheaterStats());
    }
}
