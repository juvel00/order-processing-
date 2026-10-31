package com.example.order.service;

import com.example.order.dto.ShowtimeDetailResponse;
import com.example.order.dto.ShowtimeResponse;
import com.example.order.model.entity.Showtime;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface ShowtimeService {
    List<ShowtimeResponse> getAllShowtimes();
    List<ShowtimeResponse> getShowtimesByMovie(Long movieId);
    ShowtimeDetailResponse getShowtimeDetails(Long showtimeId);
    Showtime createShowtimeWithSeats(Long movieId, Long screenId, LocalDateTime showTime, BigDecimal basePrice);
}
