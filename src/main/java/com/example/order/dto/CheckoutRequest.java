package com.example.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CheckoutRequest {

    @Schema(description = "User ID placing the order", example = "3")
    @NotNull(message = "User ID is required")
    private Long userId;

    @Schema(description = "Delivery address", example = "Flat 402, Green Meadows, Bengaluru")
    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;

    @Schema(description = "Payment details")
    @NotNull(message = "Payment details are required")
    @Valid
    private PaymentRequest payment;

    public CheckoutRequest() {
    }

    public CheckoutRequest(Long userId, String deliveryAddress, PaymentRequest payment) {
        this.userId = userId;
        this.deliveryAddress = deliveryAddress;
        this.payment = payment;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public PaymentRequest getPayment() {
        return payment;
    }

    public void setPayment(PaymentRequest payment) {
        this.payment = payment;
    }
}
