package com.example.order.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("CineReserve — Theater Seat Booking System")
                        .version("1.0.0")
                        .description("""
                                ### Java OOP Academic Project: Enterprise Cinema Theater Seat Booking System
                                
                                **CineReserve** is an enterprise-grade cinema and theater seat reservation platform engineered in Java 21 and Spring Boot 3.4.2.
                                
                                #### ☕ Object-Oriented Programming (OOP) Pillars:
                                * **Encapsulation:** Invariants strictly guarded in `ShowtimeSeat` (preventing double reservations), `Booking.recalculateTotals()`, and bean validations (`@NotBlank`, `@NotNull`, `@Min`).
                                * **Inheritance:** 
                                  - `BaseEntity` mapped superclass (`id`, `createdAt`, `updatedAt`, lifecycle hooks).
                                  - `User` hierarchy (`Customer` with loyalty perks, `TheaterAdmin` with staff badges).
                                  - `Seat` hierarchy (`StandardSeat`, `PremiumSeat` with acoustic placement, `VipReclinerSeat` with motorized recliners & snack perks).
                                * **Polymorphism:** 
                                  - Polymorphic seat pricing: `Seat.calculateEffectivePrice()` dynamically evaluated per seat tier and showtime prime-time surge.
                                  - Strategy Design Pattern: `PaymentStrategy` interface implemented dynamically by `CardPaymentStrategy`, `UpiPaymentStrategy`, and `NetBankingPaymentStrategy`.
                                * **Abstraction:** Service interfaces (`MovieService`, `ShowtimeService`, `BookingService`, `PaymentService`, `TheaterStatsService`) cleanly shielding REST controllers from Spring Data JPA persistence.
                                """)
                        .contact(new Contact()
                                .name("CineReserve Engineering")
                                .email("cinereserve@cinema.example.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}
