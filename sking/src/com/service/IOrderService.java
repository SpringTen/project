package com.service;


import java.util.Date;
import java.util.List;

import com.model.OrderInfo;
import com.util.Page;

public interface IOrderService {
	Page findPage(String name,String phone,int pageNum,int pageSize);
	Page findPage_(int userId,int pageNum,int pageSize);
    OrderInfo findOne(int id);
    void orderAdd(OrderInfo order);
    void orderStatusUpdate(int id,String status);
    void deleteById(int id);
    List<OrderInfo> findBySking(int id);
    int findRecent(int id,Date start);
    List<OrderInfo> findByUser(int id);
    List<OrderInfo> getMyOrderList(int userId);
    
}
