package com.example.order.dto;

import com.example.order.model.enums.SeatStatus;
import com.example.order.model.enums.SeatTier;
import java.math.BigDecimal;

public class SeatDto {
    private Long showtimeSeatId;
    private Long seatId;
    private String seatNumber;
    private String rowName;
    private int columnNumber;
    private SeatTier seatTier;
    private BigDecimal price;
    private SeatStatus status;
    private String amenityDescription;

    public SeatDto() {
    }

    public SeatDto(Long showtimeSeatId, Long seatId, String seatNumber, String rowName,
                   int columnNumber, SeatTier seatTier, BigDecimal price,
                   SeatStatus status, String amenityDescription) {
        this.showtimeSeatId = showtimeSeatId;
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.rowName = rowName;
        this.columnNumber = columnNumber;
        this.seatTier = seatTier;
        this.price = price;
        this.status = status;
        this.amenityDescription = amenityDescription;
    }

    public Long getShowtimeSeatId() {
        return showtimeSeatId;
    }

    public void setShowtimeSeatId(Long showtimeSeatId) {
        this.showtimeSeatId = showtimeSeatId;
    }

    public Long getSeatId() {
        return seatId;
    }

    public void setSeatId(Long seatId) {
        this.seatId = seatId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getRowName() {
        return rowName;
    }

    public void setRowName(String rowName) {
        this.rowName = rowName;
    }

    public int getColumnNumber() {
        return columnNumber;
    }

    public void setColumnNumber(int columnNumber) {
        this.columnNumber = columnNumber;
    }

    public SeatTier getSeatTier() {
        return seatTier;
    }

    public void setSeatTier(SeatTier seatTier) {
        this.seatTier = seatTier;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public SeatStatus getStatus() {
        return status;
    }

    public void setStatus(SeatStatus status) {
        this.status = status;
    }

    public String getAmenityDescription() {
        return amenityDescription;
    }

    public void setAmenityDescription(String amenityDescription) {
        this.amenityDescription = amenityDescription;
    }
}
