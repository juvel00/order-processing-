package com.example.order.strategy;

import java.time.LocalDateTime;

public class PaymentResult {

    private final boolean successful;
    private final String transactionId;
    private final String message;
    private final LocalDateTime timestamp;

    public PaymentResult(boolean successful, String transactionId, String message) {
        this.successful = successful;
        this.transactionId = transactionId;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

    public boolean isSuccessful() {
        return successful;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
