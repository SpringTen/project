package com.service;


import com.model.UserInfo;
import com.util.Page;

public interface IUserService {
	Page findList(String name,String email,int pageNum,int pageSize);
	void deleteById(int id);
	UserInfo userLogin(String name);
	void userAdd(UserInfo user);
	void moneyAdd(int money,int id);
	void moneyReduce(int money,int id);
	void userUpdateById(UserInfo userInfo);
	UserInfo userInfoById(int userId);
}
