package com.example.order.dto;

import java.math.BigDecimal;

public class TheaterStatsResponse {
    private long totalMovies;
    private long totalShowtimes;
    private long totalBookings;
    private long totalSeatsSold;
    private BigDecimal totalRevenue;
    private double overallOccupancyRate;

    public TheaterStatsResponse() {
    }

    public TheaterStatsResponse(long totalMovies, long totalShowtimes, long totalBookings,
                                long totalSeatsSold, BigDecimal totalRevenue, double overallOccupancyRate) {
        this.totalMovies = totalMovies;
        this.totalShowtimes = totalShowtimes;
        this.totalBookings = totalBookings;
        this.totalSeatsSold = totalSeatsSold;
        this.totalRevenue = totalRevenue;
        this.overallOccupancyRate = overallOccupancyRate;
    }

    public long getTotalMovies() {
        return totalMovies;
    }

    public void setTotalMovies(long totalMovies) {
        this.totalMovies = totalMovies;
    }

    public long getTotalShowtimes() {
        return totalShowtimes;
    }

    public void setTotalShowtimes(long totalShowtimes) {
        this.totalShowtimes = totalShowtimes;
    }

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getTotalSeatsSold() {
        return totalSeatsSold;
    }

    public void setTotalSeatsSold(long totalSeatsSold) {
        this.totalSeatsSold = totalSeatsSold;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public double getOverallOccupancyRate() {
        return overallOccupancyRate;
    }

    public void setOverallOccupancyRate(double overallOccupancyRate) {
        this.overallOccupancyRate = overallOccupancyRate;
    }
}
