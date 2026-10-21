package com.example.order.dto;

import com.example.order.model.enums.ProductCategory;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateProduceRequest {

    @Schema(description = "Produce type: PERISHABLE or PROCESSED", example = "PERISHABLE")
    @NotBlank(message = "Produce type (PERISHABLE or PROCESSED) is required")
    private String produceType;

    @Schema(description = "Produce name", example = "Organic Alphonso Mangoes")
    @NotBlank(message = "Produce name is required")
    private String name;

    @Schema(description = "Produce description", example = "Naturally tree-ripened organic mangoes from Ratnagiri.")
    private String description;

    @Schema(description = "Category", example = "FRUITS")
    @NotNull(message = "Category is required")
    private ProductCategory category;

    @Schema(description = "Unit of measurement", example = "dozen")
    @NotBlank(message = "Unit is required")
    private String unit;

    @Schema(description = "Base price per unit in INR", example = "450.00")
    @NotNull(message = "Base price is required")
    @DecimalMin(value = "0.01", message = "Base price must be positive")
    private BigDecimal basePrice;

    @Schema(description = "Available inventory quantity", example = "50")
    @Min(value = 1, message = "Initial stock must be at least 1")
    private int stockQuantity;

    @Schema(description = "Farmer User ID", example = "1")
    @NotNull(message = "Farmer ID is required")
    private Long farmerId;

    // Perishable specific fields
    @Schema(description = "Harvest date for perishables (YYYY-MM-DD)", example = "2026-10-18")
    private LocalDate harvestDate;

    @Schema(description = "Expected shelf life in days", example = "7")
    private Integer shelfLifeDays;

    @Schema(description = "Cold storage required flag", example = "false")
    private Boolean coldStorageRequired;

    @Schema(description = "Freshness Grade", example = "Grade A+ Premium")
    private String freshnessGrade;

    // Processed specific fields
    @Schema(description = "Processing method (e.g. Cold-Pressed, Sun-Dried)", example = "Traditional Cold Pressed")
    private String processingMethod;

    @Schema(description = "Packaging Date (YYYY-MM-DD)", example = "2026-10-01")
    private LocalDate packagingDate;

    @Schema(description = "Shelf life in months for processed items", example = "12")
    private Integer shelfLifeMonths;

    @Schema(description = "Certification standard", example = "Jaivik Bharat / India Organic")
    private String certificationStandard;

    public CreateProduceRequest() {
    }

    public String getProduceType() {
        return produceType;
    }

    public void setProduceType(String produceType) {
        this.produceType = produceType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public LocalDate getHarvestDate() {
        return harvestDate;
    }

    public void setHarvestDate(LocalDate harvestDate) {
        this.harvestDate = harvestDate;
    }

    public Integer getShelfLifeDays() {
        return shelfLifeDays;
    }

    public void setShelfLifeDays(Integer shelfLifeDays) {
        this.shelfLifeDays = shelfLifeDays;
    }

    public Boolean getColdStorageRequired() {
        return coldStorageRequired;
    }

    public void setColdStorageRequired(Boolean coldStorageRequired) {
        this.coldStorageRequired = coldStorageRequired;
    }

    public String getFreshnessGrade() {
        return freshnessGrade;
    }

    public void setFreshnessGrade(String freshnessGrade) {
        this.freshnessGrade = freshnessGrade;
    }

    public String getProcessingMethod() {
        return processingMethod;
    }

    public void setProcessingMethod(String processingMethod) {
        this.processingMethod = processingMethod;
    }

    public LocalDate getPackagingDate() {
        return packagingDate;
    }

    public void setPackagingDate(LocalDate packagingDate) {
        this.packagingDate = packagingDate;
    }

    public Integer getShelfLifeMonths() {
        return shelfLifeMonths;
    }

    public void setShelfLifeMonths(Integer shelfLifeMonths) {
        this.shelfLifeMonths = shelfLifeMonths;
    }

    public String getCertificationStandard() {
        return certificationStandard;
    }

    public void setCertificationStandard(String certificationStandard) {
        this.certificationStandard = certificationStandard;
    }
}
