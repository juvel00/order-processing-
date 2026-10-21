package com.example.order.service;

import com.example.order.dto.CreateProduceRequest;
import com.example.order.dto.ProductResponse;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.Farmer;
import com.example.order.model.entity.PerishableProduce;
import com.example.order.model.entity.ProcessedProduce;
import com.example.order.model.entity.Product;
import com.example.order.model.enums.ProductCategory;
import com.example.order.repository.FarmerRepository;
import com.example.order.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final FarmerRepository farmerRepository;

    public ProductServiceImpl(ProductRepository productRepository, FarmerRepository farmerRepository) {
        this.productRepository = productRepository;
        this.farmerRepository = farmerRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategory(ProductCategory category) {
        return productRepository.findByCategory(category).stream()
                .map(ProductResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produce item not found with ID: " + id));
        return ProductResponse.fromEntity(product);
    }

    @Override
    public ProductResponse addProduce(CreateProduceRequest request) {
        Farmer farmer = farmerRepository.findById(request.getFarmerId())
                .orElseThrow(() -> new ResourceNotFoundException("Farmer not found with ID: " + request.getFarmerId()));

        Product product;
        if ("PERISHABLE".equalsIgnoreCase(request.getProduceType())) {
            LocalDate harvest = request.getHarvestDate() != null ? request.getHarvestDate() : LocalDate.now();
            int shelfLife = request.getShelfLifeDays() != null ? request.getShelfLifeDays() : 7;
            boolean coldStorage = Boolean.TRUE.equals(request.getColdStorageRequired());
            String freshness = request.getFreshnessGrade() != null ? request.getFreshnessGrade() : "Grade A Fresh";

            product = new PerishableProduce(
                    request.getName(),
                    request.getDescription(),
                    request.getCategory(),
                    request.getUnit(),
                    request.getBasePrice(),
                    request.getStockQuantity(),
                    farmer,
                    harvest,
                    shelfLife,
                    coldStorage,
                    freshness
            );
        } else {
            LocalDate packaging = request.getPackagingDate() != null ? request.getPackagingDate() : LocalDate.now();
            int shelfLifeMonths = request.getShelfLifeMonths() != null ? request.getShelfLifeMonths() : 6;
            String method = request.getProcessingMethod() != null ? request.getProcessingMethod() : "Farm Processed";
            String cert = request.getCertificationStandard() != null ? request.getCertificationStandard() : "Local Artisan";

            product = new ProcessedProduce(
                    request.getName(),
                    request.getDescription(),
                    request.getCategory(),
                    request.getUnit(),
                    request.getBasePrice(),
                    request.getStockQuantity(),
                    farmer,
                    method,
                    packaging,
                    shelfLifeMonths,
                    cert
            );
        }

        Product saved = productRepository.save(product);
        return ProductResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getPerishableClearanceProducts() {
        return productRepository.findAllPerishableProduce().stream()
                .filter(Product::isClearanceDiscountApplied)
                .map(ProductResponse::fromEntity)
                .toList();
    }

    @Override
    public void updateStock(Long productId, int quantityChange) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Produce item not found with ID: " + productId));
        if (quantityChange < 0) {
            product.reduceStock(Math.abs(quantityChange));
        } else {
            product.restock(quantityChange);
        }
        productRepository.save(product);
    }
}
