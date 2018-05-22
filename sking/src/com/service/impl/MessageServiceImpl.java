package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.util.StringUtil;
import com.mapper.MessageInfoMapper;
import com.model.MessageInfo;
import com.service.IMessageService;
import com.util.Page;

@Service(value="messageService")
public class MessageServiceImpl implements IMessageService {
	
	@Autowired
	private MessageInfoMapper messageInfoMapper;
	
	@Override
	public void contactAdmin(MessageInfo messageInfo) {
		messageInfoMapper.contactAdmin(messageInfo);
	}

	@Override
	public List<MessageInfo> myMessageById(int id) {
		return messageInfoMapper.myMessageById(id);
	}

	@Override
	public void deleteMyMessageById(int id) {
		messageInfoMapper.deleteMyMessageById(id);
	}

	@Override
	public Page findList(String userName, int pageNum, int pageSize) {
		Page page=new Page();
		Map<String,String> map=new HashMap<String,String>();
		if(StringUtil.isNotEmpty(userName)){
			map.put("userName", "%"+userName+"%");
		}
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(messageInfoMapper.findList(map));
		page.setTotal(messageInfoMapper.findCount(map)+"");
		return page;
	}

	@Override
	public MessageInfo findOne(int id) {
		return messageInfoMapper.findOne(id);
	}

	@Override
	public void messUpdate(String messBack, int adminId, int id) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("messBack", messBack);
		map.put("adminId", adminId);
		map.put("id", id);
		messageInfoMapper.messUpdate(map);
	}
}
