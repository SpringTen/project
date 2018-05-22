package com.model;

import java.util.Date;

public class OrderInfo {
    private Integer orderId;
    private UserInfo user;
    private SkingInfo sking;
    private Integer orderCount;
    private Integer orderCost;
    private Date startDate;
    private Date endDate;
    private Date orderDate;
    private String orderStatus;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
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

	public Integer getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Integer orderCount) {
        this.orderCount = orderCount;
    }

    public Integer getOrderCost() {
        return orderCost;
    }

    public void setOrderCost(Integer orderCost) {
        this.orderCost = orderCost;
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

    public Date getOrderDate() {
        return orderDate;
    }

    public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }
}