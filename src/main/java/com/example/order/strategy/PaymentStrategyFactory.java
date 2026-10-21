package com.example.order.strategy;

import com.example.order.exception.PaymentProcessingException;
import com.example.order.model.enums.PaymentMethod;
import org.springframework.stereotype.Component;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Factory class resolving payment strategies polymorphically at runtime.
 */
@Component
public class PaymentStrategyFactory {

    private final Map<PaymentMethod, PaymentStrategy> strategyMap = new EnumMap<>(PaymentMethod.class);

    public PaymentStrategyFactory(List<PaymentStrategy> strategies) {
        for (PaymentStrategy strategy : strategies) {
            strategyMap.put(strategy.getSupportedMethod(), strategy);
        }
        // DEBIT_CARD reuses card payment strategy
        PaymentStrategy cardStrategy = strategyMap.get(PaymentMethod.CREDIT_CARD);
        if (cardStrategy != null) {
            strategyMap.put(PaymentMethod.DEBIT_CARD, cardStrategy);
        }
    }

    public PaymentStrategy getStrategy(PaymentMethod method) {
        PaymentStrategy strategy = strategyMap.get(method);
        if (strategy == null) {
            throw new PaymentProcessingException("Unsupported payment method: " + method);
        }
        return strategy;
    }
}
