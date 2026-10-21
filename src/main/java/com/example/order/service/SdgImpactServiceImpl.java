package com.example.order.service;

import com.example.order.dto.SdgImpactResponse;
import com.example.order.model.entity.Order;
import com.example.order.model.entity.OrderItem;
import com.example.order.repository.FarmerRepository;
import com.example.order.repository.OrderRepository;
import com.example.order.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class SdgImpactServiceImpl implements SdgImpactService {

    private final OrderRepository orderRepository;
    private final FarmerRepository farmerRepository;
    private final ProductRepository productRepository;

    public SdgImpactServiceImpl(OrderRepository orderRepository,
                                FarmerRepository farmerRepository,
                                ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
    }

    @Override
    public SdgImpactResponse getImpactMetrics() {
        SdgImpactResponse metrics = new SdgImpactResponse();

        BigDecimal totalFarmerEarnings = orderRepository.sumTotalFarmerPayout();
        BigDecimal totalRevenue = orderRepository.sumTotalRevenue();
        BigDecimal brokerMarkupSaved = orderRepository.sumEstimatedBrokerMarkupSaved();

        long farmerCount = farmerRepository.count();
        List<Order> orders = orderRepository.findAll();
        long completedOrders = orders.stream()
                .filter(o -> o.getStatus() != com.example.order.model.enums.OrderStatus.CANCELLED)
                .count();

        // Calculate clearance produce items sold to prevent food waste
        long clearanceUnitsSold = orders.stream()
                .filter(o -> o.getStatus() != com.example.order.model.enums.OrderStatus.CANCELLED)
                .flatMap(o -> o.getItems().stream())
                .filter(OrderItem::isClearanceDiscountApplied)
                .mapToInt(OrderItem::getQuantity)
                .sum();

        // Each clearance unit saved represents approx 1.5kg of agricultural produce rescued
        double estimatedKgSaved = clearanceUnitsSold * 1.5;

        long activePerishables = productRepository.findAllPerishableProduce().size();

        metrics.setTotalDirectFarmerEarnings(totalFarmerEarnings != null ? totalFarmerEarnings : BigDecimal.ZERO);
        metrics.setTotalGrossPlatformSales(totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        metrics.setDirectFarmerRevenuePercentage(90.0);
        metrics.setEstimatedMiddlemanCommissionEliminated(brokerMarkupSaved != null ? brokerMarkupSaved : BigDecimal.ZERO);
        metrics.setTotalRegisteredFarmers(farmerCount);
        metrics.setTotalOrdersCompleted(completedOrders);

        metrics.setClearanceProduceUnitsSold(clearanceUnitsSold);
        metrics.setEstimatedKgFoodWastePrevented(estimatedKgSaved);
        metrics.setActivePerishableListings(activePerishables);

        metrics.setSdg2Description(
            "UN SDG 2: Zero Hunger & Target 2.3 - Doubling agricultural productivity & incomes of small-scale food producers through direct producer-to-consumer monetization."
        );
        metrics.setSdg12Description(
            "UN SDG 12: Responsible Consumption & Target 12.3 - Halving per capita food waste via dynamic freshness pricing and transparent farm-to-table traceability."
        );

        return metrics;
    }
}
