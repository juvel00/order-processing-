package com.example.order.model.entity;

import com.example.order.model.enums.BookingStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Booking entity representing a confirmed cinema ticket reservation.
 * Encapsulates the entire booking lifecycle, financial calculations, and seat holds.
 */
@Entity
@Table(name = "bookings")
public class Booking extends BaseEntity {

    @Column(name = "booking_reference", nullable = false, unique = true)
    private String bookingReference;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;

    @OneToMany(mappedBy = "booking", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    private List<ShowtimeSeat> bookedSeats = new ArrayList<>();

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal = BigDecimal.ZERO;

    @Column(name = "convenience_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal convenienceFee = BigDecimal.ZERO;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private Payment payment;

    public Booking() {
        this.bookingReference = generateBookingReference();
    }

    public Booking(Customer customer, Showtime showtime) {
        this.bookingReference = generateBookingReference();
        this.customer = customer;
        this.showtime = showtime;
        this.status = BookingStatus.CONFIRMED;
    }

    private String generateBookingReference() {
        return "CR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    /**
     * Adds a seat to this booking and updates references.
     */
    public void addSeat(ShowtimeSeat showtimeSeat) {
        showtimeSeat.book(this);
        bookedSeats.add(showtimeSeat);
        recalculateTotals();
    }

    /**
     * Encapsulated financial calculation: computes subtotal, flat convenience fee per ticket, and grand total.
     */
    public void recalculateTotals() {
        BigDecimal sum = BigDecimal.ZERO;
        for (ShowtimeSeat s : bookedSeats) {
            if (s.getEffectivePrice() != null) {
                sum = sum.add(s.getEffectivePrice());
            }
        }
        this.subtotal = sum.setScale(2, RoundingMode.HALF_UP);
        // Flat convenience fee: 25.00 per booked seat
        this.convenienceFee = new BigDecimal("25.00").multiply(new BigDecimal(bookedSeats.size())).setScale(2, RoundingMode.HALF_UP);
        this.totalAmount = this.subtotal.add(this.convenienceFee).setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Cancels the booking and releases reserved seats.
     */
    public void cancel() {
        this.status = BookingStatus.CANCELLED;
        for (ShowtimeSeat seat : bookedSeats) {
            seat.release();
        }
    }

    public String getBookingReference() {
        return bookingReference;
    }

    public void setBookingReference(String bookingReference) {
        this.bookingReference = bookingReference;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Showtime getShowtime() {
        return showtime;
    }

    public void setShowtime(Showtime showtime) {
        this.showtime = showtime;
    }

    public List<ShowtimeSeat> getBookedSeats() {
        return bookedSeats;
    }

    public void setBookedSeats(List<ShowtimeSeat> bookedSeats) {
        this.bookedSeats = bookedSeats;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public BigDecimal getConvenienceFee() {
        return convenienceFee;
    }

    public void setConvenienceFee(BigDecimal convenienceFee) {
        this.convenienceFee = convenienceFee;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
        if (payment != null) {
            payment.setBooking(this);
        }
    }
}
