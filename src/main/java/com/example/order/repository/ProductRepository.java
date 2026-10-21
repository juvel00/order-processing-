package com.example.order.repository;

import com.example.order.model.entity.Product;
import com.example.order.model.enums.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(ProductCategory category);

    List<Product> findByFarmerId(Long farmerId);

    List<Product> findByStockQuantityGreaterThan(int minStock);

    @Query("SELECT p FROM Product p WHERE TYPE(p) = PerishableProduce")
    List<Product> findAllPerishableProduce();
}
