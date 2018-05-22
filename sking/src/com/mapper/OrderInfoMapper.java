package com.mapper;

import java.util.List;
import java.util.Map;
import com.model.OrderInfo;

public interface OrderInfoMapper {
    List<OrderInfo> findList(Map<String,String> map);
	List<OrderInfo> findPageList(Map<String,Object> map);
	int findPageCount(Map<String,Object> map);
    int findCount(Map<String,String> map);
    OrderInfo findOne(int id);
    void orderAdd(OrderInfo order);
    void orderStatusUpdate(Map<String,Object> map);
    void deleteById(int id);
    List<OrderInfo> findBySking(int id);
    int findRecent(Map<String,Object> map);
    List<OrderInfo> findByUser(int id);
    List<OrderInfo> getMyOrderList(int id);
}