package com.example.order.service;

import com.example.order.dto.CheckoutRequest;
import com.example.order.dto.OrderResponse;
import java.util.List;

/**
 * OrderService interface demonstrating Abstraction.
 */
public interface OrderService {

    OrderResponse checkoutCart(CheckoutRequest request);

    OrderResponse getOrderByOrderNumber(String orderNumber);

    OrderResponse getOrderById(Long orderId);

    List<OrderResponse> getOrdersByUserId(Long userId);

    List<OrderResponse> getAllOrders();
}
