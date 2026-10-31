package com.example.order.repository;

import com.example.order.model.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Long> {
    List<Showtime> findByMovieIdOrderByShowTimeAsc(Long movieId);
    List<Showtime> findByShowTimeBetweenOrderByShowTimeAsc(LocalDateTime start, LocalDateTime end);
}
