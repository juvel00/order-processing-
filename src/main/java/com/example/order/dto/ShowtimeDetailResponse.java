package com.example.order.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ShowtimeDetailResponse {
    private Long id;
    private Long movieId;
    private String movieTitle;
    private String moviePoster;
    private String movieRating;
    private String movieLanguage;
    private Integer movieDuration;
    private Long screenId;
    private String screenName;
    private String soundSystem;
    private int totalRows;
    private int totalCols;
    private LocalDateTime showTime;
    private BigDecimal basePrice;
    private boolean primeTime;
    private List<SeatDto> seats;

    public ShowtimeDetailResponse() {
    }

    public ShowtimeDetailResponse(Long id, Long movieId, String movieTitle, String moviePoster,
                                  String movieRating, String movieLanguage, Integer movieDuration,
                                  Long screenId, String screenName, String soundSystem,
                                  int totalRows, int totalCols, LocalDateTime showTime,
                                  BigDecimal basePrice, boolean primeTime, List<SeatDto> seats) {
        this.id = id;
        this.movieId = movieId;
        this.movieTitle = movieTitle;
        this.moviePoster = moviePoster;
        this.movieRating = movieRating;
        this.movieLanguage = movieLanguage;
        this.movieDuration = movieDuration;
        this.screenId = screenId;
        this.screenName = screenName;
        this.soundSystem = soundSystem;
        this.totalRows = totalRows;
        this.totalCols = totalCols;
        this.showTime = showTime;
        this.basePrice = basePrice;
        this.primeTime = primeTime;
        this.seats = seats;
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

    public String getMovieLanguage() {
        return movieLanguage;
    }

    public void setMovieLanguage(String movieLanguage) {
        this.movieLanguage = movieLanguage;
    }

    public Integer getMovieDuration() {
        return movieDuration;
    }

    public void setMovieDuration(Integer movieDuration) {
        this.movieDuration = movieDuration;
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

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getTotalCols() {
        return totalCols;
    }

    public void setTotalCols(int totalCols) {
        this.totalCols = totalCols;
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

    public List<SeatDto> getSeats() {
        return seats;
    }

    public void setSeats(List<SeatDto> seats) {
        this.seats = seats;
    }
}
