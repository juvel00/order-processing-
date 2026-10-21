package com.example.order;

import com.example.order.exception.InsufficientStockException;
import com.example.order.model.entity.*;
import com.example.order.model.enums.PaymentMethod;
import com.example.order.model.enums.ProductCategory;
import com.example.order.strategy.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("FarmDirect OOP Principles Test Suite")
class FarmDirectOopTests {

    @Test
    @DisplayName("OOP Encapsulation: Stock deduction protects state against deficit")
    void testEncapsulationStockDeduction() {
        Farmer farmer = new Farmer("Ramesh", "ramesh@patel.in", "9999999999", "Nashik", "Patel Farm", "Nashik", true, "ramesh@okaxis");
        Product product = new PerishableProduce(
                "Organic Tomatoes", "Fresh vine tomatoes", ProductCategory.VEGETABLES, "kg",
                new BigDecimal("50.00"), 10, farmer, LocalDate.now(), 7, false, "Grade A"
        );

        // Valid reduction
        product.reduceStock(4);
        assertEquals(6, product.getStockQuantity());

        // Invalid reduction exceeding stock must throw InsufficientStockException
        assertThrows(InsufficientStockException.class, () -> product.reduceStock(10));
    }

    @Test
    @DisplayName("OOP Inheritance: PerishableProduce and ProcessedProduce inherit from Product and BaseEntity")
    void testInheritanceHierarchy() {
        Farmer farmer = new Farmer("Sunita", "sunita@himalaya.org", "8888888888", "Almora", "Bio Farm", "Almora", true, "sunita@okhdfcbank");

        PerishableProduce perishable = new PerishableProduce(
                "Apples", "Crisp apples", ProductCategory.FRUITS, "kg",
                new BigDecimal("120.00"), 50, farmer, LocalDate.now(), 14, true, "Grade A"
        );

        ProcessedProduce processed = new ProcessedProduce(
                "Raw Honey", "Wild honey", ProductCategory.ORGANIC_HONEY, "jar",
                new BigDecimal("400.00"), 30, farmer, "Cold Filtered", LocalDate.now().minusMonths(1), 24, "Organic"
        );

        assertTrue(perishable instanceof Product);
        assertTrue(perishable instanceof BaseEntity);
        assertTrue(processed instanceof Product);
        assertTrue(processed instanceof BaseEntity);
        assertEquals(farmer, perishable.getFarmer());
        assertEquals("jar", processed.getUnit());
    }

    @Test
    @DisplayName("OOP Polymorphism: Dynamic pricing calculates 25% clearance discount for near-expiry produce (SDG 12.3)")
    void testPolymorphicPricingClearanceDiscount() {
        Farmer farmer = new Farmer("Ramesh", "ramesh@patel.in", "9999999999", "Nashik", "Patel Farm", "Nashik", true, "ramesh@okaxis");

        // Fresh produce: 6 days left out of 7 -> no discount
        PerishableProduce fresh = new PerishableProduce(
                "Fresh Spinach", "Harvested yesterday", ProductCategory.VEGETABLES, "bunch",
                new BigDecimal("100.00"), 20, farmer, LocalDate.now().minusDays(1), 7, false, "Grade A"
        );
        assertFalse(fresh.isClearanceDiscountApplied());
        assertEquals(new BigDecimal("100.00"), fresh.calculateEffectivePrice());

        // Near-expiry produce: 1 day left out of 7 (<= 35% remaining) -> 25% discount applied
        PerishableProduce nearExpiry = new PerishableProduce(
                "Discounted Spinach", "Harvested 6 days ago", ProductCategory.VEGETABLES, "bunch",
                new BigDecimal("100.00"), 20, farmer, LocalDate.now().minusDays(6), 7, false, "Grade A"
        );
        assertTrue(nearExpiry.isClearanceDiscountApplied());
        assertEquals(new BigDecimal("75.00"), nearExpiry.calculateEffectivePrice());
    }

    @Test
    @DisplayName("OOP Polymorphism: Strategy pattern dynamically executes UPI, Card, and COD payments")
    void testPaymentStrategyPolymorphism() {
        UpiPaymentStrategy upiStrategy = new UpiPaymentStrategy();
        CardPaymentStrategy cardStrategy = new CardPaymentStrategy();
        CashOnDeliveryPaymentStrategy codStrategy = new CashOnDeliveryPaymentStrategy();

        PaymentStrategyFactory factory = new PaymentStrategyFactory(List.of(upiStrategy, cardStrategy, codStrategy));

        assertSame(upiStrategy, factory.getStrategy(PaymentMethod.UPI));
        assertSame(cardStrategy, factory.getStrategy(PaymentMethod.CREDIT_CARD));
        assertSame(cardStrategy, factory.getStrategy(PaymentMethod.DEBIT_CARD));
        assertSame(codStrategy, factory.getStrategy(PaymentMethod.CASH_ON_DELIVERY));
    }
}
