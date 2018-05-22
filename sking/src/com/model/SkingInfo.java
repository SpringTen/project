package com.model;

public class SkingInfo {
    private Integer skingId;
    private String skingName;
    private TypeInfo type;
    private String skingBrief;
    private String skingImage;
    private Integer skingCost;
    private Integer skingCount;

    public Integer getSkingId() {
        return skingId;
    }

    public void setSkingId(Integer skingId) {
        this.skingId = skingId;
    }

    public String getSkingName() {
        return skingName;
    }

    public void setSkingName(String skingName) {
        this.skingName = skingName == null ? null : skingName.trim();
    }
    
    public TypeInfo getType() {
		return type;
	}

	public void setType(TypeInfo type) {
		this.type = type;
	}

	public String getSkingBrief() {
        return skingBrief;
    }

    public void setSkingBrief(String skingBrief) {
        this.skingBrief = skingBrief == null ? null : skingBrief.trim();
    }

    public String getSkingImage() {
        return skingImage;
    }

    public void setSkingImage(String skingImage) {
        this.skingImage = skingImage == null ? null : skingImage.trim();
    }

    public Integer getSkingCost() {
        return skingCost;
    }

    public void setSkingCost(Integer skingCost) {
        this.skingCost = skingCost;
    }

    public Integer getSkingCount() {
        return skingCount;
    }

    public void setSkingCount(Integer skingCount) {
        this.skingCount = skingCount;
    }
}