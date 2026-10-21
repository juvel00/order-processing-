package com.example.order.dto;

import java.math.BigDecimal;

public class SdgImpactResponse {

    // SDG 2: Zero Hunger & Fair Livelihoods (Target 2.3)
    private BigDecimal totalDirectFarmerEarnings;
    private BigDecimal totalGrossPlatformSales;
    private double directFarmerRevenuePercentage;
    private BigDecimal estimatedMiddlemanCommissionEliminated;
    private long totalRegisteredFarmers;
    private long totalOrdersCompleted;

    // SDG 12: Responsible Consumption and Production (Target 12.3)
    private long clearanceProduceUnitsSold;
    private double estimatedKgFoodWastePrevented;
    private long activePerishableListings;

    // Narrative & Academic Context
    private String sdg2Description;
    private String sdg12Description;

    public SdgImpactResponse() {
    }

    public BigDecimal getTotalDirectFarmerEarnings() {
        return totalDirectFarmerEarnings;
    }

    public void setTotalDirectFarmerEarnings(BigDecimal totalDirectFarmerEarnings) {
        this.totalDirectFarmerEarnings = totalDirectFarmerEarnings;
    }

    public BigDecimal getTotalGrossPlatformSales() {
        return totalGrossPlatformSales;
    }

    public void setTotalGrossPlatformSales(BigDecimal totalGrossPlatformSales) {
        this.totalGrossPlatformSales = totalGrossPlatformSales;
    }

    public double getDirectFarmerRevenuePercentage() {
        return directFarmerRevenuePercentage;
    }

    public void setDirectFarmerRevenuePercentage(double directFarmerRevenuePercentage) {
        this.directFarmerRevenuePercentage = directFarmerRevenuePercentage;
    }

    public BigDecimal getEstimatedMiddlemanCommissionEliminated() {
        return estimatedMiddlemanCommissionEliminated;
    }

    public void setEstimatedMiddlemanCommissionEliminated(BigDecimal estimatedMiddlemanCommissionEliminated) {
        this.estimatedMiddlemanCommissionEliminated = estimatedMiddlemanCommissionEliminated;
    }

    public long getTotalRegisteredFarmers() {
        return totalRegisteredFarmers;
    }

    public void setTotalRegisteredFarmers(long totalRegisteredFarmers) {
        this.totalRegisteredFarmers = totalRegisteredFarmers;
    }

    public long getTotalOrdersCompleted() {
        return totalOrdersCompleted;
    }

    public void setTotalOrdersCompleted(long totalOrdersCompleted) {
        this.totalOrdersCompleted = totalOrdersCompleted;
    }

    public long getClearanceProduceUnitsSold() {
        return clearanceProduceUnitsSold;
    }

    public void setClearanceProduceUnitsSold(long clearanceProduceUnitsSold) {
        this.clearanceProduceUnitsSold = clearanceProduceUnitsSold;
    }

    public double getEstimatedKgFoodWastePrevented() {
        return estimatedKgFoodWastePrevented;
    }

    public void setEstimatedKgFoodWastePrevented(double estimatedKgFoodWastePrevented) {
        this.estimatedKgFoodWastePrevented = estimatedKgFoodWastePrevented;
    }

    public long getActivePerishableListings() {
        return activePerishableListings;
    }

    public void setActivePerishableListings(long activePerishableListings) {
        this.activePerishableListings = activePerishableListings;
    }

    public String getSdg2Description() {
        return sdg2Description;
    }

    public void setSdg2Description(String sdg2Description) {
        this.sdg2Description = sdg2Description;
    }

    public String getSdg12Description() {
        return sdg12Description;
    }

    public void setSdg12Description(String sdg12Description) {
        this.sdg12Description = sdg12Description;
    }
}
