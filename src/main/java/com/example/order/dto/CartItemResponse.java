package com.example.order.dto;

import com.example.order.model.entity.CartItem;
import java.math.BigDecimal;

public class CartItemResponse {

    private Long cartItemId;
    private Long productId;
    private String productName;
    private String unit;
    private int quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
    private boolean clearanceDiscountApplied;
    private String farmerName;

    public CartItemResponse() {
    }

    public static CartItemResponse fromEntity(CartItem item) {
        CartItemResponse dto = new CartItemResponse();
        dto.setCartItemId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setUnit(item.getProduct().getUnit());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setSubtotal(item.getSubtotal());
        dto.setClearanceDiscountApplied(item.getProduct().isClearanceDiscountApplied());
        if (item.getProduct().getFarmer() != null) {
            dto.setFarmerName(item.getProduct().getFarmer().getName());
        }
        return dto;
    }

    public Long getCartItemId() {
        return cartItemId;
    }

    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
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

    public boolean isClearanceDiscountApplied() {
        return clearanceDiscountApplied;
    }

    public void setClearanceDiscountApplied(boolean clearanceDiscountApplied) {
        this.clearanceDiscountApplied = clearanceDiscountApplied;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }
}
