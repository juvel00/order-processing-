# FarmDirect — Direct Producer-to-Consumer Online Shopping System

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/H2-In--Memory-blue.svg)](http://localhost:8080/h2-console)
[![Swagger](https://img.shields.io/badge/OpenAPI-Swagger%20UI-green.svg)](http://localhost:8080/swagger-ui.html)
[![UN SDG](https://img.shields.io/badge/UN%20SDG-2%20%26%2012-yellow.svg)](https://sdgs.un.org/goals)

## 1. Academic & Course Context
* **Course:** Object-Oriented Programming (OOP) in Java
* **Base Topic:** Online Shopping System
* **Project Name:** **FarmDirect**
* **Target Challenge:** Small agricultural producers lose 40%–70% of harvest value to intermediate brokers, causing depressed rural livelihoods, inflated retail prices, and massive post-harvest food waste due to prolonged storage.

---

## 2. United Nations Sustainable Development Goals (SDG) Alignment

| UN SDG | Target | System Implementation in FarmDirect |
| :--- | :--- | :--- |
| **SDG 2: Zero Hunger** | **Target 2.3:** Double agricultural productivity and incomes of small-scale food producers through secure and equal access to markets. | Direct Producer Remuneration: Platform guarantees **90% direct payout** to farmers per produce sold (`OrderItem.farmerEarning`). Intermediary commissions are eliminated and tracked transparently. |
| **SDG 12: Responsible Consumption and Production** | **Target 12.3:** Halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains. | **Dynamic Freshness-Saver Clearance Algorithm:** When perishable produce enters the final 35% of its shelf life (`PerishableProduce.isClearanceDiscountApplied()`), an automatic **25% clearance discount** is applied polymorphically, driving prompt consumption before spoilage. |

---

## 3. Object-Oriented Programming (OOP) Pillars Implementation

### 🛡️ Encapsulation
* Domain models (`User`, `Farmer`, `Consumer`, `Product`, `Cart`, `CartItem`, `Order`, `OrderItem`, `Payment`) have **strictly private fields** accessed through validated accessors and business methods.
* Stock protection: `Product.reduceStock(quantity)` protects state against deficit and throws `InsufficientStockException`.
* Financial calculation encapsulation: `Cart.calculateTotal()`, `Order.recalculateTotals()`, and `OrderItem` computation logic.
* Bean Validation: Enforced with `@NotBlank`, `@NotNull`, `@Min(1)`, `@DecimalMin("0.01")`.

### 🧬 Inheritance
* **Mapped Superclass:** `BaseEntity` encapsulates common metadata (`id`, `createdAt`, `updatedAt`, `@PrePersist`, `@PreUpdate`) inherited across all domain entities.
* **User Hierarchy:** `User` (JPA `JOINED` inheritance) extended by `Farmer` (farm location, organic certification, direct UPI address, cumulative earnings) and `Consumer` (delivery address, loyalty points).
* **Product Hierarchy:** Abstract `Product` (JPA `SINGLE_TABLE` inheritance) extended by `PerishableProduce` (harvest date, shelf life in days, cold storage flag, freshness grade) and `ProcessedProduce` (packaging date, shelf life in months, processing method, artisanal certifications).

### 🔀 Polymorphism
* **Strategy Pattern for Payments:** `PaymentStrategy` interface implemented dynamically by:
  1. `UpiPaymentStrategy`: Validates UPI VPA syntax (`user@bank`) and simulates direct instant bank transfer.
  2. `CardPaymentStrategy`: Validates 13-19 digit card numbers, CVV, expiration date, and masks digits (`****-****-****-1234`).
  3. `CashOnDeliveryPaymentStrategy`: Validates COD terms with zero electronic transaction fee.
  * Resolved polymorphically at runtime via `PaymentStrategyFactory`.
* **Polymorphic Pricing Method:** Abstract `Product.calculateEffectivePrice()` implemented polymorphically:
  * `PerishableProduce` applies dynamic 25% discount when nearing expiration to cut food waste.
  * `ProcessedProduce` enforces standard artisanal unit rates.

### 🧩 Abstraction
* Clear separation of concerns between Controller, Service, and Repository layers:
  * Service Interfaces: `ProductService`, `CartService`, `OrderService`, `PaymentService`, `SdgImpactService`.
  * Concrete Implementations: `ProductServiceImpl`, `CartServiceImpl`, etc., completely shielding controllers from JPA persistence logic.
  * Spring Data JPA Repositories: `ProductRepository`, `CartRepository`, `OrderRepository`, etc.

---

## 4. Modern React Frontend (`frontend/`)

The frontend is built using **React 18 + Vite + Tailwind CSS + Lucide Icons**:
* **`frontend/src/components/Home.jsx`:** Hero banner with SDG metrics strip, UN SDG 2 & 12 value propositions, and Java OOP architecture breakdown.
* **`frontend/src/components/Products.jsx`:** Category filter pills, search bar, sort options, and **Freshness-Saver Deals (SDG 12.3)** toggle.
* **`frontend/src/components/ProductCard.jsx`:** Shelf-life indicators, dynamic price with waste discount strikethrough, organic certification badge, and quantity controls.
* **`frontend/src/components/Cart.jsx`:** Basket line items with quantity adjusters, subtotal, 90% direct farmer share breakdown, and estimated consumer savings vs brokers.
* **`frontend/src/components/CheckoutModal.jsx`:** Polymorphic payment selector (UPI, Card, COD) simulating the backend Strategy Pattern with instant authorization.
* **`frontend/src/components/Orders.jsx` & `OrderDetailModal.jsx`:** Historical orders and printable itemized farm tax invoice.
* **`frontend/src/components/ImpactDashboard.jsx`:** Real-time UN SDG impact analytics dashboard.
* **`frontend/src/components/AddProduceModal.jsx`:** Interactive modal for farmers to list new perishable or processed produce directly to consumers.

---

## 5. How to Run

### Option A: Unified Spring Boot Server (Single URL)
The React app has already been pre-built into Spring Boot's static resources. Just start Spring Boot:
```powershell
mvn spring-boot:run
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser!

### Option B: React Vite Dev Server (Hot Module Reloading)
1. In Terminal 1, run the Spring Boot backend:
   ```powershell
   mvn spring-boot:run
   ```
2. In Terminal 2, run the React Vite development server:
   ```cmd
   cd frontend
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)**. All `/api/*` calls are automatically proxied to Spring Boot on port 8080.

3. To rebuild the production React bundle into Spring Boot:
   ```cmd
   cd frontend
   npm run build
   ```

---

## 6. Interactive Developer Endpoints
* **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
* **H2 Database Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  * JDBC URL: `jdbc:h2:mem:farmdirectdb`
  * Username: `sa`
  * Password: *(empty)*
* **OpenAPI JSON Schema:** [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 7. Running Backend Tests
```powershell
mvn test
```
All **11 tests** pass with 0 failures, validating encapsulation boundaries, dynamic pricing discounts, polymorphic payment dispatching, and end-to-end REST checkout workflows.
