package com.model;

import java.util.Date;

public class MessageInfo {
    private Integer messId;
    private String messTitle;
    private String messContent;
    private UserInfo user;
    private Date messDate;
    private AdminInfo admin;
    private String messBack;
	public MessageInfo() {
		super();
	}
	public Integer getMessId() {
		return messId;
	}
	public void setMessId(Integer messId) {
		this.messId = messId;
	}
	public String getMessTitle() {
		return messTitle;
	}
	public void setMessTitle(String messTitle) {
		this.messTitle = messTitle;
	}
	public String getMessContent() {
		return messContent;
	}
	public void setMessContent(String messContent) {
		this.messContent = messContent;
	}
	
	public UserInfo getUser() {
		return user;
	}
	public void setUser(UserInfo user) {
		this.user = user;
	}
	public Date getMessDate() {
		return messDate;
	}
	public void setMessDate(Date messDate) {
		this.messDate = messDate;
	}
	public AdminInfo getAdmin() {
		return admin;
	}
	public void setAdmin(AdminInfo admin) {
		this.admin = admin;
	}
	public String getMessBack() {
		return messBack;
	}
	public void setMessBack(String messBack) {
		this.messBack = messBack;
	}
    
}