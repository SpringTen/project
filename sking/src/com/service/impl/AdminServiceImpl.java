package com.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mapper.AdminInfoMapper;
import com.model.AdminInfo;
import com.service.IAdminService;



@Service("adminService")
public class AdminServiceImpl implements IAdminService{

	@Autowired
	private AdminInfoMapper adminMapper;

	public AdminInfo adminLogin(String name) {
		return adminMapper.adminLogin(name);
	}
	
}
