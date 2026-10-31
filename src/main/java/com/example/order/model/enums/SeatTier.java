package com.example.order.model.enums;

public enum SeatTier {
    STANDARD("Standard", 1.0),
    PREMIUM("Premium", 1.35),
    VIP_RECLINER("VIP Recliner", 1.80);

    private final String displayName;
    private final double priceMultiplier;

    SeatTier(String displayName, double priceMultiplier) {
        this.displayName = displayName;
        this.priceMultiplier = priceMultiplier;
    }

    public String getDisplayName() {
        return displayName;
    }

    public double getPriceMultiplier() {
        return priceMultiplier;
    }
}
