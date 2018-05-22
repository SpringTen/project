package com.mapper;

import java.util.List;
import java.util.Map;

import com.model.HotelInfo;

public interface HotelInfoMapper {
    List<HotelInfo> findList(Map<String,String> map);
    int findCount(Map<String,String> map);
    HotelInfo findOne(int id);
    void hotelAdd(HotelInfo hotel);
    void hotelUpdate(HotelInfo hotel);
    void deleteById(int id);
}