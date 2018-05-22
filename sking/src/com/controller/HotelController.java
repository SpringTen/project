package com.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import com.model.HotelInfo;
import com.service.IHotelService;
import com.util.Page;
import com.util.PathUtils;

@Controller
@RequestMapping(value="hotelController")
public class HotelController {

	@Autowired
	private IHotelService hotelService;
	
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String name,int page,int rows){
		return hotelService.findList(name, page, rows);
	}
	
	@RequestMapping(value="hotelAdd")
	public String hotelAdd(MultipartFile file,HotelInfo hotel){
		if (!file.getOriginalFilename().equals("")) {
			String type = file.getOriginalFilename().substring(
					file.getOriginalFilename().lastIndexOf("."));
			String destName = new Date().getTime() + type;
			File dest = new File(PathUtils.IMAGE_PATH + destName);
			try {
				file.transferTo(dest);
			} catch (IOException e) {
				System.out.println("error");
			}
			hotel.setHotelImage(destName);	
		}
		hotelService.hotelAdd(hotel);
		return "hotelList";
	}
	
	@RequestMapping(value="findOne")
	public String findOne(int id,Model model){
		model.addAttribute("hotel", hotelService.findOne(id));
		return "hotelUpdate";
	}
	
	@RequestMapping(value="hotelUpdate")
	public String hotelUpdate(MultipartFile file,HotelInfo hotel){
		if (!file.getOriginalFilename().equals("")) {
			String type = file.getOriginalFilename().substring(
					file.getOriginalFilename().lastIndexOf("."));
			String destName = new Date().getTime() + type;
			File dest = new File(PathUtils.IMAGE_PATH + destName);
			try {
				file.transferTo(dest);
			} catch (IOException e) {
				System.out.println("error");
			}
			hotel.setHotelImage(destName);
		}
		hotelService.hotelUpdate(hotel);
		return "hotelList";
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id){
		hotelService.deleteById(id);
		return "hotelList";
	}
	
	@ResponseBody
	@RequestMapping(value="findAll")
	public List<HotelInfo> findAll(){
		return hotelService.findAll();
	}
	
	@RequestMapping(value="findAllList")
	public String findAllList(int pageNum, Model model){
		Page page = hotelService.findList("", pageNum, 4);
		model.addAttribute("hotelList", page.getRows());
		int total = Integer.parseInt(page.getTotal());
		int all=0;
		if(total%4==0){
			all=total/4;
		}else {
			all=total/4+1;
		}
		model.addAttribute("all", all);
		model.addAttribute("pageNum", pageNum);
		return "hotelMap";
	}
	@RequestMapping(value="findHotelById")
	public String findHotelById(int id,Model model){
		model.addAttribute("hotelInfo", hotelService.findOne(id));
		return "hotelMapLine";
	}
}
