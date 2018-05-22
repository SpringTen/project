package com.service;

import java.util.List;
import com.model.SkingInfo;
import com.util.Page;

public interface ISkingService {
	Page findPage(String name,int type,int pageNum,int pageSize);
    SkingInfo findOne(int id);
    void skingAdd(SkingInfo sking);
    void skingUpdate(SkingInfo sking);
    void deleteById(int id);
    List<SkingInfo> findTop();
    void countReduce(int count,int id);
}
