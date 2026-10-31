package com.example.order.model.entity;

import com.example.order.model.enums.SeatTier;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * PremiumSeat entity demonstrating OOP Inheritance & Polymorphism.
 * Adds extra legroom and center-screen acoustic positioning with a 1.35x price multiplier.
 */
@Entity
@DiscriminatorValue("PREMIUM")
public class PremiumSeat extends Seat {

    @Column(name = "extra_legroom_inches")
    private int extraLegroomInches = 8;

    public PremiumSeat() {
        super();
        setSeatTier(SeatTier.PREMIUM);
    }

    public PremiumSeat(String seatNumber, String rowName, int columnNumber, Screen screen, int extraLegroomInches) {
        super(seatNumber, rowName, columnNumber, SeatTier.PREMIUM, screen);
        this.extraLegroomInches = extraLegroomInches;
    }

    @Override
    public BigDecimal calculateEffectivePrice(BigDecimal baseShowPrice, boolean isPrimeTime) {
        if (baseShowPrice == null) {
            baseShowPrice = BigDecimal.ZERO;
        }
        // 1.35x tier multiplier
        BigDecimal price = baseShowPrice.multiply(new BigDecimal(String.valueOf(SeatTier.PREMIUM.getPriceMultiplier())));
        if (isPrimeTime) {
            price = price.add(new BigDecimal("40.00"));
        }
        return price.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getAmenityDescription() {
        return "Cushioned headrest, optimal center-acoustic positioning, +" + extraLegroomInches + "\" legroom";
    }

    public int getExtraLegroomInches() {
        return extraLegroomInches;
    }

    public void setExtraLegroomInches(int extraLegroomInches) {
        this.extraLegroomInches = extraLegroomInches;
    }
}
