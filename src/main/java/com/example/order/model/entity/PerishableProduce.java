package com.example.order.model.entity;

import com.example.order.model.enums.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * PerishableProduce extends Product (Inheritance & Polymorphism).
 * Directly maps to UN SDG 12 (Target 12.3): Reduces food spoilage through dynamic freshness discount.
 */
@Entity
@DiscriminatorValue("PERISHABLE")
public class PerishableProduce extends Product {

    @NotNull(message = "Harvest date is required")
    @Column(name = "harvest_date")
    private LocalDate harvestDate;

    @Min(value = 1, message = "Shelf life must be at least 1 day")
    @Column(name = "shelf_life_days")
    private int shelfLifeDays;

    @Column(name = "cold_storage_required")
    private boolean coldStorageRequired;

    @Column(name = "freshness_grade")
    private String freshnessGrade; // e.g. "Grade A - Just Harvested"

    public PerishableProduce() {
        super();
    }

    public PerishableProduce(String name, String description, ProductCategory category, String unit,
                             BigDecimal basePrice, int stockQuantity, Farmer farmer,
                             LocalDate harvestDate, int shelfLifeDays, boolean coldStorageRequired,
                             String freshnessGrade) {
        super(name, description, category, unit, basePrice, stockQuantity, farmer);
        this.harvestDate = harvestDate;
        this.shelfLifeDays = shelfLifeDays;
        this.coldStorageRequired = coldStorageRequired;
        this.freshnessGrade = freshnessGrade;
    }

    public long getRemainingShelfLifeDays() {
        if (harvestDate == null) return shelfLifeDays;
        long daysSinceHarvest = ChronoUnit.DAYS.between(harvestDate, LocalDate.now());
        long remaining = shelfLifeDays - daysSinceHarvest;
        return Math.max(0, remaining);
    }

    public boolean isExpired() {
        return getRemainingShelfLifeDays() <= 0;
    }

    @Override
    public boolean isClearanceDiscountApplied() {
        // Clearance discount triggers when 35% or less of shelf life remains, to prevent food waste (SDG 12.3)
        long remaining = getRemainingShelfLifeDays();
        return remaining > 0 && remaining <= Math.ceil(shelfLifeDays * 0.35);
    }

    /**
     * Polymorphic price calculation.
     * Near-expiry items receive a 25% discount to incentivize swift consumption and prevent agricultural waste.
     */
    @Override
    public BigDecimal calculateEffectivePrice() {
        if (isClearanceDiscountApplied()) {
            return getBasePrice().multiply(new BigDecimal("0.75")).setScale(2, RoundingMode.HALF_UP);
        }
        return getBasePrice().setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getProduceTypeDescription() {
        return "Farm-Fresh Perishable (Harvested on " + harvestDate + ", Remaining Shelf Life: " + getRemainingShelfLifeDays() + " days)";
    }

    public LocalDate getHarvestDate() {
        return harvestDate;
    }

    public void setHarvestDate(LocalDate harvestDate) {
        this.harvestDate = harvestDate;
    }

    public int getShelfLifeDays() {
        return shelfLifeDays;
    }

    public void setShelfLifeDays(int shelfLifeDays) {
        this.shelfLifeDays = shelfLifeDays;
    }

    public boolean isColdStorageRequired() {
        return coldStorageRequired;
    }

    public void setColdStorageRequired(boolean coldStorageRequired) {
        this.coldStorageRequired = coldStorageRequired;
    }

    public String getFreshnessGrade() {
        return freshnessGrade;
    }

    public void setFreshnessGrade(String freshnessGrade) {
        this.freshnessGrade = freshnessGrade;
    }
}
