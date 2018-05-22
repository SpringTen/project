package com.controller;

import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.model.UserInfo;
import com.service.IUserService;
import com.util.Page;

@Controller
@RequestMapping(value="userController")
public class UserController {
	
	@Autowired
	private IUserService userService;
	/***
	 * 用户列表
	 * @param name
	 * @param email
	 * @param page
	 * @param rows
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String name,String email,int page,int rows){
		return userService.findList(name, email, page, rows);
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id){
		userService.deleteById(id);
		return "userList";
	}
	
	@ResponseBody
	@RequestMapping(value="userLogin")
	public int userLogin(String name,String pwd,HttpSession session){
		UserInfo user=userService.userLogin(name);
		if(null==user){
			return 0;	//用户不存在
		}else if(user.getUserPwd().equals(pwd)){
			session.setAttribute("user", user);
			return 1;	//登录成功
		}else{
			return 2;	//密码错误
		}
	}
	
	@ResponseBody
	@RequestMapping(value="isNormal")
	public int isNormal(String name){
		UserInfo user=userService.userLogin(name);
		if(null==user){
			return 1;	//用户不存在
		}else{
			return 0;	//用户已存在
		}
	}
	
	@RequestMapping(value="userAdd")
	public String userAdd(UserInfo user){
		userService.userAdd(user);
		return "login";
	}
	
	@RequestMapping(value="userUpdateById")
	public String userUpdateById(UserInfo userInfo,HttpSession session){
		UserInfo  u =(UserInfo)session.getAttribute("user");
		int uid =u.getUserId();
		userInfo.setUserId(uid);
		userService.userUpdateById(userInfo);
		return "redirect:/newsController/toIndex";
	}
	
	@RequestMapping(value="userInfo")
	public String userInfo(HttpSession session){
		UserInfo userInfo = (UserInfo)session.getAttribute("user");
		UserInfo user = userService.userInfoById(userInfo.getUserId());
		session.setAttribute("user", user);
		return "userInfo";
	}
	
}
