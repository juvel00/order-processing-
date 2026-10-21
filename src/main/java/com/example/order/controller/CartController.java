package com.example.order.controller;

import com.example.order.dto.AddToCartRequest;
import com.example.order.dto.CartResponse;
import com.example.order.dto.UpdateCartItemRequest;
import com.example.order.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@Tag(name = "2. Shopping Cart API", description = "Manage shopping cart: add items, update quantities, view live totals and direct farmer revenue share.")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    @Operation(summary = "View user cart",
               description = "Returns current shopping cart with item subtotals, total cart amount, direct farmer payout share (90%), and consumer savings.")
    public ResponseEntity<CartResponse> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping
    @Operation(summary = "Add produce to cart",
               description = "Adds produce to the user's cart or increments quantity if already present. Validates stock availability.")
    public ResponseEntity<CartResponse> addItemToCart(@Valid @RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addItemToCart(request));
    }

    @PutMapping("/{userId}/items/{productId}")
    @Operation(summary = "Update item quantity in cart",
               description = "Modifies the quantity of an item in the cart. Setting quantity to 0 removes the item.")
    public ResponseEntity<CartResponse> updateItemQuantity(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateCartItemQuantity(userId, productId, request));
    }

    @DeleteMapping("/{userId}/items/{productId}")
    @Operation(summary = "Remove item from cart", description = "Deletes a specific product line item from the user's shopping cart.")
    public ResponseEntity<CartResponse> removeItem(@PathVariable Long userId, @PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItemFromCart(userId, productId));
    }

    @DeleteMapping("/{userId}")
    @Operation(summary = "Clear shopping cart", description = "Empties all items from the user's active shopping cart.")
    public ResponseEntity<CartResponse> clearCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.clearCart(userId));
    }
}
