package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.Order;
import com.example.order.model.enums.PaymentMethod;

/**
 * PaymentStrategy interface demonstrating OOP Polymorphism and Strategy Pattern.
 * Concrete payment mechanisms provide specific transaction logic.
 */
public interface PaymentStrategy {

    PaymentResult processPayment(Order order, PaymentRequest request);

    PaymentMethod getSupportedMethod();
}
