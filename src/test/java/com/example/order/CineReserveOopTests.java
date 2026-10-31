package com.example.order;

import com.example.order.exception.SeatAlreadyBookedException;
import com.example.order.model.entity.*;
import com.example.order.model.enums.PaymentMethod;
import com.example.order.model.enums.SeatStatus;
import com.example.order.model.enums.SeatTier;
import com.example.order.strategy.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("CineReserve OOP Principles Test Suite")
class CineReserveOopTests {

    @Test
    @DisplayName("OOP Encapsulation: Double booking protection throws SeatAlreadyBookedException")
    void testEncapsulationDoubleBookingProtection() {
        Screen screen = new Screen("Screen 1", "Dolby Atmos", 5, 8);
        Seat seat = new StandardSeat("C3", "C", 3, screen);
        Showtime showtime = new Showtime(null, screen, LocalDateTime.now(), new BigDecimal("200.00"));
        ShowtimeSeat showtimeSeat = new ShowtimeSeat(showtime, seat);

        Customer customer1 = new Customer("John", "john@example.com", "9999999999", "SILVER");
        Booking booking1 = new Booking(customer1, showtime);

        // First reservation succeeds
        showtimeSeat.book(booking1);
        assertEquals(SeatStatus.BOOKED, showtimeSeat.getStatus());
        assertEquals(booking1, showtimeSeat.getBooking());

        // Second reservation attempt on same seat must throw SeatAlreadyBookedException
        Customer customer2 = new Customer("Alice", "alice@example.com", "8888888888", "GOLD");
        Booking booking2 = new Booking(customer2, showtime);

        assertThrows(SeatAlreadyBookedException.class, () -> showtimeSeat.book(booking2));
    }

    @Test
    @DisplayName("OOP Encapsulation: Booking recalculates subtotal, convenience fee, and total amount")
    void testEncapsulationBookingFinancialTotals() {
        Screen screen = new Screen("Screen 1", "Dolby Atmos", 5, 8);
        StandardSeat s1 = new StandardSeat("A1", "A", 1, screen);
        StandardSeat s2 = new StandardSeat("A2", "A", 2, screen);
        Showtime showtime = new Showtime(null, screen, LocalDateTime.now().withHour(14), new BigDecimal("150.00"));

        ShowtimeSeat ss1 = new ShowtimeSeat(showtime, s1);
        ShowtimeSeat ss2 = new ShowtimeSeat(showtime, s2);

        Customer customer = new Customer("John", "john@example.com", "9999999999", "SILVER");
        Booking booking = new Booking(customer, showtime);
        booking.addSeat(ss1);
        booking.addSeat(ss2);

        // 2 tickets at 150.00 = 300.00 subtotal
        assertEquals(new BigDecimal("300.00"), booking.getSubtotal());
        // 2 tickets flat convenience fee at 25.00 each = 50.00
        assertEquals(new BigDecimal("50.00"), booking.getConvenienceFee());
        // Total = 350.00
        assertEquals(new BigDecimal("350.00"), booking.getTotalAmount());
    }

    @Test
    @DisplayName("OOP Inheritance: StandardSeat, PremiumSeat, and VipReclinerSeat inherit from Seat and BaseEntity")
    void testInheritanceHierarchy() {
        Screen screen = new Screen("IMAX Screen", "IMAX 12-Channel", 6, 10);

        Seat standard = new StandardSeat("A1", "A", 1, screen);
        Seat premium = new PremiumSeat("C5", "C", 5, screen, 8);
        Seat vip = new VipReclinerSeat("E7", "E", 7, screen, 150, true);

        assertTrue(standard instanceof Seat);
        assertTrue(standard instanceof BaseEntity);
        assertTrue(premium instanceof Seat);
        assertTrue(premium instanceof BaseEntity);
        assertTrue(vip instanceof Seat);
        assertTrue(vip instanceof BaseEntity);

        assertEquals(SeatTier.STANDARD, standard.getSeatTier());
        assertEquals(SeatTier.PREMIUM, premium.getSeatTier());
        assertEquals(SeatTier.VIP_RECLINER, vip.getSeatTier());
    }

    @Test
    @DisplayName("OOP Polymorphism: calculateEffectivePrice dynamically adjusts by tier and prime-time surge")
    void testPolymorphicPricingCalculation() {
        Screen screen = new Screen("Main Screen", "7.1", 6, 10);
        BigDecimal basePrice = new BigDecimal("200.00");

        Seat standard = new StandardSeat("A1", "A", 1, screen);
        Seat premium = new PremiumSeat("C5", "C", 5, screen, 8);
        Seat vip = new VipReclinerSeat("E7", "E", 7, screen, 150, true);

        // Matinee (non-prime time)
        BigDecimal standardMatinee = standard.calculateEffectivePrice(basePrice, false);
        BigDecimal premiumMatinee = premium.calculateEffectivePrice(basePrice, false);
        BigDecimal vipMatinee = vip.calculateEffectivePrice(basePrice, false);

        assertEquals(new BigDecimal("200.00"), standardMatinee);
        assertEquals(new BigDecimal("270.00"), premiumMatinee); // 200 * 1.35
        assertEquals(new BigDecimal("410.00"), vipMatinee);     // 200 * 1.80 + 50 snack voucher

        // Prime Time
        BigDecimal standardPrime = standard.calculateEffectivePrice(basePrice, true);
        BigDecimal premiumPrime = premium.calculateEffectivePrice(basePrice, true);
        BigDecimal vipPrime = vip.calculateEffectivePrice(basePrice, true);

        assertEquals(new BigDecimal("220.00"), standardPrime); // 200 + 20 prime surge
        assertEquals(new BigDecimal("310.00"), premiumPrime);  // 270 + 40 prime surge
        assertEquals(new BigDecimal("470.00"), vipPrime);      // 410 + 60 prime surge
    }

    @Test
    @DisplayName("OOP Strategy Pattern: PaymentStrategyFactory resolves appropriate payment mechanisms")
    void testStrategyDesignPatternResolution() {
        CardPaymentStrategy cardStrategy = new CardPaymentStrategy();
        UpiPaymentStrategy upiStrategy = new UpiPaymentStrategy();
        NetBankingPaymentStrategy netBankingStrategy = new NetBankingPaymentStrategy();

        PaymentStrategyFactory factory = new PaymentStrategyFactory(List.of(cardStrategy, upiStrategy, netBankingStrategy));

        PaymentStrategy resolvedCard = factory.getStrategy(PaymentMethod.CARD);
        PaymentStrategy resolvedUpi = factory.getStrategy(PaymentMethod.UPI);
        PaymentStrategy resolvedNetBank = factory.getStrategy(PaymentMethod.NET_BANKING);

        assertInstanceOf(CardPaymentStrategy.class, resolvedCard);
        assertInstanceOf(UpiPaymentStrategy.class, resolvedUpi);
        assertInstanceOf(NetBankingPaymentStrategy.class, resolvedNetBank);
    }
}
