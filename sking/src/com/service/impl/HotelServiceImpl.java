package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.mapper.HotelInfoMapper;
import com.model.HotelInfo;
import com.service.IHotelService;
import com.util.Page;

@Service("hotelService")
public class HotelServiceImpl implements IHotelService{

	@Autowired
	private HotelInfoMapper hotelMapper;

	public Page findList(String name, int pageNum, int pageSize) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("name", "%"+name+"%");
		Page page=new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(hotelMapper.findList(map));
		page.setTotal(hotelMapper.findCount(map)+"");
		return page;
	}

	public HotelInfo findOne(int id) {
		return hotelMapper.findOne(id);
	}

	public void hotelAdd(HotelInfo hotel) {
		hotelMapper.hotelAdd(hotel);
	}

	public void hotelUpdate(HotelInfo hotel) {
		hotelMapper.hotelUpdate(hotel);
	}

	public void deleteById(int id) {
		hotelMapper.deleteById(id);
	}

	@Override
	public List<HotelInfo> findAll() {
		Map<String,String> map=new HashMap<String,String>();
		map.put("name", "%%");
		return hotelMapper.findList(map);
	}
}
