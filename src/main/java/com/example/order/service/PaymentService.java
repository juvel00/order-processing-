package com.example.order.service;

import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.Order;
import com.example.order.model.entity.Payment;
import com.example.order.strategy.PaymentResult;

/**
 * PaymentService interface demonstrating Abstraction.
 */
public interface PaymentService {

    PaymentResult processOrderPayment(Order order, PaymentRequest request);

    Payment getPaymentByOrderId(Long orderId);
}
