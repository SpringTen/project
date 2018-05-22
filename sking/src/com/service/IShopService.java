package com.service;

import java.util.List;

import com.model.ShopInfo;
import com.util.Page;

public interface IShopService {
	Page findPage(int userId,int pageNum,int pageSize);
	List<ShopInfo> findByUser(int id);
    void deleteById(int id);
    void shopAdd(ShopInfo shop);
    
}
