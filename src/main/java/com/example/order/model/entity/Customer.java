package com.example.order.model.entity;

import com.example.order.model.enums.UserRole;
import jakarta.persistence.*;

/**
 * Customer entity demonstrating OOP Inheritance (extends User).
 * Represents moviegoers booking theater seats and accumulating loyalty points.
 */
@Entity
@Table(name = "customers")
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User {

    @Column(name = "loyalty_points")
    private Integer loyaltyPoints = 0;

    @Column(name = "membership_tier")
    private String membershipTier = "SILVER";

    public Customer() {
        super();
        setRole(UserRole.CUSTOMER);
    }

    public Customer(String name, String email, String phone, String membershipTier) {
        super(name, email, phone, UserRole.CUSTOMER);
        this.membershipTier = membershipTier;
        this.loyaltyPoints = 0;
    }

    public void addLoyaltyPoints(int points) {
        if (points > 0) {
            this.loyaltyPoints += points;
            updateMembershipTier();
        }
    }

    private void updateMembershipTier() {
        if (this.loyaltyPoints >= 500) {
            this.membershipTier = "PLATINUM";
        } else if (this.loyaltyPoints >= 200) {
            this.membershipTier = "GOLD";
        } else {
            this.membershipTier = "SILVER";
        }
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }

    public String getMembershipTier() {
        return membershipTier;
    }

    public void setMembershipTier(String membershipTier) {
        this.membershipTier = membershipTier;
    }
}
