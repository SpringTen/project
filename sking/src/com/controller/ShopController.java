package com.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.model.ShopInfo;
import com.model.SkingInfo;
import com.model.UserInfo;
import com.service.IShopService;
import com.util.Page;

@Controller()
@RequestMapping(value="shopController")
public class ShopController {

	@Autowired
	private IShopService shopService;
	
	@RequestMapping(value="toCheckout")
	public String toCheckout(int userId, Integer pageNum, Model model,HttpSession session){
		Page page = shopService.findPage(userId, pageNum, 4);
		model.addAttribute("shopList", page.getRows());
		int total = Integer.parseInt(page.getTotal());
		int all = 0;
		if(total%4==0)
			all=total/4;
		else
			all=total/4+1;
		model.addAttribute("all", all);
		model.addAttribute("pageNum", pageNum);
		return "checkout";
	}
	
	@RequestMapping(value="shopAdd")
	public String shopAdd(int skingId,int pageNum,HttpSession session,Model model){
		UserInfo user=(UserInfo)session.getAttribute("user");
		SkingInfo sking=new SkingInfo();
		sking.setSkingId(skingId);
		ShopInfo shop=new ShopInfo();
		shop.setSking(sking);
		shop.setUser(user);
		shop.setShopDate(new Date());
		shopService.shopAdd(shop);
		Page page = shopService.findPage(user.getUserId(), pageNum, 4);
		model.addAttribute("shopList", page.getRows());
		int total = Integer.parseInt(page.getTotal());
		int all = 0;
		if(total%4==0)
			all=total/4;
		else
			all=total/4+1;
		model.addAttribute("all", all);
		model.addAttribute("pageNum", pageNum);
		return "checkout";
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id,HttpSession session,Model model){
		shopService.deleteById(id);
		UserInfo user=(UserInfo)session.getAttribute("user");
		model.addAttribute("shopList", shopService.findByUser(user.getUserId()));
		return "checkout";
	}
}
