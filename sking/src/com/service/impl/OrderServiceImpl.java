package com.service.impl;

/*import java.text.DateFormat;
import java.text.SimpleDateFormat;*/
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*import javax.servlet.http.HttpSession;*/
import org.springframework.beans.factory.annotation.Autowired;
/*import org.springframework.beans.propertyeditors.CustomDateEditor;*/
import org.springframework.stereotype.Service;
/*import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;*/



import com.github.pagehelper.PageHelper;
import com.mapper.OrderInfoMapper;
import com.model.OrderInfo;
/*import com.model.UserInfo;*/
import com.service.IOrderService;
import com.util.Page;

@Service("orderService")
public class OrderServiceImpl implements IOrderService{
	
	@Autowired
	private OrderInfoMapper orderMapper;

	public Page findPage(String name, String phone, int pageNum, int pageSize) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("name", "%"+name+"%");
		map.put("phone", "%"+phone+"%");
		Page page = new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(orderMapper.findList(map));
		page.setTotal(orderMapper.findCount(map)+"");
		return page;
	}

	public OrderInfo findOne(int id) {
		return orderMapper.findOne(id);
	}

	public void orderAdd(OrderInfo order) {
		orderMapper.orderAdd(order);
	}

	public void orderStatusUpdate(int id, String status) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("id", id);
		map.put("status", status);
		orderMapper.orderStatusUpdate(map);	
	}

	public void deleteById(int id) {
		orderMapper.deleteById(id);
	}

	@Override
	public List<OrderInfo> findBySking(int id) {
		return orderMapper.findBySking(id);
	}

	@Override
	public int findRecent(int id, Date start) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("id", id);
		map.put("start", start);
		int result=0;
		try {
			result=orderMapper.findRecent(map);
		} catch (Exception e) {
			result=0;
		}
		return result;
	}

	@Override
	public List<OrderInfo> findByUser(int id) {
		return orderMapper.findByUser(id);
	}

	@Override
	public List<OrderInfo> getMyOrderList(int userId) {
		return orderMapper.getMyOrderList(userId);
	}

	@Override
	public Page findPage_(int userId, int pageNum, int pageSize) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("userId", userId);
		Page page = new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(orderMapper.findPageList(map));
		page.setTotal(orderMapper.findPageCount(map)+"");
		return page;
	}
	
}
