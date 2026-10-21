package com.example.order.dto;

import com.example.order.model.entity.PerishableProduce;
import com.example.order.model.entity.ProcessedProduce;
import com.example.order.model.entity.Product;
import com.example.order.model.enums.ProductCategory;
import java.math.BigDecimal;
import java.time.LocalDate;

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private ProductCategory category;
    private String unit;
    private BigDecimal basePrice;
    private BigDecimal effectivePrice;
    private boolean clearanceDiscountApplied;
    private int stockQuantity;
    private String produceType;
    private String typeDescription;

    // Farmer Info
    private Long farmerId;
    private String farmerName;
    private String farmLocation;
    private boolean organicCertified;

    // Perishable Produce Details
    private LocalDate harvestDate;
    private Integer shelfLifeDays;
    private Long remainingShelfLifeDays;
    private Boolean coldStorageRequired;
    private String freshnessGrade;

    // Processed Produce Details
    private String processingMethod;
    private LocalDate packagingDate;
    private Integer shelfLifeMonths;
    private String certificationStandard;

    public ProductResponse() {
    }

    public static ProductResponse fromEntity(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCategory(product.getCategory());
        dto.setUnit(product.getUnit());
        dto.setBasePrice(product.getBasePrice());
        dto.setEffectivePrice(product.calculateEffectivePrice());
        dto.setClearanceDiscountApplied(product.isClearanceDiscountApplied());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setTypeDescription(product.getProduceTypeDescription());

        if (product.getFarmer() != null) {
            dto.setFarmerId(product.getFarmer().getId());
            dto.setFarmerName(product.getFarmer().getName());
            dto.setFarmLocation(product.getFarmer().getFarmLocation());
            dto.setOrganicCertified(product.getFarmer().isOrganicCertified());
        }

        if (product instanceof PerishableProduce perishable) {
            dto.setProduceType("PERISHABLE");
            dto.setHarvestDate(perishable.getHarvestDate());
            dto.setShelfLifeDays(perishable.getShelfLifeDays());
            dto.setRemainingShelfLifeDays(perishable.getRemainingShelfLifeDays());
            dto.setColdStorageRequired(perishable.isColdStorageRequired());
            dto.setFreshnessGrade(perishable.getFreshnessGrade());
        } else if (product instanceof ProcessedProduce processed) {
            dto.setProduceType("PROCESSED");
            dto.setProcessingMethod(processed.getProcessingMethod());
            dto.setPackagingDate(processed.getPackagingDate());
            dto.setShelfLifeMonths(processed.getShelfLifeMonths());
            dto.setCertificationStandard(processed.getCertificationStandard());
        }

        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public BigDecimal getEffectivePrice() {
        return effectivePrice;
    }

    public void setEffectivePrice(BigDecimal effectivePrice) {
        this.effectivePrice = effectivePrice;
    }

    public boolean isClearanceDiscountApplied() {
        return clearanceDiscountApplied;
    }

    public void setClearanceDiscountApplied(boolean clearanceDiscountApplied) {
        this.clearanceDiscountApplied = clearanceDiscountApplied;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getProduceType() {
        return produceType;
    }

    public void setProduceType(String produceType) {
        this.produceType = produceType;
    }

    public String getTypeDescription() {
        return typeDescription;
    }

    public void setTypeDescription(String typeDescription) {
        this.typeDescription = typeDescription;
    }

    public Long getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(Long farmerId) {
        this.farmerId = farmerId;
    }

    public String getFarmerName() {
        return farmerName;
    }

    public void setFarmerName(String farmerName) {
        this.farmerName = farmerName;
    }

    public String getFarmLocation() {
        return farmLocation;
    }

    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }

    public boolean isOrganicCertified() {
        return organicCertified;
    }

    public void setOrganicCertified(boolean organicCertified) {
        this.organicCertified = organicCertified;
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

    public Long getRemainingShelfLifeDays() {
        return remainingShelfLifeDays;
    }

    public void setRemainingShelfLifeDays(Long remainingShelfLifeDays) {
        this.remainingShelfLifeDays = remainingShelfLifeDays;
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
