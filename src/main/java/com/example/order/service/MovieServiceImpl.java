package com.example.order.service;

import com.example.order.dto.MovieResponse;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.Movie;
import com.example.order.model.enums.MovieGenre;
import com.example.order.repository.MovieRepository;
import com.example.order.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;

    @Autowired
    public MovieServiceImpl(MovieRepository movieRepository, ShowtimeRepository showtimeRepository) {
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
    }

    @Override
    public List<MovieResponse> getAllActiveMovies() {
        return movieRepository.findByActiveTrue().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public MovieResponse getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + id));
        return mapToResponse(movie);
    }

    @Override
    public List<MovieResponse> getMoviesByGenre(MovieGenre genre) {
        return movieRepository.findByGenre(genre).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<MovieResponse> searchMovies(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllActiveMovies();
        }
        return movieRepository.findByTitleContainingIgnoreCase(keyword.trim()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private MovieResponse mapToResponse(Movie movie) {
        int showtimesCount = showtimeRepository.findByMovieIdOrderByShowTimeAsc(movie.getId()).size();
        return new MovieResponse(
                movie.getId(),
                movie.getTitle(),
                movie.getDescription(),
                movie.getGenre(),
                movie.getDurationMinutes(),
                movie.getLanguage(),
                movie.getRating(),
                movie.getPosterUrl(),
                movie.getTrailerUrl(),
                movie.getReleaseDate(),
                showtimesCount
        );
    }
}
