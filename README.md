# CineReserve — Enterprise Cinema Theater Seat Booking System

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/H2-In--Memory-blue.svg)](http://localhost:8080/h2-console)
[![Swagger](https://img.shields.io/badge/OpenAPI-Swagger%20UI-green.svg)](http://localhost:8080/swagger-ui.html)

## 1. Academic & Course Context
* **Course:** Object-Oriented Programming (OOP) in Java
* **Base Topic:** Theater / Cinema Seat Booking System
* **Project Name:** **CineReserve**
* **Target Challenge:** Cinema theaters require a real-time reservation platform preventing double-booking race conditions across multiple screening halls, managing tiered seat amenities (Standard, Premium, VIP Motorized Recliners), computing dynamic show pricing (prime-time surges), and offering multi-channel checkout (Card, UPI, Net Banking) using the Strategy Pattern.

---

## 2. Object-Oriented Programming (OOP) Pillars Implementation

### 🛡️ Encapsulation
* **Domain State Protection:** Domain models (`ShowtimeSeat`, `Booking`, `Payment`, `Seat`, `Movie`, `User`) have **strictly private fields** accessed through validated accessors and business methods.
* **Double-Booking Guard Invariant:** `ShowtimeSeat.book(booking)` enforces state transition from `AVAILABLE` to `BOOKED` atomically. If the seat is already reserved, it throws `SeatAlreadyBookedException`.
* **Financial Calculations Encapsulation:** `Booking.recalculateTotals()` computes subtotal across booked seats, applies flat convenience fees per ticket, and computes grand totals without exposing internal state to arbitrary alteration.
* **Declarative Bean Validation:** Enforced with `@NotBlank`, `@NotNull`, `@Min(1)`, `@DecimalMin("0.01")`, `@Email`.

### 🧬 Inheritance
* **Mapped Superclass:** `BaseEntity` encapsulates common audit metadata (`id`, `createdAt`, `updatedAt`, `@PrePersist`, `@PreUpdate`) inherited across all domain entities.
* **User Hierarchy (JPA `JOINED` Strategy):**
  * `User` base entity with personal credentials.
  * `Customer` inherits `User`, adding loyalty reward points (`loyaltyPoints`) and tiered perks (`SILVER`, `GOLD`, `PLATINUM`).
  * `TheaterAdmin` inherits `User`, adding employee badge ID and department metadata.
* **Seat Hierarchy (JPA `SINGLE_TABLE` Strategy with Discriminator):**
  * Abstract `Seat` defines core seat attributes (row name, column number, seat tier, screen link).
  * `StandardSeat`: baseline ergonomic seating.
  * `PremiumSeat`: adds +8" extra legroom and center-acoustic placement.
  * `VipReclinerSeat`: adds 150° motorized recliners and complimentary gourmet snack/beverage voucher perks.

### 🔀 Polymorphism
* **Polymorphic Seat Pricing:** Abstract method `Seat.calculateEffectivePrice(BigDecimal baseShowPrice, boolean isPrimeTime)` is implemented polymorphically:
  * `StandardSeat` applies base show price with prime-time evening surge.
  * `PremiumSeat` applies a **1.35x multiplier** for acoustic positioning and extra legroom.
  * `VipReclinerSeat` applies a **1.80x multiplier** and bundles snack voucher charges.
* **Strategy Design Pattern for Payments:** Pluggable payment strategies implemented via the `PaymentStrategy` interface:
  1. `UpiPaymentStrategy`: Validates Virtual Payment Address (VPA `user@bank`) and simulates instant NPCI settlement.
  2. `CardPaymentStrategy`: Validates 15–19 digit PAN, expiration month/year, 3–4 digit CVV, and securely masks digits (`****-****-****-4242`).
  3. `NetBankingPaymentStrategy`: Validates institutional gateway routing (HDFC, SBI, ICICI, Axis).
  * Dynamic resolution at runtime via `PaymentStrategyFactory`.

### 🧩 Abstraction
* **Layered Decoupling:** Complete separation of concerns between Controller, Service, and Repository layers:
  * Service Interfaces: `MovieService`, `ShowtimeService`, `BookingService`, `PaymentService`, `TheaterStatsService`.
  * Concrete Service Implementations: Encapsulate transactional workflows (`@Transactional`), completely shielding REST controllers from Spring Data JPA persistence logic.
  * Spring Data JPA Repositories: `MovieRepository`, `ScreenRepository`, `SeatRepository`, `ShowtimeSeatRepository`, `BookingRepository`, `PaymentRepository`.

---

## 3. Interactive React Frontend (`frontend/`)

Built using **React 18 + Vite + Tailwind CSS + Lucide Icons**:
* **Now Showing Catalog:** Movie cards with poster art, MPAA/CBFC ratings, duration, genre pills, language, and quick-book triggers.
* **Interactive 2D Theater Seat Grid:** Visual auditorium layout displaying:
  * Curved Cinema Screen ("All Eyes Front") with ambient glow.
  * Color-coded seat matrix organized by tiers (Standard, Premium, VIP Recliner).
  * Real-time seat status (Available, Selected, Booked).
  * Interactive live subtotal, convenience fee, and grand total recalculation.
* **Polymorphic Checkout Modal:** Step-by-step payment modal selecting between UPI, Credit/Debit Card, or Net Banking, simulating Strategy Pattern authorization.
* **Digital Admission Ticket Pass:** Perforated boarding-pass ticket modal featuring movie details, auditorium hall, seat numbers, barcode simulation, and a one-click Print/PDF feature.
* **My Bookings Manager:** Inspection of reservation records with live seat cancellation and refund simulation.
* **Theater Stats & OOP Dashboard:** Live box office gross, occupancy percentage, tickets sold, and architectural documentation cards.

---

## 4. How to Run

### Option A: Unified Spring Boot Server (Single URL)
The React application has been pre-compiled into Spring Boot's static resources. Simply start Spring Boot:
```powershell
.\mvnw.cmd spring-boot:run
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser!
* **Swagger UI Documentation:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
* **H2 Database Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:cinereservedb`, User: `sa`, Password: *(empty)*)

### Option B: React Vite Dev Server (Hot Module Reloading)
1. In Terminal 1, run the Spring Boot backend:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
2. In Terminal 2, run the Vite dev server:
   ```cmd
   cd frontend
   npm run dev
   ```
   Open **[http://localhost:5173](http://localhost:5173)**. All `/api/*` calls are automatically proxied to Spring Boot on port 8080.

---

## 5. Automated Test Suite
Run the full test suite verifying OOP principles and end-to-end REST transactions:
```powershell
.\mvnw.cmd test
```
* `CineReserveOopTests`: Validates Encapsulation (double booking guard), Inheritance hierarchies, Polymorphic pricing, and Strategy Pattern factory resolution.
* `CineReserveIntegrationTests`: Validates full Spring Boot MVC workflows (catalog, showtimes, transactional seat booking, analytics).
