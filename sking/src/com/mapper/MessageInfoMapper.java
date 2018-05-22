package com.mapper;

import java.util.List;
import java.util.Map;

import com.model.MessageInfo;

public interface MessageInfoMapper {
	void contactAdmin(MessageInfo messageInfo);
	List<MessageInfo> myMessageById(int id);
	void deleteMyMessageById(int id);
	List<MessageInfo> findList(Map<String, String> map);
	int findCount(Map<String, String> map);
	MessageInfo findOne(int id);
	void messUpdate(Map<String, Object> map);
}