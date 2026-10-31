package com.example.order.service;

import com.example.order.dto.PaymentRequest;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.entity.Booking;
import com.example.order.model.entity.Payment;
import com.example.order.model.enums.PaymentStatus;
import com.example.order.repository.PaymentRepository;
import com.example.order.strategy.PaymentResult;
import com.example.order.strategy.PaymentStrategy;
import com.example.order.strategy.PaymentStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentStrategyFactory strategyFactory;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentServiceImpl(PaymentStrategyFactory strategyFactory, PaymentRepository paymentRepository) {
        this.strategyFactory = strategyFactory;
        this.paymentRepository = paymentRepository;
    }

    @Override
    @Transactional
    public Payment processPayment(Booking booking, PaymentRequest request) {
        PaymentStrategy strategy = strategyFactory.getStrategy(request.getPaymentMethod());
        PaymentResult result = strategy.processPayment(booking, request);

        if (!result.isSuccessful()) {
            throw new PaymentProcessingException("Payment transaction rejected: " + result.getMessage());
        }

        String details = switch (request.getPaymentMethod()) {
            case CARD -> {
                String raw = request.getCardNumber().replaceAll("\\s+", "");
                yield "****-****-****-" + raw.substring(raw.length() - 4);
            }
            case UPI -> request.getUpiId();
            case NET_BANKING -> request.getBankName();
        };

        Payment payment = new Payment(
                booking,
                request.getPaymentMethod(),
                booking.getTotalAmount(),
                PaymentStatus.SUCCESS,
                result.getTransactionId(),
                details
        );

        return paymentRepository.save(payment);
    }
}
