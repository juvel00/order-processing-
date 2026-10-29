# Academic Project Report: Order Processing System
## Enterprise Order Processing & Direct Remuneration System

---

**Course Title:** Object-Oriented Programming (OOP) in Java  
**Domain:** Enterprise E-Commerce / Order Processing & Supply Chain Systems  
**Target UN SDGs:** SDG 2 (Zero Hunger) & SDG 12 (Responsible Consumption and Production)  
**Implementation Stack:** Java 21, Spring Boot 3.4.2, Spring Data JPA, H2 In-Memory DB, React 18, Vite, Tailwind CSS, SpringDoc OpenAPI (Swagger UI)  

---

## Table of Contents
1. [a) Abstract](#a-abstract)
2. [b) Introduction](#b-introduction)
   - [1. Purpose of the System](#1-purpose-of-the-system)
   - [2. Relevance and Scope of the System](#2-relevance-and-scope-of-the-system)
3. [c) Problem Definition](#c-problem-definition)
   - [1. Problem Statement](#1-problem-statement)
   - [2. Objectives](#2-objectives)
4. [d) Requirement Analysis](#d-requirement-analysis)
   - [1. Functional Requirements](#1-functional-requirements)
   - [2. Non-Functional Requirements](#2-non-functional-requirements)
   - [3. Hardware and Software Specifications](#3-hardware-and-software-specifications)
5. [e) System Design](#e-system-design)
   - [1. Tiered Architectural Design](#1-tiered-architectural-design)
   - [2. Object-Oriented Class Hierarchy (Mermaid Diagram)](#2-object-oriented-class-hierarchy)
   - [3. Polymorphic Payment Strategy Pattern (Mermaid Diagram)](#3-polymorphic-payment-strategy-pattern)
   - [4. Transactional Checkout Sequence (Mermaid Diagram)](#4-transactional-checkout-sequence)
   - [5. Database Schema & Persistence Model](#5-database-schema--persistence-model)
6. [f) Code Snippets (OOP Pillars Demonstration)](#f-code-snippets)
   - [1. Encapsulation & Domain Invariants](#1-encapsulation--domain-invariants)
   - [2. Multi-Tier Inheritance](#2-multi-tier-inheritance)
   - [3. Polymorphism & Dynamic Freshness Discounting](#3-polymorphism--dynamic-freshness-discounting)
   - [4. Strategy Design Pattern for Payments](#4-strategy-design-pattern-for-payments)
   - [5. Abstraction & Transaction Service Orchestration](#5-abstraction--transaction-service-orchestration)
7. [g) Output Screenshots (Real Captured Outputs)](#g-output-screenshots)
   - [1. Home Dashboard & Live Impact Counters](#1-home-dashboard--live-impact-counters)
   - [2. Product Catalog with Dynamic Freshness Discounts](#2-product-catalog-with-dynamic-freshness-discounts)
   - [3. Shopping Cart & Producer Direct Remuneration Breakdown](#3-shopping-cart--producer-direct-remuneration-breakdown)
   - [4. Polymorphic Checkout Strategy Modal](#4-polymorphic-checkout-strategy-modal)
   - [5. Order History & Invoice Management](#5-order-history--invoice-management)
   - [6. Interactive Swagger UI OpenAPI Documentation](#6-interactive-swagger-ui-openapi-documentation)
   - [7. Embedded H2 Database Console](#7-embedded-h2-database-console)
8. [h) Conclusion](#h-conclusion)
   - [1. Key Project Accomplishments](#1-key-project-accomplishments)
   - [2. Critical Learnings](#2-critical-learnings)
   - [3. Future Enhancements & Roadmap](#3-future-enhancements--roadmap)

---

## a) Abstract

Modern retail distribution and order fulfillment networks are plagued by lengthy intermediation chains, where brokers, wholesalers, and retail aggregators extract between 40% to 70% of end-consumer expenditures. Simultaneously, rigid ordering and distribution pipelines cause post-harvest and perishable commodity losses exceeding 30% prior to retail consumption. The **Order Processing System** is an enterprise-grade, direct producer-to-consumer order management platform engineered in Java 21 and Spring Boot 3.4.2 to dismantle these structural inefficiencies.

The system implements two socio-economic and algorithmic innovations aligned with the United Nations Sustainable Development Goals:
1. **Guaranteed 90% Direct Producer Remuneration (UN SDG 2 - Zero Hunger - Target 2.3):** Eliminating predatory intermediary brokerage fees by programmatically guaranteeing that 90% of order line-item gross value is credited directly to verified producer accounts upon checkout.
2. **Dynamic Freshness-Saver Clearance Algorithm (UN SDG 12 - Responsible Consumption & Production - Target 12.3):** An automated algorithmic pricing model that detects when perishable items enter the terminal 35% of their shelf life and applies a polymorphic 25% discount to accelerate inventory turnover and prevent food waste.

From a software engineering perspective, the system serves as a reference implementation for Object-Oriented Programming (OOP) principles. It leverages strict **Encapsulation** across business invariants, multi-level **Inheritance** across user and product hierarchies, runtime **Polymorphism** via the **Strategy Design Pattern** for pluggable multi-channel payment processing (UPI, Card, Cash-on-Delivery) and dynamic pricing, and clean service-layer **Abstraction** isolating Spring Data JPA persistence. The Order Processing System provides a unified, zero-configuration fullstack architecture featuring an embedded H2 database, interactive React 18 frontend, and comprehensive OpenAPI 3 (Swagger UI) documentation.

---

## b) Introduction

### 1. Purpose of the System
The primary mission of the **Order Processing System** is to replace predatory multi-tier supply chains with an equitable, transparent, and algorithmic digital order processing engine. Traditional order pipelines force smallholder producers into price-taking positions where commission agents dictate below-cost liquidation, while consumers pay inflated retail markups for degraded products.

The system achieves four overarching purposes:
- **Direct Financial Empowerment:** Provides producers with a direct order fulfillment engine where they configure produce listings, determine unit prices, and receive direct digital remittances without intermediary deductions.
- **Supply Chain Traceability:** Empowers end consumers to inspect origin farms, harvest dates, cold-chain handling requirements, and organic certifications for every line item.
- **Algorithmic Waste Mitigation:** Employs programmatic inventory clearance pricing to intercept fresh goods before expiration, aligning commercial order processing with environmental sustainability.
- **Academic Rigor & OOP Demonstration:** Bridges academic computer science principles with real-world enterprise engineering by applying Object-Oriented Design Patterns, domain-driven persistence, and RESTful micro-architectures.

### 2. Relevance and Scope of the System

#### United Nations Sustainable Development Goals (SDG) Alignment
The Order Processing System operationalizes two UN global sustainability goals:

| UN Sustainable Development Goal | Specific Target | System Implementation in Order Processing System |
| :--- | :--- | :--- |
| **SDG 2: Zero Hunger** | **Target 2.3:** Double agricultural productivity and incomes of small-scale food producers through secure and equal access to markets. | **Direct Producer Remuneration Engine:** Every order transaction enforces a 90% gross payout directly credited to the producer's ledger balance (`OrderItem.farmerEarning`), bypassing broker commissions. |
| **SDG 12: Responsible Consumption and Production** | **Target 12.3:** Halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains. | **Dynamic Freshness-Saver Clearance Engine:** Products nearing their terminal shelf life ($\le 35\%$ remaining duration) automatically trigger a 25% discount (`calculateEffectivePrice()`) to encourage prompt purchase and consumption. |

#### System Scope
- **Producer Profile Management:** Registration of producer details, organic certifications, direct UPI/bank handles, crop harvest batches, and cumulative earnings ledgers.
- **Polymorphic Product Catalog Engine:** Manages perishable harvest items (shelf-life timers, cold storage requirements) alongside shelf-stable processed goods.
- **Consumer Order Engine:** Dynamic catalog discovery, category filtering, keyword search, inventory alerts, and freshness discount highlights.
- **Transactional Cart & Checkout Subsystem:** Stateful basket management, atomic stock validation to eliminate race conditions, and polymorphic checkout supporting UPI, Credit/Debit cards, and Cash-on-Delivery.
- **Impact Analytics & Audit Dashboard:** Real-time computation of cumulative producer earnings, intermediary brokerage fees bypassed, and kilograms of goods saved from disposal.

---

## c) Problem Definition

### 1. Problem Statement
In traditional order distribution networks, the journey from origin to consumer is burdened by severe structural flaws:
- **Broker Margin Extraction:** Conventional ordering channels involve 4 to 6 intermediary layers (local brokers, commission agents, regional wholesalers, distribution hubs, and retailers). Primary producers receive merely 15% to 30% of the customer's purchase total.
- **Severe Inventory Spoilage:** Delayed transit, lack of dynamic pricing signals, and bureaucratic warehousing lead to over 35% of fresh agricultural produce rotting before reaching retail points.
- **Information Asymmetry:** Consumers lack transparency regarding item harvest dates, handling histories, and the true compensation paid to producers.
- **Delayed Settlement Cycles:** Producers routinely face 30 to 90-day settlement windows for wholesale consignments, leading to crippling seasonal debt.

### 2. Objectives

#### Technical & Engineering Objectives
1. **Strict OOP Encapsulation:** Guard domain entities (`Product`, `Cart`, `Order`, `Payment`) against illegal state modifications through defensive mutators, bean validation (`@NotNull`, `@Min`, `@DecimalMin`), and synchronized concurrency control on inventory levels.
2. **Comprehensive Inheritance Hierarchy:** Construct an audited entity tree extending `BaseEntity`, branching into specialized `User` subtypes (`Farmer`, `Consumer`) and `Product` subtypes (`PerishableProduce`, `ProcessedProduce`).
3. **Runtime Polymorphic Dispatch:** Implement the **Strategy Design Pattern** for payment processing (`PaymentStrategy`), dynamically resolved at runtime via `PaymentStrategyFactory`, and implement polymorphic price computation (`calculateEffectivePrice()`).
4. **Layered Service Abstraction:** Decouple HTTP presentation controllers from Spring Data JPA persistence logic through well-defined service interfaces (`ProductService`, `CartService`, `OrderService`, `PaymentService`, `SdgImpactService`).

#### Societal & Platform Objectives
- Implement an automated payout mechanism guaranteeing an immutable 90% direct revenue disbursement to producers.
- Introduce an automated, dynamic freshness pricing policy reducing food waste at the consumer-facing interface.
- Deliver a zero-setup, fully reproducible enterprise application utilizing an in-memory embedded H2 database.

---

## d) Requirement Analysis

### 1. Functional Requirements (FR)
- **FR-01 (Product Catalog Management):** Maintain produce listings categorized by `VEGETABLES`, `FRUITS`, `GRAINS`, `DAIRY`, `HONEY`, `SPICES`, and `OILS`.
- **FR-02 (Dynamic Freshness Pricing):** Calculate remaining shelf life for perishable items and automatically apply a 25% discount if remaining shelf life is $\le 35\%$ of total shelf life.
- **FR-03 (Cart Operations):** Consumers can add produce, adjust quantities within inventory bounds, delete items, and inspect real-time producer share breakdowns.
- **FR-04 (Inventory Concurrency Guard):** Atomically validate and decrement produce stock during checkout, throwing `InsufficientStockException` if requested quantities exceed inventory.
- **FR-05 (Polymorphic Payment Processing):** Support payment settlement via UPI (VPA validation), Credit/Debit Card (card length, expiry, CVV verification), and Cash-on-Delivery.
- **FR-06 (Producer Remuneration):** Automatically credit 90% of each item's sale value to the associated producer's total earnings record upon order confirmation.
- **FR-07 (Invoicing & Order History):** Generate itemized digital tax invoices containing order timestamps, payment methods, delivery addresses, and producer details.
- **FR-08 (SDG Impact Aggregation):** Aggregate and display platform-wide metrics: total producer earnings, estimated broker fees bypassed, and kilograms of food waste prevented.

### 2. Non-Functional Requirements (NFR)
- **Data Integrity & Consistency:** Multi-step order checkout operations run within a synchronized `@Transactional` boundary; payment failures or stock exceptions trigger automated rollbacks.
- **Performance & Latency:** In-memory H2 database operations maintain sub-50ms query response times under standard single-node concurrency.
- **Security & Validation:** Enforce strict DTO and entity validation using Jakarta Bean Validation. Sensitive financial attributes (card numbers) are masked before persistence (`****-****-****-1234`).
- **Extensibility:** The architecture allows plugging new payment strategies without altering core checkout logic (Open-Closed Principle).
- **Zero Configuration Overhead:** Runs with a single command via embedded H2 database and bundled React assets.

### 3. Hardware and Software Specifications
- **Java Runtime:** OpenJDK 21 or Oracle JDK 21
- **Backend Framework:** Spring Boot 3.4.2 (Spring Web, Spring Data JPA, Jakarta Validation)
- **Database:** Embedded H2 In-Memory Database (`jdbc:h2:mem:farmdirectdb`)
- **Frontend Stack:** React 18.3, Vite 5.4, Tailwind CSS 3.4, Lucide React Icons
- **Documentation:** SpringDoc OpenAPI 2.7.0 (Swagger UI)
- **Minimum Hardware:** Dual-Core 2.0 GHz CPU, 4 GB RAM, 500 MB disk space

---

## e) System Design

### 1. Tiered Architectural Design

```
┌──────────────────────────────────────────────────────────────┐
│                  PRESENTATION TIER (UI)                      │
│     React 18 Single Page Application (SPA) • Tailwind CSS    │
│  (Home Hero • Products Catalog • Cart Drawer • Checkout)     │
└──────────────────────────────┬───────────────────────────────┘
                               │ REST APIs (JSON / HTTP)
┌──────────────────────────────▼───────────────────────────────┐
│                 CONTROLLER TIER (REST API)                   │
│  ProductController • CartController • OrderController        │
│        SdgImpactController • GlobalExceptionHandler          │
└──────────────────────────────┬───────────────────────────────┘
                               │ Service Abstraction Interfaces
┌──────────────────────────────▼───────────────────────────────┐
│                BUSINESS LOGIC TIER (SERVICES)                │
│    ProductService • CartService • OrderService               │
│    PaymentService • PaymentStrategyFactory (Strategy)        │
└──────────────────────────────┬───────────────────────────────┘
                               │ Spring Data JPA ORM
┌──────────────────────────────▼───────────────────────────────┐
│              PERSISTENCE & DOMAIN TIER (JPA)                 │
│  Entities: BaseEntity, Product, PerishableProduce,           │
│            ProcessedProduce, User, Farmer, Consumer, Order   │
└──────────────────────────────┬───────────────────────────────┘
                               │ Embedded In-Memory JDBC
┌──────────────────────────────▼───────────────────────────────┐
│                    DATA TIER (H2 DATABASE)                   │
│        Embedded In-Memory Relational Engine                  │
└──────────────────────────────────────────────────────────────┘
```

### 2. Object-Oriented Class Hierarchy

```mermaid
classDiagram
    direction TB
    class BaseEntity {
        <<abstract>>
        -Long id
        -LocalDateTime createdAt
        -LocalDateTime updatedAt
        +getId() Long
    }

    class User {
        -String name
        -String email
        -String phone
        -UserRole role
        -String address
    }

    class Farmer {
        -String farmName
        -String farmLocation
        -boolean organicCertified
        -String upiId
        -BigDecimal totalEarnings
        +creditEarnings(BigDecimal amount)
    }

    class Consumer {
        -String defaultDeliveryAddress
        -int loyaltyPoints
    }

    class Product {
        <<abstract>>
        -String name
        -BigDecimal basePrice
        -int stockQuantity
        -Farmer farmer
        +calculateEffectivePrice()* BigDecimal
        +reduceStock(int quantity)
        +restock(int quantity)
    }

    class PerishableProduce {
        -LocalDate harvestDate
        -int shelfLifeDays
        -boolean coldStorageRequired
        +calculateEffectivePrice() BigDecimal
        +isClearanceDiscountApplied() boolean
        +getRemainingShelfLifeDays() long
    }

    class ProcessedProduce {
        -String processingMethod
        -LocalDate packagingDate
        -int shelfLifeMonths
        +calculateEffectivePrice() BigDecimal
    }

    BaseEntity <|-- User
    BaseEntity <|-- Product
    User <|-- Farmer
    User <|-- Consumer
    Product <|-- PerishableProduce
    Product <|-- ProcessedProduce
```

### 3. Polymorphic Payment Strategy Pattern

```mermaid
classDiagram
    class PaymentStrategy {
        <<interface>>
        +processPayment(Order, PaymentRequest) PaymentResult
        +getSupportedMethod() PaymentMethod
    }
    class UpiPaymentStrategy {
        +processPayment(Order, PaymentRequest) PaymentResult
    }
    class CardPaymentStrategy {
        +processPayment(Order, PaymentRequest) PaymentResult
    }
    class CashOnDeliveryPaymentStrategy {
        +processPayment(Order, PaymentRequest) PaymentResult
    }
    class PaymentStrategyFactory {
        -Map~PaymentMethod, PaymentStrategy~ strategyMap
        +getStrategy(PaymentMethod) PaymentStrategy
    }

    PaymentStrategy <|.. UpiPaymentStrategy
    PaymentStrategy <|.. CardPaymentStrategy
    PaymentStrategy <|.. CashOnDeliveryPaymentStrategy
    PaymentStrategyFactory o-- PaymentStrategy : dynamically resolves
```

---

## f) Code Snippets (OOP Pillars Demonstration)

### 1. Encapsulation & Domain Invariants ([`Product.java`](file:///c:/Users/HP/Desktop/code/uni/src/main/java/com/example/order/model/entity/Product.java#L47-L69))
```java
// Encapsulation of inventory mutation with defensive bounds checking
@Min(value = 0, message = "Stock quantity cannot be negative")
@Column(nullable = false)
private int stockQuantity;

public synchronized void reduceStock(int quantity) {
    if (quantity <= 0) {
        throw new IllegalArgumentException("Quantity to reduce must be strictly positive.");
    }
    if (this.stockQuantity < quantity) {
        throw new InsufficientStockException(
            "Insufficient inventory for produce '" + this.name + 
            "'. Available: " + this.stockQuantity + ", Requested: " + quantity
        );
    }
    this.stockQuantity -= quantity;
}
```

### 2. Multi-Tier Inheritance ([`BaseEntity.java`](file:///c:/Users/HP/Desktop/code/uni/src/main/java/com/example/order/model/entity/BaseEntity.java#L14-L44))
```java
@MappedSuperclass
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
```

### 3. Dynamic Freshness Pricing Polymorphism ([`PerishableProduce.java`](file:///c:/Users/HP/Desktop/code/uni/src/main/java/com/example/order/model/entity/PerishableProduce.java#L40-L75))
```java
@Entity
@DiscriminatorValue("PERISHABLE")
public class PerishableProduce extends Product {
    private LocalDate harvestDate;
    private int shelfLifeDays;

    public long getRemainingShelfLifeDays() {
        long daysSinceHarvest = ChronoUnit.DAYS.between(harvestDate, LocalDate.now());
        return Math.max(0, shelfLifeDays - daysSinceHarvest);
    }

    @Override
    public boolean isClearanceDiscountApplied() {
        long remaining = getRemainingShelfLifeDays();
        // UN SDG 12.3: Clearance discount triggered when 35% or less shelf life remains
        return remaining > 0 && remaining <= Math.ceil(shelfLifeDays * 0.35);
    }

    @Override
    public BigDecimal calculateEffectivePrice() {
        if (isClearanceDiscountApplied()) {
            return getBasePrice().multiply(new BigDecimal("0.75"))
                                 .setScale(2, RoundingMode.HALF_UP);
        }
        return getBasePrice().setScale(2, RoundingMode.HALF_UP);
    }
}
```

### 4. Payment Strategy Factory ([`PaymentStrategyFactory.java`](file:///c:/Users/HP/Desktop/code/uni/src/main/java/com/example/order/strategy/PaymentStrategyFactory.java#L15-L42))
```java
@Component
public class PaymentStrategyFactory {
    private final Map<PaymentMethod, PaymentStrategy> strategyMap = 
        new EnumMap<>(PaymentMethod.class);

    public PaymentStrategyFactory(List<PaymentStrategy> strategies) {
        for (PaymentStrategy strategy : strategies) {
            strategyMap.put(strategy.getSupportedMethod(), strategy);
        }
        strategyMap.put(PaymentMethod.DEBIT_CARD, strategyMap.get(PaymentMethod.CREDIT_CARD));
    }

    public PaymentStrategy getStrategy(PaymentMethod method) {
        PaymentStrategy strategy = strategyMap.get(method);
        if (strategy == null) {
            throw new PaymentProcessingException("Unsupported payment method: " + method);
        }
        return strategy;
    }
}
```

### 5. Service Abstraction & Checkout Transaction ([`OrderServiceImpl.java`](file:///c:/Users/HP/Desktop/code/uni/src/main/java/com/example/order/service/OrderServiceImpl.java#L52-L98))
```java
@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Override
    public OrderResponse checkoutCart(CheckoutRequest request) {
        Cart cart = cartRepository.findByUserId(request.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));

        Order order = new Order(generateOrderNumber(), cart.getUser(),
                                request.getDeliveryAddress(), request.getPayment().getPaymentMethod());

        // 1. Atomic Inventory Deduction & Order Snapshot
        for (CartItem item : cart.getItems()) {
            Product product = item.getProduct();
            product.reduceStock(item.getQuantity());
            productRepository.save(product);
            order.addItem(new OrderItem(order, product, item.getQuantity(), item.getUnitPrice()));
        }

        // 2. Polymorphic Strategy-Based Payment Execution
        paymentService.processOrderPayment(order, request.getPayment());

        // 3. UN SDG 2.3: Direct Producer Remuneration (90% Gross Payout)
        for (OrderItem item : order.getItems()) {
            farmerRepository.findById(item.getFarmerId()).ifPresent(farmer -> {
                farmer.creditEarnings(item.getFarmerEarning());
                farmerRepository.save(farmer);
            });
        }

        cart.clear();
        return OrderResponse.fromEntity(orderRepository.save(order));
    }
}
```

---

## g) Output Screenshots

Below are the actual output screenshots captured directly from the running fullstack application.

### 1. Home Dashboard & Live Impact Counters
The main dashboard displays real-time SDG metrics including cumulative producer payouts, bypassed intermediary brokerage fees, and kilograms of food waste prevented:

![1. Home Dashboard & Live Impact Counters](screenshots/01_home_dashboard.png)

---

### 2. Product Catalog with Dynamic Freshness Discounts
The product catalog dynamically lists available goods, category pills, organic certification badges, and highlights active 25% Freshness-Saver clearance discounts on perishable items:

![2. Product Catalog with Dynamic Freshness Discounts](screenshots/02_products_catalog.png)

---

### 3. Shopping Cart & Producer Direct Remuneration Breakdown
The shopping cart manages line items, applies dynamic item totals, and transparently details the 90% direct payout reserved for producers:

![3. Shopping Cart & Producer Direct Remuneration Breakdown](screenshots/03_shopping_cart.png)

---

### 4. Polymorphic Checkout Strategy Modal
The checkout interface allows consumers to input delivery details and select among polymorphic payment strategies (UPI, Credit/Debit Card, Cash on Delivery):

![4. Polymorphic Checkout Strategy Modal](screenshots/04_checkout_modal.png)

---

### 5. Order History & Invoice Management
The historical orders view renders digital itemized invoices with complete timestamps, payment status, and producer compensation breakdown:

![5. Order History & Invoice Management](screenshots/05_orders_history.png)

---

### 6. Interactive Swagger UI OpenAPI Documentation
Interactive REST API contract documentation at `/swagger-ui.html` providing comprehensive endpoint testing and schema definitions:

![6. Interactive Swagger UI OpenAPI Documentation](screenshots/06_swagger_api_docs.png)

---

### 7. Embedded H2 Database Console
The embedded database management console at `/h2-console` providing relational schema inspection and direct SQL querying:

![7. Embedded H2 Database Console](screenshots/07_h2_database_console.png)

---

## h) Conclusion

### 1. Key Project Accomplishments
- **Full Socio-Technical Alignment:** Engineered an operational fullstack solution addressing critical supply-chain issues while fulfilling **UN SDGs 2 & 12**.
- **Complete OOP Adherence:** Implemented strict encapsulation with defensive bounds checking, multi-level entity inheritance, runtime polymorphism via the Strategy Pattern, and service-layer abstraction.
- **Real-Time Verification:** Captured actual output screenshots from the running Spring Boot and React application, demonstrating end-to-end functionality across catalog browsing, dynamic clearance pricing, cart management, and polymorphic checkout.
- **Zero-Setup Portability:** Bundled into an embedded Spring Boot and H2 architecture executable with a single `mvn spring-boot:run` command.

### 2. Critical Learnings
- Applying design patterns (Strategy, Factory, Repository) early in architecture minimizes technical debt and makes the application easily extensible without code modification (Open-Closed Principle).
- Declarative transaction boundaries (`@Transactional`) combined with synchronized domain mutators are essential for maintaining inventory and financial integrity in e-commerce environments.
- Bridging computer science assignments with real-world UN Sustainable Development Goals demonstrates how software engineering directly solves pressing human and environmental problems.

### 3. Future Enhancements & Roadmap
1. **IoT Cold-Chain Telemetry Integration:** Incorporate IoT temperature and humidity sensors in transit crates, streaming live telemetry to update produce shelf life dynamically.
2. **Cooperative Electric Vehicle Routing:** Implement heuristic vehicle routing algorithms for electric delivery clusters, further minimizing logistics overhead and carbon footprints.
3. **Blockchain Harvest Ledger:** Cryptographic batch tracking proving crop origin and organic certifications.
4. **Vernacular Voice Ordering:** Multi-dialect voice commerce enabling unassisted access for smallholder producers.

---
*Report compiled for the Object-Oriented Programming in Java Course Evaluation.*
