package com.mapper;

import java.util.List;
import java.util.Map;

import com.model.SkingInfo;

public interface SkingInfoMapper {
    List<SkingInfo> findList(Map<String,Object> map);
    int findCount(Map<String,Object> map);
    SkingInfo findOne(int id);
    void skingAdd(SkingInfo sking);
    void skingUpdate(SkingInfo sking);
    void deleteById(int id);
    List<SkingInfo> findTop();
    void countReduce(Map<String, Integer> map);
}