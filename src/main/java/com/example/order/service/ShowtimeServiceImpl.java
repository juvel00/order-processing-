package com.example.order.service;

import com.example.order.dto.SeatDto;
import com.example.order.dto.ShowtimeDetailResponse;
import com.example.order.dto.ShowtimeResponse;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.*;
import com.example.order.model.enums.SeatStatus;
import com.example.order.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowtimeServiceImpl implements ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final ShowtimeSeatRepository showtimeSeatRepository;
    private final MovieRepository movieRepository;
    private final ScreenRepository screenRepository;
    private final SeatRepository seatRepository;

    @Autowired
    public ShowtimeServiceImpl(ShowtimeRepository showtimeRepository,
                               ShowtimeSeatRepository showtimeSeatRepository,
                               MovieRepository movieRepository,
                               ScreenRepository screenRepository,
                               SeatRepository seatRepository) {
        this.showtimeRepository = showtimeRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
        this.movieRepository = movieRepository;
        this.screenRepository = screenRepository;
        this.seatRepository = seatRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeRepository.findAll().stream()
                .map(this::mapToShowtimeResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShowtimeResponse> getShowtimesByMovie(Long movieId) {
        return showtimeRepository.findByMovieIdOrderByShowTimeAsc(movieId).stream()
                .map(this::mapToShowtimeResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ShowtimeDetailResponse getShowtimeDetails(Long showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with ID: " + showtimeId));

        List<ShowtimeSeat> seats = showtimeSeatRepository.findByShowtimeIdWithSeatOrdered(showtimeId);

        List<SeatDto> seatDtos = seats.stream().map(ss -> {
            Seat seat = ss.getSeat();
            return new SeatDto(
                    ss.getId(),
                    seat.getId(),
                    seat.getSeatNumber(),
                    seat.getRowName(),
                    seat.getColumnNumber(),
                    seat.getSeatTier(),
                    ss.getEffectivePrice(),
                    ss.getStatus(),
                    seat.getAmenityDescription()
            );
        }).collect(Collectors.toList());

        Movie movie = showtime.getMovie();
        Screen screen = showtime.getScreen();

        return new ShowtimeDetailResponse(
                showtime.getId(),
                movie.getId(),
                movie.getTitle(),
                movie.getPosterUrl(),
                movie.getRating(),
                movie.getLanguage(),
                movie.getDurationMinutes(),
                screen.getId(),
                screen.getName(),
                screen.getSoundSystem(),
                screen.getTotalRows(),
                screen.getTotalCols(),
                showtime.getShowTime(),
                showtime.getBasePrice(),
                showtime.isPrimeTime(),
                seatDtos
        );
    }

    @Override
    @Transactional
    public Showtime createShowtimeWithSeats(Long movieId, Long screenId, LocalDateTime showTime, BigDecimal basePrice) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + movieId));
        Screen screen = screenRepository.findById(screenId)
                .orElseThrow(() -> new ResourceNotFoundException("Screen not found with ID: " + screenId));

        Showtime showtime = new Showtime(movie, screen, showTime, basePrice);
        Showtime savedShowtime = showtimeRepository.save(showtime);

        List<Seat> masterSeats = seatRepository.findByScreenIdOrderByRowNameAscColumnNumberAsc(screenId);
        for (Seat seat : masterSeats) {
            ShowtimeSeat showtimeSeat = new ShowtimeSeat(savedShowtime, seat);
            showtimeSeatRepository.save(showtimeSeat);
        }

        return savedShowtime;
    }

    private ShowtimeResponse mapToShowtimeResponse(Showtime showtime) {
        long availableCount = showtimeSeatRepository.countByShowtimeIdAndStatus(showtime.getId(), SeatStatus.AVAILABLE);
        int totalSeats = showtime.getScreen().getTotalCapacity();

        return new ShowtimeResponse(
                showtime.getId(),
                showtime.getMovie().getId(),
                showtime.getMovie().getTitle(),
                showtime.getMovie().getPosterUrl(),
                showtime.getMovie().getRating(),
                showtime.getScreen().getId(),
                showtime.getScreen().getName(),
                showtime.getScreen().getSoundSystem(),
                showtime.getShowTime(),
                showtime.getBasePrice(),
                showtime.isPrimeTime(),
                totalSeats,
                (int) availableCount
        );
    }
}
