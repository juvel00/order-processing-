package com.example.order.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

/**
 * Screen entity representing a cinema auditorium or hall.
 * Houses seats arranged by rows and columns.
 */
@Entity
@Table(name = "screens")
public class Screen extends BaseEntity {

    @NotBlank(message = "Screen name is required")
    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "sound_system")
    private String soundSystem; // e.g., "Dolby Atmos 7.1", "IMAX Enhanced"

    @Min(value = 1, message = "Total rows must be at least 1")
    @Column(name = "total_rows", nullable = false)
    private int totalRows;

    @Min(value = 1, message = "Total columns must be at least 1")
    @Column(name = "total_cols", nullable = false)
    private int totalCols;

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Seat> seats = new ArrayList<>();

    public Screen() {
    }

    public Screen(String name, String soundSystem, int totalRows, int totalCols) {
        this.name = name;
        this.soundSystem = soundSystem;
        this.totalRows = totalRows;
        this.totalCols = totalCols;
    }

    public int getTotalCapacity() {
        return totalRows * totalCols;
    }

    public void addSeat(Seat seat) {
        seats.add(seat);
        seat.setScreen(this);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }
}
