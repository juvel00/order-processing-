package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Booking;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.UUID;

/**
 * CardPaymentStrategy implements payment validation and settlement for Credit/Debit cards.
 * Demonstrates the Strategy Design Pattern.
 */
@Component
public class CardPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Booking booking, PaymentRequest request) {
        if (request.getCardNumber() == null || !request.getCardNumber().replaceAll("\\s+", "").matches("^\\d{15,19}$")) {
            throw new PaymentProcessingException("Invalid card number. Must be between 15 and 19 digits.");
        }

        if (request.getCvv() == null || !request.getCvv().matches("^\\d{3,4}$")) {
            throw new PaymentProcessingException("Invalid CVV code. Must be 3 or 4 digits.");
        }

        if (request.getExpiryYear() == null || request.getExpiryMonth() == null) {
            throw new PaymentProcessingException("Card expiration date is required.");
        }

        LocalDate now = LocalDate.now();
        int currentYear = now.getYear();
        int currentMonth = now.getMonthValue();

        if (request.getExpiryYear() < currentYear ||
                (request.getExpiryYear() == currentYear && request.getExpiryMonth() < currentMonth)) {
            throw new PaymentProcessingException("Card has expired.");
        }

        String rawCard = request.getCardNumber().replaceAll("\\s+", "");
        String maskedCard = "****-****-****-" + rawCard.substring(rawCard.length() - 4);
        String txnId = "TXN-CARD-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();

        return new PaymentResult(true, txnId, "Credit/Debit Card payment authorized successfully (" + maskedCard + ")");
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.CARD;
    }
}
