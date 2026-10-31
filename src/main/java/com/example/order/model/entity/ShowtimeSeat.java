package com.example.order.model.entity;

import com.example.order.exception.SeatAlreadyBookedException;
import com.example.order.model.enums.SeatStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * ShowtimeSeat represents the real-time reservation state of a specific seat for a given screening.
 * Demonstrates Encapsulation by protecting the booking transition invariants.
 */
@Entity
@Table(name = "showtime_seats", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"showtime_id", "seat_id"})
})
public class ShowtimeSeat extends BaseEntity {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showtime_id", nullable = false)
    @JsonIgnore
    private Showtime showtime;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SeatStatus status = SeatStatus.AVAILABLE;

    @NotNull
    @Column(name = "effective_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal effectivePrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    @JsonIgnore
    private Booking booking;

    public ShowtimeSeat() {
    }

    public ShowtimeSeat(Showtime showtime, Seat seat) {
        this.showtime = showtime;
        this.seat = seat;
        this.status = SeatStatus.AVAILABLE;
        // Polymorphic price calculation invoked dynamically on seat instance
        this.effectivePrice = seat.calculateEffectivePrice(showtime.getBasePrice(), showtime.isPrimeTime());
    }

    /**
     * Encapsulated domain operation: atomically reserves this seat.
     * Throws exception if seat is already occupied.
     */
    public void book(Booking booking) {
        if (this.status == SeatStatus.BOOKED) {
            throw new SeatAlreadyBookedException(
                "Seat " + seat.getSeatNumber() + " is already booked for this showtime!"
            );
        }
        this.status = SeatStatus.BOOKED;
        this.booking = booking;
    }

    /**
     * Encapsulated domain operation: releases this seat back to available pool.
     */
    public void release() {
        this.status = SeatStatus.AVAILABLE;
        this.booking = null;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public SeatStatus getStatus() {
        return status;
    }

    public void setStatus(SeatStatus status) {
        this.status = status;
    }

    public BigDecimal getEffectivePrice() {
        return effectivePrice;
    }

    public void setEffectivePrice(BigDecimal effectivePrice) {
        this.effectivePrice = effectivePrice;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
