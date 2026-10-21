package com.example.order.model.entity;

import com.example.order.exception.InsufficientStockException;
import com.example.order.model.enums.ProductCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Abstract Product demonstrating OOP Abstraction and Inheritance.
 * Subclasses PerishableProduce and ProcessedProduce implement polymorphic pricing & waste mitigation.
 */
@Entity
@Table(name = "products")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "produce_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Product extends BaseEntity {

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Category is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProductCategory category;

    @NotBlank(message = "Measurement unit is required (e.g. kg, bundle, liter)")
    @Column(nullable = false)
    private String unit;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than zero")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Column(nullable = false)
    private int stockQuantity;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "farmer_id", nullable = false)
    private Farmer farmer;

    public Product() {
    }

    public Product(String name, String description, ProductCategory category, String unit,
                   BigDecimal basePrice, int stockQuantity, Farmer farmer) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.unit = unit;
        this.basePrice = basePrice;
        this.stockQuantity = stockQuantity;
        this.farmer = farmer;
    }

    // Abstract polymorphic methods to be implemented by child produce types
    public abstract BigDecimal calculateEffectivePrice();

    public abstract String getProduceTypeDescription();

    public abstract boolean isClearanceDiscountApplied();

    /**
     * Encapsulated business logic for stock deduction with validation.
     */
    public synchronized void reduceStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity to reduce must be positive.");
        }
        if (this.stockQuantity < quantity) {
            throw new InsufficientStockException(
                "Insufficient stock for produce '" + this.name + "'. Available: " + this.stockQuantity + ", Requested: " + quantity
            );
        }
        this.stockQuantity -= quantity;
    }

    /**
     * Encapsulated business logic to replenish stock.
     */
    public synchronized void restock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Restock quantity must be positive.");
        }
        this.stockQuantity += quantity;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }
}
