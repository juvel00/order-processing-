package com.example.order.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Showtime entity linking a Movie to a Screen at a scheduled date & time.
 * Calculates prime-time status dynamically based on screening hour.
 */
@Entity
@Table(name = "showtimes")
public class Showtime extends BaseEntity {

    @NotNull(message = "Movie is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @NotNull(message = "Screen is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    @NotNull(message = "Show date and time is required")
    @Column(name = "show_time", nullable = false)
    private LocalDateTime showTime;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "10.00", message = "Base price must be at least 10.00")
    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "is_prime_time", nullable = false)
    private boolean primeTime;

    @OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ShowtimeSeat> showtimeSeats = new ArrayList<>();

    public Showtime() {
    }

    public Showtime(Movie movie, Screen screen, LocalDateTime showTime, BigDecimal basePrice) {
        this.movie = movie;
        this.screen = screen;
        this.showTime = showTime;
        this.basePrice = basePrice;
        // Evening shows after 17:00 (5 PM) or weekends qualify as prime time
        this.primeTime = showTime.getHour() >= 17;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public LocalDateTime getShowTime() {
        return showTime;
    }

    public void setShowTime(LocalDateTime showTime) {
        this.showTime = showTime;
        this.primeTime = showTime != null && showTime.getHour() >= 17;
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

    public List<ShowtimeSeat> getShowtimeSeats() {
        return showtimeSeats;
    }

    public void setShowtimeSeats(List<ShowtimeSeat> showtimeSeats) {
        this.showtimeSeats = showtimeSeats;
    }
}
