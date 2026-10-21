package com.example.order.controller;

import com.example.order.dto.CreateProduceRequest;
import com.example.order.dto.ProductResponse;
import com.example.order.model.enums.ProductCategory;
import com.example.order.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "1. Products API", description = "Browse farm catalog, filter by category, view perishable clearance deals, and list new farm produce.")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "Browse all farm produce", description = "Returns active catalog with live dynamic pricing and freshness indicators.")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get produce details by ID", description = "Returns detailed produce specifications, origin farm, and shelf-life.")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    @Operation(summary = "Filter produce by category", description = "Returns catalog items belonging to a specific agricultural category.")
    public ResponseEntity<List<ProductResponse>> getProductsByCategory(@PathVariable ProductCategory category) {
        return ResponseEntity.ok(productService.getProductsByCategory(category));
    }

    @GetMapping("/clearance")
    @Operation(summary = "View Freshness-Saver Clearance deals (UN SDG 12.3)",
               description = "Returns perishable items nearing their shelf life with an automatic 25% waste-reduction discount.")
    public ResponseEntity<List<ProductResponse>> getPerishableClearanceProducts() {
        return ResponseEntity.ok(productService.getPerishableClearanceProducts());
    }

    @PostMapping
    @Operation(summary = "Add new farm produce (Direct Producer Listing)",
               description = "Allows local farmers to list fresh perishable or artisanal processed produce directly to consumers.")
    public ResponseEntity<ProductResponse> addProduce(@Valid @RequestBody CreateProduceRequest request) {
        ProductResponse created = productService.addProduce(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
