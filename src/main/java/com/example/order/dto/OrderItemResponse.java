package com.example.order.dto;

import com.example.order.model.entity.OrderItem;
import java.math.BigDecimal;

public class OrderItemResponse {

    private Long orderItemId;
    private Long productId;
    private String productName;
    private Long farmerId;
    private String farmerName;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
    private BigDecimal farmerEarning;
    private boolean clearanceDiscountApplied;

    public OrderItemResponse() {
    }

    public static OrderItemResponse fromEntity(OrderItem item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setOrderItemId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProductName());
        dto.setFarmerId(item.getFarmerId());
        dto.setFarmerName(item.getFarmerName());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setSubtotal(item.getSubtotal());
        dto.setFarmerEarning(item.getFarmerEarning());
        dto.setClearanceDiscountApplied(item.isClearanceDiscountApplied());
        return dto;
    }

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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
