package com.model;

import java.util.Date;

public class ShopInfo {
    private Integer shopId;
    private UserInfo user;
    private SkingInfo sking;
    private Date startDate;
    private Date endDate;
    private Date shopDate;

    public Integer getShopId() {
        return shopId;
    }

    public void setShopId(Integer shopId) {
        this.shopId = shopId;
    }

    public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	public SkingInfo getSking() {
		return sking;
	}

	public void setSking(SkingInfo sking) {
		this.sking = sking;
	}

	public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getShopDate() {
        return shopDate;
    }

    public void setShopDate(Date shopDate) {
        this.shopDate = shopDate;
    }
}