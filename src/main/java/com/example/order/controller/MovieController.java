package com.example.order.controller;

import com.example.order.dto.MovieResponse;
import com.example.order.model.enums.MovieGenre;
import com.example.order.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@Tag(name = "Movies", description = "Movie catalog and now-showing screening discovery")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    @Operation(summary = "Get active movies with optional genre filtering or keyword search")
    public ResponseEntity<List<MovieResponse>> getMovies(
            @RequestParam(required = false) MovieGenre genre,
            @RequestParam(required = false) String search) {

        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(movieService.searchMovies(search));
        }
        if (genre != null) {
            return ResponseEntity.ok(movieService.getMoviesByGenre(genre));
        }
        return ResponseEntity.ok(movieService.getAllActiveMovies());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get movie details by ID")
    public ResponseEntity<MovieResponse> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }
}
