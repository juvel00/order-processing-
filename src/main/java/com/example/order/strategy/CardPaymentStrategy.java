package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Order;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;
import java.time.Year;
import java.util.UUID;

/**
 * Concrete Strategy for Credit/Debit Card payments.
 */
@Component
public class CardPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Order order, PaymentRequest request) {
        String cardNum = request.getCardNumber();
        if (cardNum == null || cardNum.replaceAll("\\s|-", "").length() < 13) {
            throw new PaymentProcessingException("Invalid card number. Must be a valid 13-19 digit card.");
        }

        Integer expiryYear = request.getExpiryYear();
        int currentYear = Year.now().getValue();
        if (expiryYear == null || expiryYear < currentYear) {
            throw new PaymentProcessingException("Invalid card expiration year: " + expiryYear);
        }

        String cvv = request.getCvv();
        if (cvv == null || cvv.trim().length() < 3 || cvv.trim().length() > 4) {
            throw new PaymentProcessingException("Invalid CVV: Must be 3 or 4 digits.");
        }

        String cleanDigits = cardNum.replaceAll("\\s|-", "");
        String maskedCard = "****-****-****-" + cleanDigits.substring(cleanDigits.length() - 4);
        String transactionId = "CARD-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        String message = String.format("Card payment of ₹%.2f processed successfully via %s (%s) for Order #%s",
                order.getTotalAmount(), maskedCard, request.getPaymentMethod(), order.getOrderNumber());

        return new PaymentResult(true, transactionId, message);
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.CREDIT_CARD;
    }
}
