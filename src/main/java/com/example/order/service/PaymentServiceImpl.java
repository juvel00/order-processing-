package com.example.order.service;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.Order;
import com.example.order.model.entity.Payment;
import com.example.order.model.enums.PaymentStatus;
import com.example.order.repository.PaymentRepository;
import com.example.order.strategy.PaymentResult;
import com.example.order.strategy.PaymentStrategy;
import com.example.order.strategy.PaymentStrategyFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentStrategyFactory strategyFactory;
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentStrategyFactory strategyFactory, PaymentRepository paymentRepository) {
        this.strategyFactory = strategyFactory;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public PaymentResult processOrderPayment(Order order, PaymentRequest request) {
        // Polymorphic resolution via Factory and Strategy pattern
        PaymentStrategy strategy = strategyFactory.getStrategy(request.getPaymentMethod());
        PaymentResult result = strategy.processPayment(order, request);

        Payment payment = new Payment(
                result.getTransactionId(),
                order,
                request.getPaymentMethod(),
                order.getTotalAmount(),
                result.isSuccessful() ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
                result.getMessage()
        );
        paymentRepository.save(payment);

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment record not found for Order ID: " + orderId));
    }
}
