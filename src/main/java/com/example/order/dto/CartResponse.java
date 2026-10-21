package com.example.order.dto;

import com.example.order.model.entity.Cart;
import java.math.BigDecimal;
import java.util.List;

public class CartResponse {

    private Long cartId;
    private Long userId;
    private String userName;
    private List<CartItemResponse> items;
    private int totalItemCount;
    private BigDecimal totalAmount;
    private BigDecimal directFarmerShare;
    private BigDecimal estimatedConsumerSavings;

    public CartResponse() {
    }

    public static CartResponse fromEntity(Cart cart) {
        CartResponse dto = new CartResponse();
        dto.setCartId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setUserName(cart.getUser().getName());
        dto.setItems(cart.getItems().stream().map(CartItemResponse::fromEntity).toList());
        dto.setTotalItemCount(cart.getTotalItemCount());
        dto.setTotalAmount(cart.calculateTotal());
        dto.setDirectFarmerShare(cart.calculateFarmerShare());
        dto.setEstimatedConsumerSavings(cart.calculateConsumerSavings());
        return dto;
    }

    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public List<CartItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CartItemResponse> items) {
        this.items = items;
    }

    public int getTotalItemCount() {
        return totalItemCount;
    }

    public void setTotalItemCount(int totalItemCount) {
        this.totalItemCount = totalItemCount;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getDirectFarmerShare() {
        return directFarmerShare;
    }

    public void setDirectFarmerShare(BigDecimal directFarmerShare) {
        this.directFarmerShare = directFarmerShare;
    }

    public BigDecimal getEstimatedConsumerSavings() {
        return estimatedConsumerSavings;
    }

    public void setEstimatedConsumerSavings(BigDecimal estimatedConsumerSavings) {
        this.estimatedConsumerSavings = estimatedConsumerSavings;
    }
}
