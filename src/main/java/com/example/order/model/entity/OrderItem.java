package com.example.order.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * OrderItem captures an immutable record of produce purchased,
 * including direct farmer compensation (SDG 2.3) and freshness discount applied (SDG 12.3).
 */
@Entity
@Table(name = "order_items")
public class OrderItem extends BaseEntity {

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Long farmerId;

    @Column(nullable = false)
    private String farmerName;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal farmerEarning;

    @Column(nullable = false)
    private boolean clearanceDiscountApplied;

    public OrderItem() {
    }

    public OrderItem(Order order, Product product, int quantity, BigDecimal unitPrice) {
        this.order = order;
        this.product = product;
        this.productName = product.getName();
        this.farmerId = product.getFarmer().getId();
        this.farmerName = product.getFarmer().getName();
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.subtotal = unitPrice.multiply(BigDecimal.valueOf(quantity)).setScale(2, RoundingMode.HALF_UP);
        // Direct farmer earning is 90% of item revenue (SDG 2.3)
        this.farmerEarning = this.subtotal.multiply(new BigDecimal("0.90")).setScale(2, RoundingMode.HALF_UP);
        this.clearanceDiscountApplied = product.isClearanceDiscountApplied();
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getFarmerEarning() {
        return farmerEarning;
    }

    public void setFarmerEarning(BigDecimal farmerEarning) {
        this.farmerEarning = farmerEarning;
    }

    public boolean isClearanceDiscountApplied() {
        return clearanceDiscountApplied;
    }

    public void setClearanceDiscountApplied(boolean clearanceDiscountApplied) {
        this.clearanceDiscountApplied = clearanceDiscountApplied;
    }
}
