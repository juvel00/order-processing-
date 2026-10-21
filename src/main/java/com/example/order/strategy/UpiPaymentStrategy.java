package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Order;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;
import java.util.UUID;

/**
 * Concrete Strategy for instant UPI payments (Direct bank-to-bank settlement to farmer).
 */
@Component
public class UpiPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Order order, PaymentRequest request) {
        String upiId = request.getUpiId();
        if (upiId == null || !upiId.contains("@") || upiId.trim().length() < 5) {
            throw new PaymentProcessingException("Invalid UPI ID: '" + upiId + "'. Must be in the format username@bank.");
        }

        String transactionId = "UPI-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        String message = String.format("UPI payment of ₹%.2f processed successfully via VPA: %s for Order #%s",
                order.getTotalAmount(), upiId.trim(), order.getOrderNumber());

        return new PaymentResult(true, transactionId, message);
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.UPI;
    }
}
