package com.example.order.model.entity;

import com.example.order.model.enums.SeatTier;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Abstract Seat entity demonstrating:
 * 1. OOP Inheritance (JPA SINGLE_TABLE inheritance with discriminator)
 * 2. OOP Abstraction (abstract class defining seat contracts)
 * 3. OOP Polymorphism (polymorphic calculateEffectivePrice implementation across subclasses)
 */
@Entity
@Table(name = "seats")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "seat_category", discriminatorType = DiscriminatorType.STRING)
public abstract class Seat extends BaseEntity {

    @NotBlank(message = "Seat number is required (e.g., A1, C5)")
    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @NotBlank(message = "Row name is required (e.g., A, B, C)")
    @Column(name = "row_name", nullable = false)
    private String rowName;

    @Column(name = "column_number", nullable = false)
    private int columnNumber;

    @NotNull(message = "Seat tier is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "seat_tier", nullable = false)
    private SeatTier seatTier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "screen_id", nullable = false)
    @JsonIgnore
    private Screen screen;

    public Seat() {
    }

    public Seat(String seatNumber, String rowName, int columnNumber, SeatTier seatTier, Screen screen) {
        this.seatNumber = seatNumber;
        this.rowName = rowName;
        this.columnNumber = columnNumber;
        this.seatTier = seatTier;
        this.screen = screen;
    }

    /**
     * Polymorphic price calculation method implemented by each seat subclass.
     * Demonstrates dynamic runtime polymorphism based on concrete seat tier.
     *
     * @param baseShowPrice The base ticket price of the showtime
     * @param isPrimeTime Whether the show is at peak evening hours
     * @return Calculated seat price formatted to two decimal places
     */
    public abstract BigDecimal calculateEffectivePrice(BigDecimal baseShowPrice, boolean isPrimeTime);

    /**
     * Returns a human-readable description of the seat comfort amenities.
     */
    public abstract String getAmenityDescription();

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getRowName() {
        return rowName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public int getColumnNumber() {
        return columnNumber;
    }

    public void setColumnNumber(int columnNumber) {
        this.columnNumber = columnNumber;
    }

    public SeatTier getSeatTier() {
        return seatTier;
    }

    public void setSeatTier(SeatTier seatTier) {
        this.seatTier = seatTier;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }
}
