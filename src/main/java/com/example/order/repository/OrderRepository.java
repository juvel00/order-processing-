package com.example.order.repository;

import com.example.order.model.entity.Order;
import com.example.order.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByStatus(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalFarmerPayout), 0) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal sumTotalFarmerPayout();

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal sumTotalRevenue();

    @Query("SELECT COALESCE(SUM(o.estimatedBrokerMarkupSaved), 0) FROM Order o WHERE o.status != 'CANCELLED'")
    BigDecimal sumEstimatedBrokerMarkupSaved();
}
