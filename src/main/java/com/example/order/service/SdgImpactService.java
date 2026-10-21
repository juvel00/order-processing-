package com.example.order.service;

import com.example.order.dto.SdgImpactResponse;

/**
 * Service providing UN Sustainable Development Goal impact tracking for the platform.
 */
public interface SdgImpactService {
    SdgImpactResponse getImpactMetrics();
}
