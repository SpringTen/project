package com.service;

import java.util.List;

import com.model.TypeInfo;
import com.util.Page;

public interface ITypeService {
	Page findPage(String name,int pageNum,int pageSize);
	void typeAdd(TypeInfo type);
	void deleteById(int id);
	TypeInfo findOne(int id);
    void typeUpdate(TypeInfo type);
    List<TypeInfo> loadAll();
}
