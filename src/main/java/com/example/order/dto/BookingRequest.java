package com.example.order.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class BookingRequest {

    @Schema(description = "Showtime identifier", example = "1")
    @NotNull(message = "Showtime ID is required")
    private Long showtimeId;

    @Schema(description = "Customer identifier (Optional, defaults to 1)", example = "1")
    private Long customerId;

    @Schema(description = "List of ShowtimeSeat IDs to reserve", example = "[1, 2]")
    @NotEmpty(message = "At least one seat must be selected")
    private List<Long> showtimeSeatIds;

    @Schema(description = "Payment authorization payload")
    @NotNull(message = "Payment details are required")
    @Valid
    private PaymentRequest payment;

    public BookingRequest() {
    }

    public BookingRequest(Long showtimeId, Long customerId, List<Long> showtimeSeatIds, PaymentRequest payment) {
        this.showtimeId = showtimeId;
        this.customerId = customerId;
        this.showtimeSeatIds = showtimeSeatIds;
        this.payment = payment;
    }

    public Long getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(Long showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<Long> getShowtimeSeatIds() {
        return showtimeSeatIds;
    }

    public void setShowtimeSeatIds(List<Long> showtimeSeatIds) {
        this.showtimeSeatIds = showtimeSeatIds;
    }

    public PaymentRequest getPayment() {
        return payment;
    }

    public void setPayment(PaymentRequest payment) {
        this.payment = payment;
    }
}
