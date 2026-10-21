package com.example.order.service;

import com.example.order.dto.CreateProduceRequest;
import com.example.order.dto.ProductResponse;
import com.example.order.model.enums.ProductCategory;
import java.util.List;

/**
 * Service interface demonstrating OOP Abstraction.
 * Decouples Web/REST Controller layer from JPA persistence logic.
 */
public interface ProductService {

    List<ProductResponse> getAllProducts();

    List<ProductResponse> getProductsByCategory(ProductCategory category);

    ProductResponse getProductById(Long id);

    ProductResponse addProduce(CreateProduceRequest request);

    List<ProductResponse> getPerishableClearanceProducts();

    void updateStock(Long productId, int quantityChange);
}
