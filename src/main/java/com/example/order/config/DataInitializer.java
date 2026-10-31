package com.example.order.config;

import com.example.order.model.entity.*;
import com.example.order.model.enums.BookingStatus;
import com.example.order.model.enums.MovieGenre;
import com.example.order.model.enums.PaymentMethod;
import com.example.order.model.enums.PaymentStatus;
import com.example.order.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * DataInitializer seeds initial theater screens, polymorphic seats, movies, showtimes,
 * and realistic sample reservations on application bootstrap.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final CustomerRepository customerRepository;
    private final ScreenRepository screenRepository;
    private final SeatRepository seatRepository;
    private final MovieRepository movieRepository;
    private final ShowtimeRepository showtimeRepository;
    private final ShowtimeSeatRepository showtimeSeatRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    public DataInitializer(CustomerRepository customerRepository,
                           ScreenRepository screenRepository,
                           SeatRepository seatRepository,
                           MovieRepository movieRepository,
                           ShowtimeRepository showtimeRepository,
                           ShowtimeSeatRepository showtimeSeatRepository,
                           BookingRepository bookingRepository,
                           PaymentRepository paymentRepository) {
        this.customerRepository = customerRepository;
        this.screenRepository = screenRepository;
        this.seatRepository = seatRepository;
        this.movieRepository = movieRepository;
        this.showtimeRepository = showtimeRepository;
        this.showtimeSeatRepository = showtimeSeatRepository;
        this.bookingRepository = bookingRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (screenRepository.count() > 0) {
            log.info("Database already initialized with cinema data.");
            return;
        }

        log.info("=== Initializing CineReserve Cinema Domain Data ===");

        // 1. Seed Customer
        Customer customer = new Customer("Rahul Sharma", "rahul.sharma@example.com", "+91 9876543210", "GOLD");
        customer.addLoyaltyPoints(250);
        customer = customerRepository.save(customer);

        // 2. Seed Screens with Polymorphic Seats
        Screen screen1 = createScreenWithSeats("Screen 1 - Dolby Atmos 4K", "Dolby Atmos 7.1.4 Surround Sound", 6, 10);
        Screen screen2 = createScreenWithSeats("Screen 2 - IMAX Experience", "IMAX 12-Channel Commercial Sound", 6, 10);

        // 3. Seed Movies
        Movie m1 = new Movie(
                "Interstellar (IMAX Re-Release)",
                "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.",
                MovieGenre.SCI_FI,
                169,
                "English",
                "PG-13",
                "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
                "https://www.youtube.com/watch?v=zSWdZVtXT7E",
                LocalDate.of(2014, 11, 7)
        );

        Movie m2 = new Movie(
                "Oppenheimer",
                "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
                MovieGenre.DRAMA,
                180,
                "English",
                "R",
                "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
                "https://www.youtube.com/watch?v=uYPbbksJxIg",
                LocalDate.of(2023, 7, 21)
        );

        Movie m3 = new Movie(
                "Dune: Part Two",
                "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
                MovieGenre.SCI_FI,
                166,
                "English",
                "PG-13",
                "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
                "https://www.youtube.com/watch?v=Way9Dexny3w",
                LocalDate.of(2024, 3, 1)
        );

        Movie m4 = new Movie(
                "Spider-Man: Across the Spider-Verse",
                "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
                MovieGenre.ANIMATION,
                140,
                "English",
                "PG",
                "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80",
                "https://www.youtube.com/watch?v=cqGjhVJWtEg",
                LocalDate.of(2023, 6, 2)
        );

        Movie m5 = new Movie(
                "The Dark Knight",
                "When the menace known as the Joker wreaks havoc and chaos on Gotham City, Batman must accept one of the greatest psychological and physical tests.",
                MovieGenre.ACTION,
                152,
                "English",
                "PG-13",
                "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
                "https://www.youtube.com/watch?v=EXeTwQWrcwY",
                LocalDate.of(2008, 7, 18)
        );

        m1 = movieRepository.save(m1);
        m2 = movieRepository.save(m2);
        m3 = movieRepository.save(m3);
        m4 = movieRepository.save(m4);
        m5 = movieRepository.save(m5);

        // 4. Seed Showtimes
        LocalDateTime now = LocalDateTime.now();
        Showtime st1 = createShowtimeAndSeats(m1, screen1, now.withHour(18).withMinute(30).withSecond(0), new BigDecimal("250.00"));
        Showtime st2 = createShowtimeAndSeats(m2, screen1, now.withHour(21).withMinute(45).withSecond(0), new BigDecimal("280.00"));
        Showtime st3 = createShowtimeAndSeats(m3, screen2, now.withHour(15).withMinute(0).withSecond(0), new BigDecimal("220.00"));
        Showtime st4 = createShowtimeAndSeats(m4, screen2, now.withHour(19).withMinute(15).withSecond(0), new BigDecimal("240.00"));
        Showtime st5 = createShowtimeAndSeats(m5, screen1, now.plusDays(1).withHour(17).withMinute(30).withSecond(0), new BigDecimal("260.00"));

        // 5. Seed initial realistic booking for Customer
        List<ShowtimeSeat> st1Seats = showtimeSeatRepository.findByShowtimeIdWithSeatOrdered(st1.getId());
        // Select seats E5 and E6 (VIP Recliners)
        ShowtimeSeat seatE5 = st1Seats.stream().filter(s -> s.getSeat().getSeatNumber().equals("E5")).findFirst().orElse(null);
        ShowtimeSeat seatE6 = st1Seats.stream().filter(s -> s.getSeat().getSeatNumber().equals("E6")).findFirst().orElse(null);

        if (seatE5 != null && seatE6 != null) {
            Booking sampleBooking = new Booking(customer, st1);
            sampleBooking.addSeat(seatE5);
            sampleBooking.addSeat(seatE6);
            sampleBooking = bookingRepository.save(sampleBooking);

            Payment samplePayment = new Payment(
                    sampleBooking,
                    PaymentMethod.UPI,
                    sampleBooking.getTotalAmount(),
                    PaymentStatus.SUCCESS,
                    "TXN-UPI-DEMO9812",
                    "rahul.sharma@okaxis"
            );
            samplePayment = paymentRepository.save(samplePayment);
            sampleBooking.setPayment(samplePayment);
            bookingRepository.save(sampleBooking);
        }

        // Also pre-book a couple of seats in st2 and st3 for occupancy demonstration
        List<ShowtimeSeat> st3Seats = showtimeSeatRepository.findByShowtimeIdWithSeatOrdered(st3.getId());
        ShowtimeSeat st3A1 = st3Seats.stream().filter(s -> s.getSeat().getSeatNumber().equals("A1")).findFirst().orElse(null);
        ShowtimeSeat st3A2 = st3Seats.stream().filter(s -> s.getSeat().getSeatNumber().equals("A2")).findFirst().orElse(null);
        if (st3A1 != null && st3A2 != null) {
            Booking guestBooking = new Booking(customer, st3);
            guestBooking.addSeat(st3A1);
            guestBooking.addSeat(st3A2);
            bookingRepository.save(guestBooking);
        }

        log.info("=== CineReserve Seeding Complete ({} movies, {} screens, showtimes created) ===",
                movieRepository.count(), screenRepository.count());
    }

    private Screen createScreenWithSeats(String name, String soundSystem, int rows, int cols) {
        Screen screen = new Screen(name, soundSystem, rows, cols);
        screen = screenRepository.save(screen);

        List<Seat> seats = new ArrayList<>();
        char[] rowLetters = {'A', 'B', 'C', 'D', 'E', 'F'};

        for (int r = 0; r < rows; r++) {
            String rowName = String.valueOf(rowLetters[r]);
            for (int c = 1; c <= cols; c++) {
                String seatNumber = rowName + c;
                Seat seat;

                // Hierarchy mapping:
                // Rows A-B (Front): StandardSeat
                // Rows C-D (Middle): PremiumSeat (+8" extra legroom)
                // Rows E-F (Back/Top): VipReclinerSeat (150° motorized recliner, snack perks)
                if (r < 2) {
                    seat = new StandardSeat(seatNumber, rowName, c, screen);
                } else if (r < 4) {
                    seat = new PremiumSeat(seatNumber, rowName, c, screen, 8);
                } else {
                    seat = new VipReclinerSeat(seatNumber, rowName, c, screen, 150, true);
                }
                seats.add(seat);
            }
        }
        seatRepository.saveAll(seats);
        return screen;
    }

    private Showtime createShowtimeAndSeats(Movie movie, Screen screen, LocalDateTime showTime, BigDecimal basePrice) {
        Showtime showtime = new Showtime(movie, screen, showTime, basePrice);
        showtime = showtimeRepository.save(showtime);

        List<Seat> screenSeats = seatRepository.findByScreenIdOrderByRowNameAscColumnNumberAsc(screen.getId());
        List<ShowtimeSeat> showtimeSeats = new ArrayList<>();

        for (Seat seat : screenSeats) {
            ShowtimeSeat showtimeSeat = new ShowtimeSeat(showtime, seat);
            showtimeSeats.add(showtimeSeat);
        }
        showtimeSeatRepository.saveAll(showtimeSeats);
        return showtime;
    }
}
