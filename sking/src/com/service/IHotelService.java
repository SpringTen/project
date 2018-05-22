package com.service;


import java.util.List;

import com.model.HotelInfo;
import com.util.Page;

public interface IHotelService {
	Page findList(String name,int pageNum,int pageSize);
    HotelInfo findOne(int id);
    void hotelAdd(HotelInfo hotel);
    void hotelUpdate(HotelInfo hotel);
    void deleteById(int id);
    List<HotelInfo> findAll();
}
