package com.example.order;

import com.example.order.dto.AddToCartRequest;
import com.example.order.dto.CheckoutRequest;
import com.example.order.dto.PaymentRequest;
import com.example.order.model.enums.PaymentMethod;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("FarmDirect REST Endpoints Integration Tests")
class FarmDirectIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/products returns catalog with dynamic pricing")
    void testGetAllProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(4))))
                .andExpect(jsonPath("$[0].name", notNullValue()))
                .andExpect(jsonPath("$[0].farmerName", notNullValue()));
    }

    @Test
    @DisplayName("GET /api/products/clearance returns near-expiry items with waste-reduction discount (SDG 12.3)")
    void testGetClearanceProducts() throws Exception {
        mockMvc.perform(get("/api/products/clearance"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].clearanceDiscountApplied", is(true)));
    }

    @Test
    @DisplayName("GET /api/cart/{userId} returns active cart with farmer payout and savings")
    void testGetCart() throws Exception {
        // Consumer 1 (seeded in DataInitializer)
        mockMvc.perform(get("/api/cart/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId", is(3)))
                .andExpect(jsonPath("$.items", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.directFarmerShare", notNullValue()))
                .andExpect(jsonPath("$.estimatedConsumerSavings", notNullValue()));
    }

    @Test
    @DisplayName("POST /api/cart adds produce to cart and returns updated totals")
    void testAddToCart() throws Exception {
        AddToCartRequest request = new AddToCartRequest(3L, 1L, 1);

        mockMvc.perform(post("/api/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId", is(3)))
                .andExpect(jsonPath("$.totalItemCount", greaterThanOrEqualTo(1)));
    }

    @Test
    @DisplayName("POST /api/orders/checkout processes payment and creates immutable order invoice (SDG 2.3)")
    void testCheckoutAndInvoice() throws Exception {
        PaymentRequest payment = new PaymentRequest();
        payment.setPaymentMethod(PaymentMethod.UPI);
        payment.setUpiId("aaravsharma@okhdfcbank");

        CheckoutRequest checkout = new CheckoutRequest(3L, "Flat 402, Bengaluru", payment);

        mockMvc.perform(post("/api/orders/checkout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(checkout)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.orderNumber", startsWith("FD-")))
                .andExpect(jsonPath("$.status", is("CONFIRMED")))
                .andExpect(jsonPath("$.paymentStatus", is("SUCCESS")))
                .andExpect(jsonPath("$.totalFarmerPayout", greaterThan(0.0)))
                .andExpect(jsonPath("$.items", hasSize(greaterThanOrEqualTo(1))));
    }

    @Test
    @DisplayName("GET /api/impact/summary provides real-time UN SDG 2 & SDG 12 impact indicators")
    void testGetSdgImpact() throws Exception {
        mockMvc.perform(get("/api/impact/summary"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.directFarmerRevenuePercentage", is(90.0)))
                .andExpect(jsonPath("$.totalDirectFarmerEarnings", greaterThanOrEqualTo(0.0)))
                .andExpect(jsonPath("$.sdg2Description", containsString("SDG 2")))
                .andExpect(jsonPath("$.sdg12Description", containsString("SDG 12")));
    }
}
