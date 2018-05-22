package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.mapper.TypeInfoMapper;
import com.model.TypeInfo;
import com.service.ITypeService;
import com.util.Page;

@Service("typeService")
public class TypeServiceImpl implements ITypeService{

	@Autowired
	private TypeInfoMapper typeMapper;

	public Page findPage(String name, int pageNum, int pageSize) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("name", "%"+name+"%");
		Page page=new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(typeMapper.findList(map));
		page.setTotal(typeMapper.findList(map)+"");
		return page;
	}

	public void typeAdd(TypeInfo type) {
		typeMapper.typeAdd(type);
	}

	public void deleteById(int id) {
		typeMapper.deleteById(id);
	}

	public TypeInfo findOne(int id) {
		return typeMapper.findOne(id);
	}

	public void typeUpdate(TypeInfo type) {
		typeMapper.typeUpdate(type);
	}

	public List<TypeInfo> loadAll() {
		return typeMapper.loadAll();
	}
	
	
}
