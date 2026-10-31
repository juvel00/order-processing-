package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Booking;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * NetBankingPaymentStrategy handles direct institutional net banking gateway payments.
 * Demonstrates the Strategy Design Pattern.
 */
@Component
public class NetBankingPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Booking booking, PaymentRequest request) {
        if (request.getBankName() == null || request.getBankName().trim().isEmpty()) {
            throw new PaymentProcessingException("Please select a valid banking institution for Net Banking.");
        }

        String txnId = "TXN-NETBANK-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();

        return new PaymentResult(true, txnId, "Net Banking transaction authorized via " + request.getBankName());
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.NET_BANKING;
    }
}
