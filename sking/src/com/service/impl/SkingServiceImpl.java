package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.mapper.SkingInfoMapper;
import com.model.SkingInfo;
import com.service.ISkingService;
import com.util.Page;

@Service("skingService")
public class SkingServiceImpl implements ISkingService{

	@Autowired
	private SkingInfoMapper skingMapper;

	public Page findPage(String name, int type,int pageNum,int pageSize) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("name", "%"+name+"%");
		if(type==0){
			map.put("type", null);
		}else{
			map.put("type", type);
		}
		Page page=new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(skingMapper.findList(map));
		page.setTotal(skingMapper.findCount(map)+"");
		return page;
	}

	public SkingInfo findOne(int id) {
		return skingMapper.findOne(id);
	}

	public void skingAdd(SkingInfo sking) {
		skingMapper.skingAdd(sking);
	}

	public void skingUpdate(SkingInfo sking) {
		skingMapper.skingUpdate(sking);
	}

	public void deleteById(int id) {
		skingMapper.deleteById(id);
	}

	@Override
	public List<SkingInfo> findTop() {
		return skingMapper.findTop();
	}

	@Override
	public void countReduce(int count, int id) {
		Map<String, Integer> map=new HashMap<String,Integer>();
		map.put("count", count);
		map.put("id", id);
 		skingMapper.countReduce(map);
	}
}
