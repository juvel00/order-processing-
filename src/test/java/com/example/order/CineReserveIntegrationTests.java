package com.example.order;

import com.example.order.dto.BookingRequest;
import com.example.order.dto.PaymentRequest;
import com.example.order.dto.ShowtimeDetailResponse;
import com.example.order.model.enums.PaymentMethod;
import com.example.order.service.ShowtimeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("CineReserve End-to-End REST Integration Tests")
class CineReserveIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ShowtimeService showtimeService;

    @Test
    @DisplayName("GET /api/movies returns active movie catalog")
    void testGetMovies() throws Exception {
        mockMvc.perform(get("/api/movies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].title").exists());
    }

    @Test
    @DisplayName("GET /api/showtimes returns list of scheduled screenings")
    void testGetShowtimes() throws Exception {
        mockMvc.perform(get("/api/showtimes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].screenName").exists());
    }

    @Test
    @DisplayName("GET /api/showtimes/{id} returns seat grid layout")
    void testGetShowtimeDetails() throws Exception {
        mockMvc.perform(get("/api/showtimes/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.seats").isArray())
                .andExpect(jsonPath("$.screenName").exists());
    }

    @Test
    @DisplayName("POST /api/bookings successfully reserves seats via UPI strategy")
    void testCreateBooking() throws Exception {
        // Find available seats for showtime 2
        ShowtimeDetailResponse details = showtimeService.getShowtimeDetails(2L);
        Long availableSeatId = details.getSeats().stream()
                .filter(s -> s.getStatus().name().equals("AVAILABLE"))
                .findFirst()
                .orElseThrow()
                .getShowtimeSeatId();

        PaymentRequest payment = new PaymentRequest();
        payment.setPaymentMethod(PaymentMethod.UPI);
        payment.setUpiId("rahul.test@okaxis");

        BookingRequest request = new BookingRequest(2L, 1L, List.of(availableSeatId), payment);

        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.bookingReference").exists())
                .andExpect(jsonPath("$.status").value("CONFIRMED"))
                .andExpect(jsonPath("$.paymentMethod").value("UPI"));
    }

    @Test
    @DisplayName("GET /api/stats returns theater occupancy and revenue")
    void testGetTheaterStats() throws Exception {
        mockMvc.perform(get("/api/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalMovies").isNumber())
                .andExpect(jsonPath("$.totalBookings").isNumber());
    }
}
