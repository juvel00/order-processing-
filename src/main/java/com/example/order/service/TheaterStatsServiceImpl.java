package com.example.order.service;

import com.example.order.dto.TheaterStatsResponse;
import com.example.order.model.enums.BookingStatus;
import com.example.order.model.enums.SeatStatus;
import com.example.order.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
public class TheaterStatsServiceImpl implements TheaterStatsService {

    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;
    private final BookingRepository bookingRepository;
    private final ShowtimeSeatRepository showtimeSeatRepository;

    @Autowired
    public TheaterStatsServiceImpl(MovieRepository movieRepository,
                                  ShowtimeRepository showtimeRepository,
                                  BookingRepository bookingRepository,
                                  ShowtimeSeatRepository showtimeSeatRepository) {
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
        this.bookingRepository = bookingRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
    }

    @Override
    public TheaterStatsResponse getTheaterStats() {
        long totalMovies = movieRepository.count();
        long totalShowtimes = showtimeRepository.count();
        long totalBookings = bookingRepository.countByStatus(BookingStatus.CONFIRMED);
        long totalSeatsSold = showtimeSeatRepository.countByStatus(SeatStatus.BOOKED);
        long totalSeatsAvailable = showtimeSeatRepository.countByStatus(SeatStatus.AVAILABLE);
        BigDecimal totalRevenue = bookingRepository.calculateTotalConfirmedRevenue();

        long totalAllSeats = totalSeatsSold + totalSeatsAvailable;
        double occupancyRate = 0.0;
        if (totalAllSeats > 0) {
            occupancyRate = ((double) totalSeatsSold / totalAllSeats) * 100.0;
            occupancyRate = Math.round(occupancyRate * 10.0) / 10.0;
        }

        return new TheaterStatsResponse(
                totalMovies,
                totalShowtimes,
                totalBookings,
                totalSeatsSold,
                totalRevenue != null ? totalRevenue : BigDecimal.ZERO,
                occupancyRate
        );
    }
}
