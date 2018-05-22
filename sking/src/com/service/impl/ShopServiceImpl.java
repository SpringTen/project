package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.mapper.ShopInfoMapper;
import com.model.ShopInfo;
import com.service.IShopService;
import com.util.Page;

@Service("shopService")
public class ShopServiceImpl implements IShopService{
	
	@Autowired
	private ShopInfoMapper shopMapper;

	@Override
	public List<ShopInfo> findByUser(int id) {
		return shopMapper.findByUser(id);
	}

	@Override
	public void deleteById(int id) {
		shopMapper.deleteById(id);
	}

	@Override
	public void shopAdd(ShopInfo shop) {
		shopMapper.shopAdd(shop);
	}

	@Override
	public Page findPage(int userId, int pageNum, int pageSize) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		Page page = new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(shopMapper.findList(map));
		page.setTotal(shopMapper.findCount(map)+"");
		return page;
	}
	
}
