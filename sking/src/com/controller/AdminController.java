package com.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.AdminInfo;
import com.service.IAdminService;

@Controller
@RequestMapping(value="adminController")
public class AdminController {

	@Autowired
	private IAdminService adminService;
	
	@ResponseBody
	@RequestMapping(value="adminLogin")
	public int adminLogin(String name,String pwd,HttpSession session){
		AdminInfo admin=adminService.adminLogin(name);
		if(null==admin){
			return 0;	//用户名不存在
		}else if(admin.getAdminPwd().equals(pwd)){
			session.setAttribute("admin", admin);
			return 1;	//登录成功
		}else{
			return 2;	//密码错误
		}
	}
}
