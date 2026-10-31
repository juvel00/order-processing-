package com.example.order.repository;

import com.example.order.model.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByScreenIdOrderByRowNameAscColumnNumberAsc(Long screenId);
}
