package com.example.order.service;

import com.example.order.dto.CheckoutRequest;
import com.example.order.dto.OrderResponse;
import com.example.order.exception.InsufficientStockException;
import com.example.order.exception.PaymentProcessingException;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.model.entity.*;
import com.example.order.repository.*;
import com.example.order.strategy.PaymentResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final ProductRepository productRepository;
    private final PaymentService paymentService;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository,
                            UserRepository userRepository,
                            FarmerRepository farmerRepository,
                            ProductRepository productRepository,
                            PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
        this.paymentService = paymentService;
    }

    private String generateOrderNumber() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        int randomSuffix = ThreadLocalRandom.current().nextInt(1000, 9999);
        return "FD-" + timestamp + "-" + randomSuffix;
    }

    @Override
    public OrderResponse checkoutCart(CheckoutRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        Cart cart = cartRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for User ID: " + request.getUserId()));

        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot checkout an empty cart. Please add farm produce first.");
        }

        // Validate stock for all items before initiating order
        for (CartItem item : cart.getItems()) {
            Product currentProduct = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + item.getProduct().getId()));
            if (currentProduct.getStockQuantity() < item.getQuantity()) {
                throw new InsufficientStockException("Insufficient stock for produce '" + currentProduct.getName() +
                        "'. Available: " + currentProduct.getStockQuantity() + ", In Cart: " + item.getQuantity());
            }
        }

        // Create new Order entity
        String orderNumber = generateOrderNumber();
        String deliveryAddress = (request.getDeliveryAddress() != null && !request.getDeliveryAddress().isBlank())
                ? request.getDeliveryAddress()
                : user.getAddress();

        Order order = new Order(orderNumber, user, deliveryAddress, request.getPayment().getPaymentMethod());

        // Transfer items from cart to order, update inventory, and recalculate financials
        for (CartItem item : cart.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId()).get();
            // Encapsulated stock reduction
            product.reduceStock(item.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem(order, product, item.getQuantity(), item.getUnitPrice());
            order.addItem(orderItem);
        }

        // Save order prior to payment execution
        order = orderRepository.save(order);

        // Polymorphic payment execution via Strategy Pattern
        PaymentResult paymentResult = paymentService.processOrderPayment(order, request.getPayment());
        if (!paymentResult.isSuccessful()) {
            order.markPaymentFailed();
            orderRepository.save(order);
            throw new PaymentProcessingException("Payment failed: " + paymentResult.getMessage());
        }

        // Payment successful - update order and credit farmer direct revenue (SDG 2.3)
        order.markPaymentSuccess();

        for (OrderItem item : order.getItems()) {
            Farmer farmer = farmerRepository.findById(item.getFarmerId()).orElse(null);
            if (farmer != null) {
                farmer.creditEarnings(item.getFarmerEarning());
                farmerRepository.save(farmer);
            }
        }

        // Clear user's cart after successful order placement
        cart.clear();
        cartRepository.save(cart);

        Order savedOrder = orderRepository.save(order);
        return OrderResponse.fromEntity(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderByOrderNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with number: " + orderNumber));
        return OrderResponse.fromEntity(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return OrderResponse.fromEntity(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderResponse::fromEntity)
                .toList();
    }
}
