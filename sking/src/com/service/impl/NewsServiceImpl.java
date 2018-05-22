package com.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.mapper.NewsInfoMapper;
import com.model.NewsInfo;
import com.service.INewsService;
import com.util.Page;

@Service("newsService")
public class NewsServiceImpl implements INewsService{

	@Autowired
	private NewsInfoMapper newsMapper;

	public Page findPage(String title, int pageNum, int pageSize) {
		Map<String,String> map=new HashMap<String,String>();
		map.put("title", "%"+title+"%");
		Page page=new Page();
		PageHelper.startPage(pageNum, pageSize);
		page.setRows(newsMapper.findList(map));
		page.setTotal(newsMapper.findCount(map)+"");
		return page;
	}

	public NewsInfo findOne(int id) {
		return newsMapper.findOne(id);
	}

	public void newsAdd(NewsInfo news) {
		newsMapper.newsAdd(news);
	}

	public void newsUpdate(NewsInfo news) {
		newsMapper.newsUpdate(news);
	}

	public void deleteById(int id) {
		newsMapper.deleteById(id);
	}

	@Override
	public List<NewsInfo> findTop() {
		return newsMapper.findTop();
	}
	
}
