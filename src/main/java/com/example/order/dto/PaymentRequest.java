package com.example.order.dto;

import com.example.order.model.enums.PaymentMethod;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

public class PaymentRequest {

    @Schema(description = "Payment method (CARD, UPI, NET_BANKING)", example = "UPI")
    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    @Schema(description = "UPI ID / VPA (Required for UPI payments)", example = "user@oksbi")
    private String upiId;

    @Schema(description = "16-digit card number (Required for Card payments)", example = "4111222233334444")
    private String cardNumber;

    @Schema(description = "Card holder name", example = "Rahul Sharma")
    private String cardHolderName;

    @Schema(description = "Card expiration month (1-12)", example = "12")
    private Integer expiryMonth;

    @Schema(description = "Card expiration year (e.g., 2028)", example = "2028")
    private Integer expiryYear;

    @Schema(description = "Card CVV (3-4 digits)", example = "123")
    private String cvv;

    @Schema(description = "Bank code / name (Required for Net Banking)", example = "HDFC_BANK")
    private String bankName;

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

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }
}
