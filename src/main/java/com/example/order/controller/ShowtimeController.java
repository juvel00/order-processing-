package com.example.order.controller;

import com.example.order.dto.ShowtimeDetailResponse;
import com.example.order.dto.ShowtimeResponse;
import com.example.order.service.ShowtimeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@Tag(name = "Showtimes", description = "Showtime schedule, hall screens, and interactive seat map layouts")
public class ShowtimeController {

    private final ShowtimeService showtimeService;

    @Autowired
    public ShowtimeController(ShowtimeService showtimeService) {
        this.showtimeService = showtimeService;
    }

    @GetMapping
    @Operation(summary = "Get all scheduled showtimes across screens")
    public ResponseEntity<List<ShowtimeResponse>> getAllShowtimes() {
        return ResponseEntity.ok(showtimeService.getAllShowtimes());
    }

    @GetMapping("/movie/{movieId}")
    @Operation(summary = "Get upcoming showtimes for a specific movie")
    public ResponseEntity<List<ShowtimeResponse>> getShowtimesByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(showtimeService.getShowtimesByMovie(movieId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed showtime information including interactive seat map with tier pricing")
    public ResponseEntity<ShowtimeDetailResponse> getShowtimeDetails(@PathVariable Long id) {
        return ResponseEntity.ok(showtimeService.getShowtimeDetails(id));
    }
}
