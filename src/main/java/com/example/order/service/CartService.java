package com.example.order.service;

import com.example.order.dto.AddToCartRequest;
import com.example.order.dto.CartResponse;
import com.example.order.dto.UpdateCartItemRequest;

/**
 * CartService interface demonstrating Abstraction.
 */
public interface CartService {

    CartResponse getCartByUserId(Long userId);

    CartResponse addItemToCart(AddToCartRequest request);

    CartResponse updateCartItemQuantity(Long userId, Long productId, UpdateCartItemRequest request);

    CartResponse removeItemFromCart(Long userId, Long productId);

    CartResponse clearCart(Long userId);
}
