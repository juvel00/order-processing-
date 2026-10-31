package com.example.order.service;

import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.Booking;
import com.example.order.model.entity.Payment;

public interface PaymentService {
    Payment processPayment(Booking booking, PaymentRequest request);
}
