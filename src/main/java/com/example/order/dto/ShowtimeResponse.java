package com.example.order.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ShowtimeResponse {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private String moviePoster;
    private String movieRating;
    private Long screenId;
    private String screenName;
    private String soundSystem;
    private LocalDateTime showTime;
    private BigDecimal basePrice;
    private boolean primeTime;
    private int totalSeats;
    private int availableSeats;

    public ShowtimeResponse() {
    }

    public ShowtimeResponse(Long id, Long movieId, String movieTitle, String moviePoster,
                            String movieRating, Long screenId, String screenName,
                            String soundSystem, LocalDateTime showTime, BigDecimal basePrice,
                            boolean primeTime, int totalSeats, int availableSeats) {
        this.id = id;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.moviePoster = moviePoster;
        this.movieRating = movieRating;
        this.screenId = screenId;
        this.screenName = screenName;
        this.soundSystem = soundSystem;
        this.showTime = showTime;
        this.basePrice = basePrice;
        this.primeTime = primeTime;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getMovieTitle() {
        return movieTitle;
    }

    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }

    public String getMoviePoster() {
        return moviePoster;
    }

    public void setMoviePoster(String moviePoster) {
        this.moviePoster = moviePoster;
    }

    public String getMovieRating() {
        return movieRating;
    }

    public void setMovieRating(String movieRating) {
        this.movieRating = movieRating;
    }

    public Long getScreenId() {
        return screenId;
    }

    public void setScreenId(Long screenId) {
        this.screenId = screenId;
    }

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getSoundSystem() {
        return soundSystem;
    }

    public void setSoundSystem(String soundSystem) {
        this.soundSystem = soundSystem;
    }

    public LocalDateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public boolean isPrimeTime() {
        return primeTime;
    }

    public void setPrimeTime(boolean primeTime) {
        this.primeTime = primeTime;
    }

    public int getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(int totalSeats) {
        this.totalSeats = totalSeats;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}
