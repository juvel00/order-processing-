package com.example.order.model.entity;

import com.example.order.model.enums.SeatTier;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * VipReclinerSeat entity demonstrating OOP Inheritance & Polymorphism.
 * Includes motorized leather recliners, at-seat waiter call, and complimentary snack voucher.
 */
@Entity
@DiscriminatorValue("VIP_RECLINER")
public class VipReclinerSeat extends Seat {

    @Column(name = "recliner_angle_degrees")
    private int reclinerAngleDegrees = 150;

    @Column(name = "complimentary_snack")
    private boolean complimentarySnack = true;

    public VipReclinerSeat() {
        super();
        setSeatTier(SeatTier.VIP_RECLINER);
    }

    public VipReclinerSeat(String seatNumber, String rowName, int columnNumber, Screen screen,
                           int reclinerAngleDegrees, boolean complimentarySnack) {
        super(seatNumber, rowName, columnNumber, SeatTier.VIP_RECLINER, screen);
        this.reclinerAngleDegrees = reclinerAngleDegrees;
        this.complimentarySnack = complimentarySnack;
    }

    @Override
    public BigDecimal calculateEffectivePrice(BigDecimal baseShowPrice, boolean isPrimeTime) {
        if (baseShowPrice == null) {
            baseShowPrice = BigDecimal.ZERO;
        }
        // 1.80x tier multiplier
        BigDecimal price = baseShowPrice.multiply(new BigDecimal(String.valueOf(SeatTier.VIP_RECLINER.getPriceMultiplier())));
        if (complimentarySnack) {
            price = price.add(new BigDecimal("50.00")); // snack voucher value included
        }
        if (isPrimeTime) {
            price = price.add(new BigDecimal("60.00"));
        }
        return price.setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getAmenityDescription() {
        return "Motorized plush leather recliner (" + reclinerAngleDegrees + "°), complimentary gourmet popcorn & soda";
    }

    public int getReclinerAngleDegrees() {
        return reclinerAngleDegrees;
    }

    public void setReclinerAngleDegrees(int reclinerAngleDegrees) {
        this.reclinerAngleDegrees = reclinerAngleDegrees;
    }

    public boolean isComplimentarySnack() {
        return complimentarySnack;
    }

    public void setComplimentarySnack(boolean complimentarySnack) {
        this.complimentarySnack = complimentarySnack;
    }
}
