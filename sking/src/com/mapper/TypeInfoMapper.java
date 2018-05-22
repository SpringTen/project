package com.mapper;

import java.util.List;
import java.util.Map;

import com.model.TypeInfo;

public interface TypeInfoMapper {
    List<TypeInfo> findList(Map<String,String> map);
    int findCount(Map<String,String> map);
    void typeAdd(TypeInfo type);
    void deleteById(int id);
    TypeInfo findOne(int id);
    void typeUpdate(TypeInfo type);
    List<TypeInfo> loadAll();
}