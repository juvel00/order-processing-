package com.example.order.controller;

import com.example.order.dto.SdgImpactResponse;
import com.example.order.service.SdgImpactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/impact")
@Tag(name = "4. UN SDG Impact & Analytics API", description = "Monitor platform metrics mapped to UN SDG 2 (Zero Hunger / Target 2.3) and SDG 12 (Target 12.3).")
public class SdgImpactController {

    private final SdgImpactService sdgImpactService;

    public SdgImpactController(SdgImpactService sdgImpactService) {
        this.sdgImpactService = sdgImpactService;
    }

    @GetMapping("/summary")
    @Operation(summary = "Get UN SDG Impact Summary",
               description = "Returns aggregate data on total farmer earnings, middleman commissions bypassed, and food waste prevented via freshness-saver sales.")
    public ResponseEntity<SdgImpactResponse> getImpactSummary() {
        return ResponseEntity.ok(sdgImpactService.getImpactMetrics());
    }
}
