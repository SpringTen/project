package com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.model.TypeInfo;
import com.service.ITypeService;
import com.util.Page;

@Controller
@RequestMapping(value="typeController")
public class TypeController {

	@Autowired
	private ITypeService typeService;
	
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String name,int page,int rows){
		return typeService.findPage(name, page, rows);
	}
	
	@RequestMapping(value="typeAdd")
	public String typeAdd(TypeInfo type){
		typeService.typeAdd(type);
		return "typeList";
	}
	
	@RequestMapping(value="findOne")
	public String fidnOne(int id,Model model){
		model.addAttribute("type", typeService.findOne(id));
		return "typeUpdate";
	}
	
	@RequestMapping(value="typeUpdate")
	public String typeUpdate(TypeInfo type){
		typeService.typeUpdate(type);
		return "typeList";
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id){
		typeService.deleteById(id);
		return "typeList";
	}
}
