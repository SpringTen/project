package com.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.AdminInfo;
import com.model.MessageInfo;
import com.model.UserInfo;
import com.service.IMessageService;
import com.util.Page;

@Controller
@RequestMapping(value="messageController")
public class MessageController {
	
	@Autowired
	private IMessageService messageService;
	
	@RequestMapping(value="contactAdmin")
	public String contactAdmin(MessageInfo messageInfo,HttpSession session){
		UserInfo u = (UserInfo)session.getAttribute("user");
//		int uid = u.getUserId();
		Date date = new Date();
		
		messageInfo.setUser(u);
		messageInfo.setMessDate(date);
		
		AdminInfo admin = new AdminInfo();
		admin.setAdminId(null);
		messageInfo.setAdmin(admin);
		
		messageService.contactAdmin(messageInfo);
		return "redirect:/messageController/myMessageById";
	}
	
	@RequestMapping(value="myMessageById")
	public String myMessageById(Model model,HttpSession session){
		UserInfo userInfo = (UserInfo)session.getAttribute("user");
		int uid = userInfo.getUserId();
		
		List<MessageInfo> messageList = new ArrayList<MessageInfo>();
		messageList = messageService.myMessageById(uid);
		model.addAttribute("messageList", messageList);
		return "contactInfo";
	}
	
	@RequestMapping(value="deleteMyMessageById")
	public String deleteMyMessageById(int id){
		messageService.deleteMyMessageById(id);
		return "redirect:/messageController/myMessageById";
	}
	
	@ResponseBody
	@RequestMapping(value="findList")
	public Page findList(String userName,int page,int rows){
		return messageService.findList(userName, page, rows);
	}
	
	@RequestMapping(value="findOne")
	public String findOne(int id,Model model){
		model.addAttribute("mess", messageService.findOne(id));
		return "messUpdate";
	}
	
	@RequestMapping(value="messUpdate")
	public String messUpdate(MessageInfo mess,HttpSession session){
		AdminInfo admin=(AdminInfo)session.getAttribute("admin");
		messageService.messUpdate(mess.getMessBack(), admin.getAdminId(), mess.getMessId());
		return "messageList";
	}
}
