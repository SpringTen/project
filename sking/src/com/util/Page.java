package com.util;

import java.util.List;
@SuppressWarnings("rawtypes")
public class Page {
	
	private List rows;
	private String page;
	private String total;
	public Page() {
		super();
	}
	public Page(List rows, String page, String total) {
		super();
		this.rows = rows;
		this.page = page;
		this.total = total;
	}
	public List getRows() {
		return rows;
	}
	public void setRows(List rows) {
		this.rows = rows;
	}
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	
}
