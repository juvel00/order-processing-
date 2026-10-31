package com.example.order.service;

import com.example.order.dto.BookingRequest;
import com.example.order.dto.BookingResponse;
import com.example.order.exception.ResourceNotFoundException;
import com.example.order.exception.SeatAlreadyBookedException;
import com.example.order.model.entity.*;
import com.example.order.model.enums.BookingStatus;
import com.example.order.model.enums.SeatStatus;
import com.example.order.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ShowtimeRepository showtimeRepository;
    private final ShowtimeSeatRepository showtimeSeatRepository;
    private final CustomerRepository customerRepository;
    private final PaymentService paymentService;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository,
                              ShowtimeRepository showtimeRepository,
                              ShowtimeSeatRepository showtimeSeatRepository,
                              CustomerRepository customerRepository,
                              PaymentService paymentService) {
        this.bookingRepository = bookingRepository;
        this.showtimeRepository = showtimeRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
        this.customerRepository = customerRepository;
        this.paymentService = paymentService;
    }

    @Override
    @Transactional
    public BookingResponse createBooking(BookingRequest request) {
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with ID: " + request.getShowtimeId()));

        Long customerId = request.getCustomerId() != null ? request.getCustomerId() : 1L;
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + customerId));

        Booking booking = new Booking(customer, showtime);

        for (Long showtimeSeatId : request.getShowtimeSeatIds()) {
            ShowtimeSeat seat = showtimeSeatRepository.findById(showtimeSeatId)
                    .orElseThrow(() -> new ResourceNotFoundException("Seat not found with ID: " + showtimeSeatId));

            if (!seat.getShowtime().getId().equals(showtime.getId())) {
                throw new IllegalArgumentException("Seat " + seat.getSeat().getSeatNumber() + " does not belong to this showtime.");
            }

            if (seat.getStatus() == SeatStatus.BOOKED) {
                throw new SeatAlreadyBookedException("Seat " + seat.getSeat().getSeatNumber() + " has already been reserved!");
            }

            // Encapsulated booking logic validates and links seat
            booking.addSeat(seat);
        }

        // Persist booking to generate primary key
        Booking savedBooking = bookingRepository.save(booking);

        // Process payment polymorphically via strategy pattern
        Payment payment = paymentService.processPayment(savedBooking, request.getPayment());
        savedBooking.setPayment(payment);

        // Reward loyalty points to customer
        customer.addLoyaltyPoints(booking.getBookedSeats().size() * 50);
        customerRepository.save(customer);

        return mapToResponse(savedBooking);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return mapToResponse(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public BookingResponse getBookingByReference(String reference) {
        Booking booking = bookingRepository.findByBookingReference(reference)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with reference: " + reference));
        return mapToResponse(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BookingResponse cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            return mapToResponse(booking);
        }

        booking.cancel();
        Booking updatedBooking = bookingRepository.save(booking);
        return mapToResponse(updatedBooking);
    }

    private BookingResponse mapToResponse(Booking booking) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setBookingReference(booking.getBookingReference());
        response.setCustomerId(booking.getCustomer().getId());
        response.setCustomerName(booking.getCustomer().getName());
        response.setCustomerEmail(booking.getCustomer().getEmail());

        Showtime st = booking.getShowtime();
        response.setShowtimeId(st.getId());
        response.setMovieTitle(st.getMovie().getTitle());
        response.setMoviePoster(st.getMovie().getPosterUrl());
        response.setScreenName(st.getScreen().getName());
        response.setShowTime(st.getShowTime());

        List<String> seatNumbers = booking.getBookedSeats().stream()
                .map(ss -> ss.getSeat().getSeatNumber())
                .collect(Collectors.toList());
        List<String> seatTiers = booking.getBookedSeats().stream()
                .map(ss -> ss.getSeat().getSeatTier().getDisplayName())
                .collect(Collectors.toList());

        response.setSeatNumbers(seatNumbers);
        response.setSeatTiers(seatTiers);
        response.setSubtotal(booking.getSubtotal());
        response.setConvenienceFee(booking.getConvenienceFee());
        response.setTotalAmount(booking.getTotalAmount());
        response.setStatus(booking.getStatus());

        if (booking.getPayment() != null) {
            response.setPaymentMethod(booking.getPayment().getPaymentMethod());
            response.setTransactionId(booking.getPayment().getTransactionId());
        }

        response.setBookingTime(booking.getCreatedAt());
        return response;
    }
}
