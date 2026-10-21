package com.example.order.service;

import com.example.order.dto.AddToCartRequest;
import com.example.order.dto.CartResponse;
import com.example.order.dto.UpdateCartItemRequest;
import com.example.order.exception.InsufficientStockException;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.Cart;
import com.example.order.model.entity.Product;
import com.example.order.model.entity.User;
import com.example.order.repository.CartRepository;
import com.example.order.repository.ProductRepository;
import com.example.order.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartRepository cartRepository, ProductRepository productRepository, UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
            Cart newCart = new Cart(user);
            return cartRepository.save(newCart);
        });
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponse getCartByUserId(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return CartResponse.fromEntity(cart);
    }

    @Override
    public CartResponse addItemToCart(AddToCartRequest request) {
        Cart cart = getOrCreateCart(request.getUserId());
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Produce item not found with ID: " + request.getProductId()));

        if (product.getStockQuantity() < request.getQuantity()) {
            throw new InsufficientStockException("Cannot add " + request.getQuantity() + " units to cart. Available inventory: " + product.getStockQuantity());
        }

        cart.addProduct(product, request.getQuantity());
        Cart saved = cartRepository.save(cart);
        return CartResponse.fromEntity(saved);
    }

    @Override
    public CartResponse updateCartItemQuantity(Long userId, Long productId, UpdateCartItemRequest request) {
        Cart cart = getOrCreateCart(userId);
        if (request.getQuantity() > 0) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Produce item not found with ID: " + productId));
            if (product.getStockQuantity() < request.getQuantity()) {
                throw new InsufficientStockException("Insufficient stock for produce '" + product.getName() + "'. Available: " + product.getStockQuantity());
            }
        }
        cart.updateQuantity(productId, request.getQuantity());
        Cart saved = cartRepository.save(cart);
        return CartResponse.fromEntity(saved);
    }

    @Override
    public CartResponse removeItemFromCart(Long userId, Long productId) {
        Cart cart = getOrCreateCart(userId);
        cart.removeProduct(productId);
        Cart saved = cartRepository.save(cart);
        return CartResponse.fromEntity(saved);
    }

    @Override
    public CartResponse clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.clear();
        Cart saved = cartRepository.save(cart);
        return CartResponse.fromEntity(saved);
    }
}
