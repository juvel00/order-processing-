package com.example.order.model.entity;

import com.example.order.model.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * Consumer entity demonstrating OOP Inheritance (extends User).
 */
@Entity
@Table(name = "consumers")
public class Consumer extends User {

    @Column(nullable = false)
    private String defaultDeliveryAddress;

    @Column(nullable = false)
    private int loyaltyPoints = 0;

    public Consumer() {
        super();
        setRole(UserRole.CONSUMER);
    }

    public Consumer(String name, String email, String phone, String address, String defaultDeliveryAddress) {
        super(name, email, phone, UserRole.CONSUMER, address);
        this.defaultDeliveryAddress = defaultDeliveryAddress;
        this.loyaltyPoints = 0;
    }

    public void addLoyaltyPoints(int points) {
        if (points > 0) {
            this.loyaltyPoints += points;
        }
    }

    public String getDefaultDeliveryAddress() {
        return defaultDeliveryAddress;
    }

    public void setDefaultDeliveryAddress(String defaultDeliveryAddress) {
        this.defaultDeliveryAddress = defaultDeliveryAddress;
    }

    public int getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public void setLoyaltyPoints(int loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }
}
