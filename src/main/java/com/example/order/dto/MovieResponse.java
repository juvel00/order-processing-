package com.example.order.dto;

import com.example.order.model.enums.MovieGenre;
import java.time.LocalDate;

public class MovieResponse {
    private Long id;
    private String title;
    private String description;
    private MovieGenre genre;
    private Integer durationMinutes;
    private String language;
    private String rating;
    private String posterUrl;
    private String trailerUrl;
    private LocalDate releaseDate;
    private int totalShowtimes;

    public MovieResponse() {
    }

    public MovieResponse(Long id, String title, String description, MovieGenre genre, Integer durationMinutes,
                         String language, String rating, String posterUrl, String trailerUrl,
                         LocalDate releaseDate, int totalShowtimes) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.durationMinutes = durationMinutes;
        this.language = language;
        this.rating = rating;
        this.posterUrl = posterUrl;
        this.trailerUrl = trailerUrl;
        this.releaseDate = releaseDate;
        this.totalShowtimes = totalShowtimes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MovieGenre getGenre() {
        return genre;
    }

    public void setGenre(MovieGenre genre) {
        this.genre = genre;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public int getTotalShowtimes() {
        return totalShowtimes;
    }

    public void setTotalShowtimes(int totalShowtimes) {
        this.totalShowtimes = totalShowtimes;
    }
}
