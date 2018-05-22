package com.mapper;

import java.util.List;
import java.util.Map;
import com.model.ShopInfo;

public interface ShopInfoMapper {
	List<ShopInfo> findList(Map<String,Object> map);
    int findCount(Map<String,Object> map);
    List<ShopInfo> findByUser(int id);
    void deleteById(int id);
    void shopAdd(ShopInfo shop);
}