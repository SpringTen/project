package com.service;

import java.util.List;

import com.model.NewsInfo;
import com.util.Page;

public interface INewsService {
	Page findPage(String title,int pageNum,int pageSize);
    NewsInfo findOne(int id);
    void newsAdd(NewsInfo news);
    void newsUpdate(NewsInfo news);
    void deleteById(int id);
    List<NewsInfo> findTop();
}
