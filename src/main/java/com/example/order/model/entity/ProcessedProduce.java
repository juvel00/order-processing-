package com.example.order.model.entity;

import com.example.order.model.enums.ProductCategory;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

/**
 * ProcessedProduce extends Product (Inheritance & Polymorphism).
 * Models artisanal farm-processed goods like pure honey, cold-pressed oils, flours.
 */
@Entity
@DiscriminatorValue("PROCESSED")
public class ProcessedProduce extends Product {

    @Column(name = "processing_method")
    private String processingMethod;

    @NotNull(message = "Packaging date is required")
    @Column(name = "packaging_date")
    private LocalDate packagingDate;

    @Min(value = 1, message = "Shelf life months must be positive")
    @Column(name = "shelf_life_months")
    private int shelfLifeMonths;

    @Column(name = "certification_standard")
    private String certificationStandard;

    public ProcessedProduce() {
        super();
    }

    public ProcessedProduce(String name, String description, ProductCategory category, String unit,
                            BigDecimal basePrice, int stockQuantity, Farmer farmer,
                            String processingMethod, LocalDate packagingDate, int shelfLifeMonths,
                            String certificationStandard) {
        super(name, description, category, unit, basePrice, stockQuantity, farmer);
        this.processingMethod = processingMethod;
        this.packagingDate = packagingDate;
        this.shelfLifeMonths = shelfLifeMonths;
        this.certificationStandard = certificationStandard;
    }

    @Override
    public BigDecimal calculateEffectivePrice() {
        return getBasePrice().setScale(2, RoundingMode.HALF_UP);
    }

    @Override
    public String getProduceTypeDescription() {
        return "Artisanal Processed (" + processingMethod + ", Standard: " + certificationStandard + ")";
    }

    @Override
    public boolean isClearanceDiscountApplied() {
        return false;
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

    public int getShelfLifeMonths() {
        return shelfLifeMonths;
    }

    public void setShelfLifeMonths(int shelfLifeMonths) {
        this.shelfLifeMonths = shelfLifeMonths;
    }

    public String getCertificationStandard() {
        return certificationStandard;
    }

    public void setCertificationStandard(String certificationStandard) {
        this.certificationStandard = certificationStandard;
    }
}
