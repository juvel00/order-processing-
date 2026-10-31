package com.example.order.repository;

import com.example.order.model.entity.Movie;
import com.example.order.model.enums.MovieGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByActiveTrue();
    List<Movie> findByGenre(MovieGenre genre);
    List<Movie> findByTitleContainingIgnoreCase(String keyword);
}
