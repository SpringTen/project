package com.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.OrderInfo;
import com.model.SkingInfo;
import com.model.UserInfo;
import com.service.IOrderService;
import com.service.IShopService;
import com.service.ISkingService;
import com.service.IUserService;
import com.util.Page;
import com.util.SendEmail;

@Controller
@RequestMapping(value="orderController")
public class OrderController {

	@Autowired
	private IOrderService orderService;
	@Autowired
	private IUserService userService;
	@Autowired
	private IShopService shopService;
	@Autowired
	private ISkingService skingService;
	
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String name,String phone,int page,int rows){
		return orderService.findPage(name, phone, page, rows);
	}
	
	@RequestMapping(value="toOrderOut")
	public String toOrderOut(int id,Model model){
		model.addAttribute("order", orderService.findOne(id));
		return "orderOut";
	}
	
	@RequestMapping(value="orderOut")
	public String orderOut(int id,int orderId,int count){
		skingService.countReduce(count, id);
		orderService.orderStatusUpdate(orderId, "未归还");
		return "orderList";
	}
	
	@RequestMapping(value="toOrderIn")
	public String toOrderIn(int id,Model model){
		model.addAttribute("order", orderService.findOne(id));
		return "orderIn";
	}
	
	@RequestMapping(value="orderIn")
	public String orderIn(int id,int orderId,int count){
		skingService.countReduce(count, id);
		orderService.orderStatusUpdate(orderId, "已归还");
		return "orderList";
	}
	
	@ResponseBody
	@RequestMapping(value="findBySking")
	public List<OrderInfo> findBySking(int id) {
		return orderService.findBySking(id);
	}
	
	@RequestMapping(value="orderAdd")
	public String orderAdd(String shopIds,String skingIds,String counts,String costs,String starts,String ends,HttpSession session,Model model) throws ParseException {
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");//小写的mm表示的是分钟  
		SimpleDateFormat sdf1=new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");//小写的mm表示的是分钟 
		UserInfo user=(UserInfo)session.getAttribute("user");
		String[] skingIds_=skingIds.split(",");
		String[] counts_=counts.split(",");
		String[] costs_=costs.split(",");
		String[] starts_=starts.split(",");
		String[] ends_=ends.split(",");
		int total=0;
		for(int i=0;i<skingIds_.length;i++){
			total=total+Integer.parseInt(costs_[i]);
			OrderInfo order=new OrderInfo();
			SkingInfo sking=new SkingInfo();
			sking.setSkingId(Integer.parseInt(skingIds_[i]));
			order.setSking(sking);
			order.setOrderCount(Integer.parseInt(counts_[i]));
			order.setOrderCost(Integer.parseInt(costs_[i]));
			order.setStartDate(sdf.parse(starts_[i]));
			order.setEndDate(sdf.parse(ends_[i]));
			order.setUser(user);
			order.setOrderDate(new Date());
			order.setOrderStatus("未出货");
			orderService.orderAdd(order);
		}
		String message=user.getUserName()+"，恭喜你在"+sdf1.format(new Date())+"成功预定了以下商品：\n";
		for(int i=0;i<skingIds_.length;i++){
			SkingInfo sking=skingService.findOne(Integer.parseInt(skingIds_[i]));
			message+=sking.getSkingName()+","+counts_[i]+"个,"+sdf.format(sdf.parse(starts_[i]))+"至"+sdf.format(sdf.parse(ends_[i]))+"\n";
		}
		SendEmail.sendMsg(user.getUserEmail(), message);
		userService.moneyReduce(total, user.getUserId());
		String[] ids=shopIds.split(",");
		for(int i=0;i<ids.length;i++){
			shopService.deleteById(Integer.parseInt(ids[i]));
		}
		model.addAttribute("orderList", orderService.findByUser(user.getUserId()));
		return "redirect:/newsController/toIndex";
	}
	
	@RequestMapping(value="userDeleteById")
	public String userDeleteById(int id,HttpSession session,Model model){
		orderService.deleteById(id);
		UserInfo user=(UserInfo)session.getAttribute("user");
		model.addAttribute("orderList", orderService.findByUser(user.getUserId()));
		return "orderInfo";
	}
	
	
	@ResponseBody
	@RequestMapping(value="findRecent")
	public int findRecent(int id, Date start){
		return orderService.findRecent(id, start);
	}
	
	
	@RequestMapping(value="getMyOrderList")
	public String getMyOrderList(int userId,Integer pageNum, Model model){
		Page page = orderService.findPage_(userId, pageNum, 4);
		model.addAttribute("orderList",page.getRows());
		int total = Integer.parseInt(page.getTotal());
		int all = 0;
		if(total%4==0)
			all=total/4;
		else 
			all=total/4+1;
		model.addAttribute("all", all);
		model.addAttribute("pageNum", pageNum);
		return "orderInfo";
	}
	@InitBinder  
    public void initBinder(WebDataBinder b) {  
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");  
        b.registerCustomEditor(Date.class, new CustomDateEditor(df, true));   
    }
}
