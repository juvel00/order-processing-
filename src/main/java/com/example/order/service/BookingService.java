package com.example.order.service;

import com.example.order.dto.BookingRequest;
import com.example.order.dto.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse createBooking(BookingRequest request);
    BookingResponse getBookingById(Long id);
    BookingResponse getBookingByReference(String reference);
    List<BookingResponse> getBookingsByCustomer(Long customerId);
    List<BookingResponse> getAllBookings();
    BookingResponse cancelBooking(Long id);
}
