package com.example.order.service;

import com.example.order.dto.MovieResponse;
import com.example.order.model.enums.MovieGenre;

import java.util.List;

public interface MovieService {
    List<MovieResponse> getAllActiveMovies();
    MovieResponse getMovieById(Long id);
    List<MovieResponse> getMoviesByGenre(MovieGenre genre);
    List<MovieResponse> searchMovies(String keyword);
}
