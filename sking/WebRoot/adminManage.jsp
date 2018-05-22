<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>后台</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link rel="stylesheet" href="css/pintuer.css">
    <link rel="stylesheet" href="css/admin.css">
	<script src="js/jquery.js"></script>
	
  </head>
  
  <body style="background-color:#f2f9fd;">

<div class="leftnav" style="width: 500px;">
  <div class="leftnav-title"><strong><span class="icon-list"></span>菜单列表</strong></div> 
  <h2><a href="userList.jsp" target="right"><span class="icon-pencil-square-o"></span>用户管理</a></h2>
  <li></li>
  <h2><a href="typeList.jsp" target="right"><span class="icon-pencil-square-o"></span>类型管理</a></h2>
  <li></li>
  <h2><a href="skingList.jsp" target="right"><span class="icon-pencil-square-o"></span>雪具管理</a></h2>
  <li></li>
  <h2><a href="hotelList.jsp" target="right"><span class="icon-pencil-square-o"></span>酒店管理</a></h2>
  <li></li>
  <h2><a href="newsList.jsp" target="right"><span class="icon-pencil-square-o"></span>新闻管理</a></h2>
  <li></li>
  <h2><a href="orderList.jsp" target="right"><span class="icon-pencil-square-o"></span>订单管理</a></h2>
  <li></li>
  <h2><a href="messageList.jsp" target="right"><span class="icon-pencil-square-o"></span>留言管理</a></h2>
  <li></li>
</div>
<script type="text/javascript">
$(function(){
  $(".leftnav h2").click(function(){
	  $(this).next().slideToggle(200);	
	  $(this).toggleClass("on"); 
  })
  $(".leftnav ul li a").click(function(){
	    $("#a_leader_txt").text($(this).text());
  		$(".leftnav ul li a").removeClass("on");
		$(this).addClass("on");
  })
});
</script>
<ul class="bread">
  

</ul>
<div class="admin" style="top: 120px;">
  <iframe scrolling="auto" rameborder="0" src="userList.jsp" name="right" width="100%" height="100%"></iframe>
</div>
<div style="text-align:center;">

</div>
</body>
</html>
