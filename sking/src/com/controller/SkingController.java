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

import com.model.SkingInfo;
import com.model.TypeInfo;
import com.service.ISkingService;
import com.service.ITypeService;
import com.util.Page;
import com.util.PathUtils;

@Controller
@RequestMapping(value="skingController")
public class SkingController {

	@Autowired
	private ISkingService skingService;
	@Autowired
	private ITypeService typeService;
	
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String name,int type,int page,int rows){
		return skingService.findPage(name, type, page, rows);
	}
	
	@ResponseBody
	@RequestMapping(value="loadTypes")
	public List<TypeInfo> loadTypes(){
		return typeService.loadAll();
	}
	
	@RequestMapping(value="toSkingAdd")
	public String toSkingUpdate(Model model){
		model.addAttribute("typeList", typeService.loadAll());
		return "skingAdd";
	}
	
	@RequestMapping(value="skingAdd")
	public String skingAdd(MultipartFile file,SkingInfo sking){
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
			sking.setSkingImage(destName);	
		}
		skingService.skingAdd(sking);
		return "skingList";
	}
	
	@RequestMapping(value="findOne")
	public String findOne(int id,Model model){
		model.addAttribute("sking", skingService.findOne(id));
		model.addAttribute("typeList", typeService.loadAll());
		return "skingUpdate";
	}
	
	@RequestMapping(value="skingUpdate")
	public String skingUpdate(MultipartFile file,SkingInfo sking){
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
			sking.setSkingImage(destName);	
		}
		skingService.skingUpdate(sking);
		return "skingList";
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id){
		skingService.deleteById(id);
		return "skingList";
	}
	
	@RequestMapping(value="toProducts")
	public String toProducts(int type,int pageNum,Model model){
		Page page=skingService.findPage("", type, pageNum, 8);
		model.addAttribute("skingList", page.getRows());
		int total=Integer.parseInt(page.getTotal());
		int all=0;
		if(total%8==0){
			all=total/8;
		}else{
			all=(total/8)+1;
		}
		model.addAttribute("pageNum", pageNum);
		model.addAttribute("all", all);
		model.addAttribute("type", type);
		return "products";
	}
}
