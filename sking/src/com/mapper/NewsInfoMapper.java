package com.mapper;

import java.util.List;
import java.util.Map;

import com.model.NewsInfo;

public interface NewsInfoMapper {
    List<NewsInfo> findList(Map<String,String> map);
    int findCount(Map<String,String> map);
    NewsInfo findOne(int id);
    void newsAdd(NewsInfo news);
    void newsUpdate(NewsInfo news);
    void deleteById(int id);
    List<NewsInfo> findTop();
}