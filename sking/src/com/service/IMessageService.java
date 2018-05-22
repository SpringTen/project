package com.service;

import java.util.List;

import com.model.MessageInfo;
import com.util.Page;

public interface IMessageService {
	void contactAdmin(MessageInfo messageInfo);
	List<MessageInfo> myMessageById(int id);
	void deleteMyMessageById(int id);
	Page findList(String userName,int pageNum,int pageSize);
	MessageInfo findOne(int id);
	void messUpdate(String messBack,int adminId,int id);
}
