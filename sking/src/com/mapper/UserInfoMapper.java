package com.mapper;

import java.util.List;
import java.util.Map;
import com.model.UserInfo;

public interface UserInfoMapper {
	List<UserInfo> findList(Map<String,String> map);
	int findCount(Map<String,String> map);
	void deleteById(int id);
	UserInfo userLogin(String name);
	void userAdd(UserInfo user);
	void moneyAdd(Map<String,Integer> map);
	void moneyReduce(Map<String,Integer> map);
	void userUpdateById(UserInfo userInfo);
	UserInfo userInfoById(int userId);
}