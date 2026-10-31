# CineReserve — Cinema Theater Seat Booking System
## Academic Presentation & Defense Deck (Java OOP & Strategy Pattern)

---

### Slide 1: Title Slide
* **Project Title:** CineReserve — Enterprise Cinema Theater Seat Booking System
* **Sub-title:** An Object-Oriented Java 21 & Spring Boot Application with Interactive React Seat-Matrix
* **Domain:** Theater Automation & Real-Time Reservation Systems
* **Course:** Object-Oriented Programming (OOP) in Java
* **Tech Stack:** Java 21, Spring Boot 3.4.2, React 18, Tailwind CSS, Spring Data JPA, H2 In-Memory DB, SpringDoc OpenAPI (Swagger UI)
* **Presenter / Student:** [Your Name / Roll No / Department]
* **Instructor / Guide:** [Professor / Evaluator Name]

---

### Slide 2: a) Abstract
* **Core Summary:**
  CineReserve is an enterprise cinema seat booking and auditorium management engine engineered to eliminate double-booking race conditions and deliver dynamic comfort-tier seating economics.
* **Key Innovations:**
  1. **Atomic Concurrency Protection:** State encapsulation in `ShowtimeSeat` prevents concurrent double-booking of identical seats during high-demand releases.
  2. **Polymorphic Tier Pricing:** Dynamic pricing algorithm scaling ticket prices based on seat tiers (Standard, Premium +8" legroom, VIP motorized recliners + snack perks) and evening prime-time surges.
* **OOP Engineering:**
  Architected on the four core pillars of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction) and the Gang-of-Four Strategy Design Pattern for multi-channel payments.
* **Outcome:**
  A fully operational, plug-and-play fullstack system with an interactive 2D React seat grid, Spring Boot REST backend, automated H2 database, and Swagger documentation.

---

### Slide 3: b) Introduction — 1. Purpose of the System
* **Primary Mission:** Modernize cinema auditorium ticketing by ensuring data consistency, tiered seating experiences, and decoupled checkout workflows.
* **Key Purposes:**
  * **Double-Booking Elimination:** Guarantee ACID transactional integrity across concurrent seat selection.
  * **Dynamic Seat Economics:** Provide patrons transparent pricing that accounts for acoustic positioning, legroom, and luxury perks.
  * **Multi-Channel Payments:** Support Credit/Debit Card, UPI, and Net Banking using pluggable strategy patterns.
  * **Academic Demonstration:** Provide an exemplar of enterprise OOP architecture applied to real-world ticketing problems.

---

### Slide 4: b) Introduction — 2. Relevance and Scope of the System
* **Scope of the Current System:**
  * **Movie Catalog:** Discovery of now-showing films with ratings, genres, languages, runtimes, and trailer links.
  * **Interactive Seat Grid:** 2D auditorium mapping with curved screen indicator, row-by-row tier visualization, and real-time availability states.
  * **Booking & Checkout Subsystem:** Live calculation of subtotals and convenience fees with polymorphic strategy payment processing.
  * **Admission Pass Generation:** Digital boarding pass with unique reference code, simulated barcode, and printing capability.
  * **Theater Analytics:** Real-time metrics tracking box office revenue, occupancy percentages, and ticket velocity.

---

### Slide 5: c) Problem Definition & Objectives
* **Traditional Bottlenecks:**
  * **Overbooking & Race Conditions:** Multiple patrons attempting to check out the same seat simultaneously.
  * **Rigid Flat Pricing:** Inability to dynamically charge different rates for prime viewing angles and luxury seating.
  * **Tight Coupling:** Payment processing directly tangled with core booking workflows.
* **System Objectives:**
  * Strict domain encapsulation ensuring seats can only transition from `AVAILABLE` to `BOOKED` once.
  * Clean class hierarchies utilizing JPA `SINGLE_TABLE` and `JOINED` inheritance.
  * Runtime polymorphism across pricing formulas and payment gateways.

---

