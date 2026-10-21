package com.example.order.model.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Cart entity demonstrating OOP Encapsulation of shopping cart domain logic.
 */
@Entity
@Table(name = "carts")
public class Cart extends BaseEntity {

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<CartItem> items = new ArrayList<>();

    public Cart() {
    }

    public Cart(User user) {
        this.user = user;
    }

    /**
     * Encapsulated domain logic: Add product to cart or increment quantity if already present.
     */
    public void addProduct(Product product, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero.");
        }
        Optional<CartItem> existingItem = items.stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().incrementQuantity(quantity);
            // Update to latest effective price (which may have dynamic clearance discount applied)
            existingItem.get().setUnitPrice(product.calculateEffectivePrice());
        } else {
            CartItem newItem = new CartItem(this, product, quantity, product.calculateEffectivePrice());
            items.add(newItem);
        }
    }

    /**
     * Remove product from cart.
     */
    public boolean removeProduct(Long productId) {
        return items.removeIf(item -> item.getProduct().getId().equals(productId));
    }

    /**
     * Update product quantity in cart.
     */
    public void updateQuantity(Long productId, int quantity) {
        if (quantity <= 0) {
            removeProduct(productId);
            return;
        }
        items.stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));
    }

    /**
     * Clear all items in cart.
     */
    public void clear() {
        items.clear();
    }

    /**
     * Polymorphic total amount calculation summing all items.
     */
    public BigDecimal calculateTotal() {
        return items.stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);
    }

    public int getTotalItemCount() {
        return items.stream().mapToInt(CartItem::getQuantity).sum();
    }

    /**
     * UN SDG 2.3: In FarmDirect, 90% of checkout value goes directly to the farmer.
     */
    public BigDecimal calculateFarmerShare() {
        return calculateTotal().multiply(new BigDecimal("0.90")).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Estimated consumer savings vs traditional broker markups (~35% markup).
     */
    public BigDecimal calculateConsumerSavings() {
        return calculateTotal().multiply(new BigDecimal("0.35")).setScale(2, RoundingMode.HALF_UP);
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }
}
