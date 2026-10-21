package com.example.order.model.entity;

import com.example.order.model.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Farmer entity demonstrating OOP Inheritance (extends User).
 * Maps to UN SDG 2 (Zero Hunger / Target 2.3 - Farmer livelihoods and direct earnings).
 */
@Entity
@Table(name = "farmers")
public class Farmer extends User {

    @Column(nullable = false)
    private String farmName;

    @Column(nullable = false)
    private String farmLocation;

    @Column(nullable = false)
    private boolean organicCertified;

    @Column(nullable = false)
    private String upiId;

    @Column(nullable = false)
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    public Farmer() {
        super();
        setRole(UserRole.FARMER);
    }

    public Farmer(String name, String email, String phone, String address,
                  String farmName, String farmLocation, boolean organicCertified, String upiId) {
        super(name, email, phone, UserRole.FARMER, address);
        this.farmName = farmName;
        this.farmLocation = farmLocation;
        this.organicCertified = organicCertified;
        this.upiId = upiId;
        this.totalEarnings = BigDecimal.ZERO;
    }

    /**
     * Encapsulated business method to credit direct producer revenue.
     */
    public void creditEarnings(BigDecimal amount) {
        if (amount != null && amount.compareTo(BigDecimal.ZERO) > 0) {
            this.totalEarnings = this.totalEarnings.add(amount);
        }
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getFarmLocation() {
        return farmLocation;
    }

    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }

    public boolean isOrganicCertified() {
        return organicCertified;
    }

    public void setOrganicCertified(boolean organicCertified) {
        this.organicCertified = organicCertified;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }
}
