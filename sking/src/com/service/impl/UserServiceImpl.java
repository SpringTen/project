package com.service.impl;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.pagehelper.PageHelper;
import com.mapper.UserInfoMapper;
import com.model.UserInfo;
import com.service.IUserService;
import com.util.Page;

@Service("userService")
public class UserServiceImpl implements IUserService{

	@Autowired
	private UserInfoMapper userMapper;
	/**
	 * userList
	 */
	public Page findList(String name, String email,int pageNum,int pageSize) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("name", "%"+name+"%");
		map.put("email", "%"+email+"%");
		Page page=new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(userMapper.findList(map));
		page.setTotal(userMapper.findCount(map)+"");
		return page;
	}

	public void deleteById(int id) {
		userMapper.deleteById(id);
	}

	@Override
	public UserInfo userLogin(String name) {
		return userMapper.userLogin(name);
	}

	@Override
	public void userAdd(UserInfo user) {
		userMapper.userAdd(user);
	}

	@Override
	public void moneyAdd(int money, int id) {
		Map<String,Integer> map=new HashMap<String,Integer>();
		map.put("money", money);
		map.put("id", id);
		userMapper.moneyAdd(map);
	}

	@Override
	public void moneyReduce(int money, int id) {
		Map<String,Integer> map=new HashMap<String,Integer>();
		map.put("money", money);
		map.put("id", id);
		userMapper.moneyReduce(map);
		
	}

	@Override
	public void userUpdateById(UserInfo userInfo) {
		userMapper.userUpdateById(userInfo);
	}

	@Override
	public UserInfo userInfoById(int userId) {
		return userMapper.userInfoById(userId);
	}

}
