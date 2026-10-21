package com.example.order.strategy;

import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.Order;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;
import java.util.UUID;

/**
 * Concrete Strategy for Cash on Delivery (COD).
 */
@Component
public class CashOnDeliveryPaymentStrategy implements PaymentStrategy {

    @Override
    public PaymentResult processPayment(Order order, PaymentRequest request) {
        String transactionId = "COD-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase();
        String message = String.format("Cash on Delivery verified for Order #%s. Amount payable on delivery: ₹%.2f. Delivery notes: %s",
                order.getOrderNumber(), order.getTotalAmount(),
                request.getNotes() != null && !request.getNotes().isBlank() ? request.getNotes() : "Standard farm delivery");

        return new PaymentResult(true, transactionId, message);
    }

    @Override
    public PaymentMethod getSupportedMethod() {
        return PaymentMethod.CASH_ON_DELIVERY;
    }
}
