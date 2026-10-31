package com.example.order.repository;

import com.example.order.model.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Long> {
    Optional<Screen> findByName(String name);
}
