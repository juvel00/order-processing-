package com.example.order.config;

import com.example.order.dto.CheckoutRequest;
import com.example.order.dto.PaymentRequest;
import com.example.order.model.entity.*;
import com.example.order.model.enums.PaymentMethod;
import com.example.order.model.enums.ProductCategory;
import com.example.order.repository.*;
import com.example.order.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Seeds rich sample data on startup for immediate out-of-the-box demonstration.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final ConsumerRepository consumerRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final OrderService orderService;

    public DataInitializer(UserRepository userRepository,
                           FarmerRepository farmerRepository,
                           ConsumerRepository consumerRepository,
                           ProductRepository productRepository,
                           CartRepository cartRepository,
                           OrderService orderService) {
        this.userRepository = userRepository;
        this.farmerRepository = farmerRepository;
        this.consumerRepository = consumerRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.orderService = orderService;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        log.info("--- Initializing FarmDirect Demo Data ---");

        // 1. Seed Farmers (SDG 2.3)
        Farmer farmer1 = new Farmer(
                "Ramesh Patel",
                "ramesh.patel@farms.in",
                "+91-9822012345",
                "Farm Plot #14, Dindori Valley, Nashik, Maharashtra",
                "Patel Organic Agro-Farms",
                "Nashik, Maharashtra",
                true,
                "rameshpatel@okaxis"
        );
        farmerRepository.save(farmer1);

        Farmer farmer2 = new Farmer(
                "Sunita Devi",
                "sunita.devi@himalayan.org",
                "+91-9412098765",
                "Village Almora, Kumaon Hills, Uttarakhand",
                "Himalayan Bio-Diversified Organics",
                "Almora, Uttarakhand",
                true,
                "sunitadevi@okhdfcbank"
        );
        farmerRepository.save(farmer2);

        // 2. Seed Consumers
        Consumer consumer1 = new Consumer(
                "Aarav Sharma",
                "aarav.sharma@example.com",
                "+91-9876543210",
                "Flat 402, Green Meadows Apartment, Indiranagar, Bengaluru",
                "Flat 402, Green Meadows Apartment, Indiranagar, Bengaluru - 560038"
        );
        consumerRepository.save(consumer1);

        Consumer consumer2 = new Consumer(
                "Priya Menon",
                "priya.menon@example.com",
                "+91-9988776655",
                "B-12 Orchid Residency, Koregaon Park, Pune",
                "B-12 Orchid Residency, Koregaon Park, Pune - 411001"
        );
        consumerRepository.save(consumer2);

        // 3. Seed Products (Inheritance & Polymorphism)
        // Perishable: Fresh Organic Vine Tomatoes (Freshly harvested)
        PerishableProduce tomatoes = new PerishableProduce(
                "Organic Vine Tomatoes",
                "Farm fresh, naturally ripened, pesticide-free vine tomatoes.",
                ProductCategory.VEGETABLES,
                "kg",
                new BigDecimal("45.00"),
                120,
                farmer1,
                LocalDate.now().minusDays(1),
                8,
                false,
                "Grade A+ Fresh"
        );
        productRepository.save(tomatoes);

        // Perishable: Fresh Spinach (Palak) - NEAR EXPIRY! Only 2 days left out of 5 -> Triggers 25% Clearance Discount (SDG 12.3)!
        PerishableProduce spinach = new PerishableProduce(
                "Fresh Crisp Spinach (Palak)",
                "Hydroponic, washed and ozone-sanitized tender baby spinach. Clearance freshness-saver discount active!",
                ProductCategory.VEGETABLES,
                "bunch",
                new BigDecimal("30.00"),
                45,
                farmer1,
                LocalDate.now().minusDays(3),
                5,
                true,
                "Grade A"
        );
        productRepository.save(spinach);

        // Perishable: Ratnagiri Alphonso Mangoes
        PerishableProduce mangoes = new PerishableProduce(
                "GI-Tagged Ratnagiri Alphonso Mangoes",
                "Authentic GI tagged, carbide-free naturally sweetened Alphonso mangoes.",
                ProductCategory.FRUITS,
                "dozen",
                new BigDecimal("550.00"),
                35,
                farmer1,
                LocalDate.now().minusDays(2),
                10,
                false,
                "Export Grade Premium"
        );
        productRepository.save(mangoes);

        // Processed: Himalayan Raw Multifloral Honey
        ProcessedProduce rawHoney = new ProcessedProduce(
                "Himalayan Wild Raw Honey",
                "Unpasteurized, unprocessed multifloral honey collected from Himalayan forest bees.",
                ProductCategory.ORGANIC_HONEY,
                "500g jar",
                new BigDecimal("380.00"),
                60,
                farmer2,
                "Traditional Cold Filtration",
                LocalDate.now().minusMonths(1),
                24,
                "FSSAI Jaivik Bharat Certified"
        );
        productRepository.save(rawHoney);

        // Processed: Cold-Pressed Mustard Oil
        ProcessedProduce mustardOil = new ProcessedProduce(
                "Wood-Pressed Pure Kachi Ghani Mustard Oil",
                "Extracted using ancient wooden churner (kolhu) below 40 degrees C to preserve natural antioxidants.",
                ProductCategory.PROCESSED_GOODS,
                "1 Liter Bottle",
                new BigDecimal("220.00"),
                80,
                farmer2,
                "Cold Wood-Pressed (Kolhu)",
                LocalDate.now().minusDays(20),
                12,
                "AGMARK Grade 1"
        );
        productRepository.save(mustardOil);

        // 4. Seed an active Cart for Consumer 1
        Cart cart = new Cart(consumer1);
        cart.addProduct(tomatoes, 2); // 2 kg tomatoes
        cart.addProduct(spinach, 2);  // 2 bunches spinach (will show clearance price)
        cart.addProduct(rawHoney, 1); // 1 jar honey
        cartRepository.save(cart);

        // 5. Checkout an initial demo order for Consumer 2 to populate analytics immediately
        Cart cart2 = new Cart(consumer2);
        cart2.addProduct(mangoes, 1);
        cart2.addProduct(mustardOil, 2);
        cartRepository.save(cart2);

        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setPaymentMethod(PaymentMethod.UPI);
        paymentRequest.setUpiId("priyamenon@okhdfcbank");

        CheckoutRequest checkout = new CheckoutRequest(
                consumer2.getId(),
                consumer2.getDefaultDeliveryAddress(),
                paymentRequest
        );

        orderService.checkoutCart(checkout);

        log.info("--- FarmDirect Demo Data Successfully Initialized ---");
        log.info("API Documentation / Swagger UI: http://localhost:8080/swagger-ui.html");
        log.info("H2 Database Console: http://localhost:8080/h2-console (JDBC URL: jdbc:h2:mem:farmdirectdb)");
    }
}
