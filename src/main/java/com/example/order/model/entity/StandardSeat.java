package com.example.order.model.entity;

import com.example.order.model.enums.SeatTier;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * StandardSeat entity representing baseline theater seating.
 * Implements polymorphic pricing with base rates.
 */
@Entity
@DiscriminatorValue("STANDARD")
public class StandardSeat extends Seat {

    public StandardSeat() {
        super();
        setSeatTier(SeatTier.STANDARD);
    }

    public StandardSeat(String seatNumber, String rowName, int columnNumber, Screen screen) {
        super(seatNumber, rowName, columnNumber, SeatTier.STANDARD, screen);
    }

    @Override
    public BigDecimal calculateEffectivePrice(BigDecimal baseShowPrice, boolean isPrimeTime) {
        if (baseShowPrice == null) {
            baseShowPrice = BigDecimal.ZERO;
        }
        BigDecimal price = baseShowPrice;
        if (isPrimeTime) {
            price = price.add(new BigDecimal("20.00")); // modest prime-time adjustment
        }
        return price.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getAmenityDescription() {
        return "Standard ergonomic cinema seat with cup holder";
    }
}
