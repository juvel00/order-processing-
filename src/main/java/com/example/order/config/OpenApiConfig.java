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
                        .title("FarmDirect — Direct Producer-to-Consumer Online Shopping System")
                        .version("1.0.0")
                        .description("""
                                ### Java OOP Academic Project & UN Sustainable Development Goals (SDG) System
                                
                                **FarmDirect** is a pure backend online shopping system eliminating intermediate brokers to connect smallholder agricultural producers directly with end consumers.
                                
                                #### 🌍 UN SDG Alignment:
                                * **SDG 2: Zero Hunger (Target 2.3)** — Direct producer remuneration (90% payout) doubling smallholder farmer income and eliminating broker cuts.
                                * **SDG 12: Responsible Consumption and Production (Target 12.3)** — Automated dynamic freshness-saver clearance discounting to drastically cut post-harvest food waste.
                                
                                #### ☕ Object-Oriented Programming (OOP) Pillars:
                                * **Encapsulation:** Domain models (`Order`, `Product`, `Cart`) encapsulate stock decrementing, price adjustments, and financial validations behind robust business methods.
                                * **Inheritance:** `BaseEntity` mapped superclass, `User` extended by `Farmer` and `Consumer`, `Product` extended by `PerishableProduce` and `ProcessedProduce`.
                                * **Polymorphism:** `PaymentStrategy` interface implemented dynamically by `UpiPaymentStrategy`, `CardPaymentStrategy`, and `CashOnDeliveryPaymentStrategy`; polymorphic pricing in produce hierarchy.
                                * **Abstraction:** Service interfaces (`ProductService`, `CartService`, `OrderService`, `PaymentService`) cleanly decoupling controllers from data persistence.
                                """)
                        .contact(new Contact()
                                .name("FarmDirect Engineering")
                                .email("farmdirect@support.example.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}
