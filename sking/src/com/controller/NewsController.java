package com.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.model.NewsInfo;
import com.service.INewsService;
import com.service.ISkingService;
import com.service.ITypeService;
import com.util.Page;
import com.util.PathUtils;

@Controller
@RequestMapping(value="newsController")
public class NewsController {

	@Autowired
	private INewsService newsService;
	@Autowired
	private ISkingService skingService;
	@Autowired
	private ITypeService typeService;
	
	@ResponseBody
	@RequestMapping(value="findPage")
	public Page findPage(String title,int page,int rows){
		return newsService.findPage(title, page, rows);
	}
	
	@RequestMapping(value="newsAdd")
	public String newsAdd(MultipartFile file,NewsInfo news){
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
			news.setNewsImage(destName);	
		}
		news.setNewsDate(new Date());
		newsService.newsAdd(news);
		return "newsList";
	}
	
	@RequestMapping(value="findOne")
	public String findOne(int id,Model model){
		model.addAttribute("news", newsService.findOne(id));
		return "newsUpdate";
	}
	
	@RequestMapping(value="newsUpdate")
	public String newsUpdate(MultipartFile file,NewsInfo news){
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
			news.setNewsImage(destName);	
		}
		newsService.newsUpdate(news);
		return "newsList";
	}
	
	@RequestMapping(value="deleteById")
	public String deleteById(int id){
		newsService.deleteById(id);
		return "newsList";
	}
	
	@ResponseBody
	@RequestMapping(value="findTop")
	public List<NewsInfo> findTop(){
		return newsService.findTop();
	}
	
	@RequestMapping(value="toIndex")
	public String toIndex(Model model,HttpSession session){
		model.addAttribute("newsList", newsService.findTop());
		model.addAttribute("skingList", skingService.findTop());
		session.setAttribute("types", typeService.loadAll());
		return "index";
	}
	
	@RequestMapping(value="toIndex_null")
	public String toIndex_null(Model model,HttpSession session){
		model.addAttribute("newsList", newsService.findTop());
		model.addAttribute("skingList", skingService.findTop());
		session.setAttribute("types", typeService.loadAll());
		session.removeAttribute("user");
		return "index";
	}
}
