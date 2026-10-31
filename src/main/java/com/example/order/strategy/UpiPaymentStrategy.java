package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Booking;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * UpiPaymentStrategy implements Instant Unified Payments Interface (UPI) authorization.
 * Demonstrates the Strategy Design Pattern.
 */
@Component
public class UpiPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Booking booking, PaymentRequest request) {
        if (request.getUpiId() == null || !request.getUpiId().matches("^[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z]{2,64}$")) {
            throw new PaymentProcessingException("Invalid UPI ID format. Expected user@bank or user@handle.");
        }

        String txnId = "TXN-UPI-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();

        return new PaymentResult(true, txnId, "UPI payment authorized via " + request.getUpiId());
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.UPI;
    }
}
