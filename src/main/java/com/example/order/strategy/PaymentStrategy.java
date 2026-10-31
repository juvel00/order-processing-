package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.Booking;
import com.example.order.model.enums.PaymentMethod;

/**
 * PaymentStrategy interface demonstrating OOP Polymorphism and the Strategy Design Pattern.
 * Concrete payment mechanisms provide specific transaction logic.
 */
public interface PaymentStrategy {

    PaymentResult processPayment(Booking booking, PaymentRequest request);

    PaymentMethod getSupportedMethod();
}
