package com.example.order.model.entity;

import com.example.order.model.enums.MovieGenre;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * Movie entity representing films scheduled in the theater.
 * Encapsulates movie runtime metadata, ratings, and active status.
 */
@Entity
@Table(name = "movies")
public class Movie extends BaseEntity {

    @NotBlank(message = "Movie title is required")
    @Column(nullable = false)
    private String title;

    @Column(length = 1500)
    private String description;

    @NotNull(message = "Movie genre is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MovieGenre genre;

    @Min(value = 1, message = "Duration must be at least 1 minute")
    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @NotBlank(message = "Language is required")
    @Column(nullable = false)
    private String language;

    @Column(nullable = false)
    private String rating; // e.g. "PG-13", "R", "U/A 16+"

    @Column(name = "poster_url", length = 1000)
    private String posterUrl;

    @Column(name = "trailer_url", length = 1000)
    private String trailerUrl;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    public Movie() {
    }

    public Movie(String title, String description, MovieGenre genre, Integer durationMinutes,
                 String language, String rating, String posterUrl, String trailerUrl, LocalDate releaseDate) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.durationMinutes = durationMinutes;
        this.language = language;
        this.rating = rating;
        this.posterUrl = posterUrl;
        this.trailerUrl = trailerUrl;
        this.releaseDate = releaseDate;
        this.active = true;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