### Slide 6: d) System Design & Architecture
* **Tiered Decoupled Architecture:**
  * **Presentation Tier:** React 18, Vite, Tailwind CSS, Lucide Icons.
  * **REST Controller Tier:** `@RestController` endpoints exposing `/api/movies`, `/api/showtimes`, `/api/bookings`, `/api/stats`.
  * **Service Tier:** Domain logic and transactional isolation (`@Transactional`).
  * **Persistence Tier:** Spring Data JPA Repositories interacting with embedded H2 database.
  * **OpenAPI Documentation:** Interactive Swagger UI for live API testing.

---

### Slide 7: e) OOP Pillar 1 — Encapsulation
* **Domain Model Protection:**
  * All fields in `ShowtimeSeat`, `Booking`, `Payment`, and `Seat` are strictly private with validated accessors.
* **State Transition Guard:**
  ```java
  public void book(Booking booking) {
      if (this.status == SeatStatus.BOOKED) {
          throw new SeatAlreadyBookedException("Seat already booked!");
      }
      this.status = SeatStatus.BOOKED;
      this.booking = booking;
  }
  ```
* **Financial Calculations:** `Booking.recalculateTotals()` computes subtotals and flat convenience fees securely within domain entities.

---

### Slide 8: e) OOP Pillar 2 — Multi-Tier Inheritance
* **Mapped Superclass (`BaseEntity`):** Reusable `id`, `createdAt`, `updatedAt` with JPA lifecycle hooks.
* **Seat Hierarchy (`SINGLE_TABLE`):**
  * `Seat` (Abstract base entity)
    * `StandardSeat`: baseline comfort.
    * `PremiumSeat`: +8" extra legroom and center acoustic placement.
    * `VipReclinerSeat`: 150° motorized recliners and complimentary gourmet refreshment.
* **User Hierarchy (`JOINED`):**
  * `User` base extended by `Customer` (loyalty reward points) and `TheaterAdmin` (staff badges).

---

### Slide 9: e) OOP Pillar 3 — Polymorphism & Strategy Pattern
* **Polymorphic Seat Pricing:**
  * `calculateEffectivePrice(basePrice, isPrimeTime)` overridden in each seat subclass:
    * Standard: Base price + prime surge.
    * Premium: 1.35x multiplier + prime surge.
    * VIP Recliner: 1.80x multiplier + snack voucher fee + prime surge.
* **Strategy Design Pattern for Payments:**
  * `PaymentStrategy` interface implemented by `CardPaymentStrategy`, `UpiPaymentStrategy`, and `NetBankingPaymentStrategy`.
  * Resolved at runtime via `PaymentStrategyFactory` without hardcoded conditionals.

---

### Slide 10: e) OOP Pillar 4 — Abstraction
* **Interface-Driven Decoupling:**
  * Controllers depend exclusively on service interfaces (`MovieService`, `ShowtimeService`, `BookingService`, `PaymentService`).
  * Concrete implementations shield client code from database persistence mechanics and transaction management.

---

### Slide 11: f) Interactive 2D Seat Matrix & Admission Passes
* **Interactive React Seating Grid:**
  * Curved Cinema Screen glow indicator at top of screen.
  * Color-coded tier rows: Standard (slate), Premium (indigo), VIP Recliner (gold).
  * Real-time seat statuses: Available, Selected (highlighted check), Booked (dimmed ✕).
  * Live bottom order strip recalculating grand total on every seat click.
* **Digital Admission Pass Modal:**
  * Cinema boarding pass styling with perforated borders, movie poster, hall screen, seat numbers, barcode, and print ticket button.

---

### Slide 12: g) Testing & Verification Results
* **Automated JUnit 5 Test Suite:**
  * `CineReserveOopTests`: 5 tests validating Encapsulation (double booking guard), Inheritance, Polymorphic pricing calculations, and Strategy Pattern dispatch.
  * `CineReserveIntegrationTests`: 5 end-to-end tests validating full REST endpoints and transactional booking.
  * **Result:** 11/11 tests passing with 0 failures and 0 errors.

---

### Slide 13: h) Conclusion & Future Roadmap
* **Accomplishments:**
  * Successfully transformed domain into a modern Cinema Theater Seat Booking System.
  * Exemplified all 4 pillars of OOP and the Strategy Pattern.
  * Clean, single-command run via Maven with embedded H2 database.
* **Future Roadmap:**
  * WebSockets for real-time live seat locking across concurrent browsers.
  * Concession stand food & beverage pre-ordering.
