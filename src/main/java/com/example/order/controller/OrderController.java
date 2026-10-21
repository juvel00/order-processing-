package com.example.order.controller;

import com.example.order.dto.CheckoutRequest;
import com.example.order.dto.OrderResponse;
import com.example.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "3. Orders & Checkout API", description = "Execute cart checkout, process polymorphic payment methods, view invoices, and track purchase histories.")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    @Operation(summary = "Checkout active cart and process payment",
               description = "Converts user cart items into an immutable order, deducts stock, triggers polymorphic payment processing (UPI, Card, or COD), and credits farmer accounts directly.")
    public ResponseEntity<OrderResponse> checkout(@Valid @RequestBody CheckoutRequest request) {
        OrderResponse order = orderService.checkoutCart(request);
        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }

    @GetMapping("/{orderNumber}")
    @Operation(summary = "Get order invoice by Order Number",
               description = "Returns detailed invoice with order status, line items, direct farmer remuneration breakdown, and delivery details.")
    public ResponseEntity<OrderResponse> getOrderByOrderNumber(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderByOrderNumber(orderNumber));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get order history for a consumer",
               description = "Returns all historical orders placed by a specific user.")
    public ResponseEntity<List<OrderResponse>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping
    @Operation(summary = "Get all platform orders (Admin / Co-op view)",
               description = "Returns all orders placed across the FarmDirect network.")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
