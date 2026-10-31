package com.example.order.repository;

import com.example.order.model.entity.ShowtimeSeat;
import com.example.order.model.enums.SeatStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeSeatRepository extends JpaRepository<ShowtimeSeat, Long> {
    List<ShowtimeSeat> findByShowtimeId(Long showtimeId);

    @Query("SELECT ss FROM ShowtimeSeat ss JOIN FETCH ss.seat s WHERE ss.showtime.id = :showtimeId ORDER BY s.rowName ASC, s.columnNumber ASC")
    List<ShowtimeSeat> findByShowtimeIdWithSeatOrdered(@Param("showtimeId") Long showtimeId);

    long countByShowtimeIdAndStatus(Long showtimeId, SeatStatus status);

    long countByStatus(SeatStatus status);
}
