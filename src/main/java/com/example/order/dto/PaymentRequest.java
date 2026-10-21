package com.example.order.dto;

import com.example.order.model.enums.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class PaymentRequest {

    @Schema(description = "Payment method", example = "UPI")
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    @Schema(description = "UPI ID (Required for UPI payments)", example = "farmerdirect@okaxis")
    private String upiId;

    @Schema(description = "Card number (Required for Card payments)", example = "4111222233334444")
    private String cardNumber;

    @Schema(description = "Card holder name", example = "John Doe")
    private String cardHolderName;

    @Schema(description = "Expiry month (1-12)", example = "12")
    private Integer expiryMonth;

    @Schema(description = "Expiry year (e.g. 2028)", example = "2028")
    private Integer expiryYear;

    @Schema(description = "Card CVV", example = "123")
    private String cvv;

    @Schema(description = "Delivery / COD instructions", example = "Keep exact change ready")
    private String notes;

    public PaymentRequest() {
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getUpiId() {
        return upiId;
    }

    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public Integer getExpiryMonth() {
        return expiryMonth;
    }

    public void setExpiryMonth(Integer expiryMonth) {
        this.expiryMonth = expiryMonth;
    }

    public Integer getExpiryYear() {
        return expiryYear;
    }

    public void setExpiryYear(Integer expiryYear) {
        this.expiryYear = expiryYear;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
