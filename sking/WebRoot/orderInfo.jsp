<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">
<title>订单</title>
<link href="css/bootstrap.css" rel="stylesheet" type="text/css"
	media="all" />
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="js/jquery.min.js"></script>
<!-- Custom Theme files -->
<!--theme-style-->
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!--//theme-style-->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords"
	content="Fashion Mania Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design" />
<script type="application/x-javascript">
	
	 addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } 

</script>
<!-- start menu -->
<link href="css/memenu.css" rel="stylesheet" type="text/css" media="all" />
<script type="text/javascript" src="js/memenu.js"></script>
<script>
	$(document).ready(function() {
		$(".memenu").memenu();
	});

	function getTotal(id, price) {
		var start = $('#start' + id).val();
		var end = $('#end' + id).val();
		var startTime = new Date(Date.parse(start.replace(/-/g, "/")))
				.getTime();
		var endTime = new Date(Date.parse(end.replace(/-/g, "/"))).getTime();

		if (startTime - endTime > 0) {
			$('#total' + id).html("￥" + Null);
		} else {
			var days = Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24)
					+ 1;
			var num = $('#num' + id).val();
			var total = days * price * num;
			$('#total' + id).html("￥" + total);
			/* alert($('#total' + id).html()); */
		}
	}
</script>
<script src="js/simpleCart.min.js">
	
</script>
<!-- slide -->
</head>
<body>
	<!--header-->
	<div class="header">
		<div class="header-top">
			<div class="container">
				<div class="col-sm-4 world"></div>
				<div class="col-sm-4 logo">
					<a href="newsController/toIndex"><img src="images/logo.png"
						alt=""></a>
				</div>

				<div class="col-sm-4 header-left">
					<c:choose>
						<c:when test="${user==null }">
							<p class="log">
								<a href="login.jsp">登录</a> <a
									href="register.jsp">注册</a>
							</p>
						</c:when>
						<c:otherwise>
							<p class="log" style="width:120px;">
								用户名:<a href="userInfo.jsp">${user.userName }</a>
							</p>
							<p class="log" style="width:80px;">
								<a href="newsController/toIndex_null">退出</a>
							</p>
						</c:otherwise>
					</c:choose>
					<c:if test="${user!=null }">
						<div class="cart box_1">
							<a href="orderController/getMyOrderList?userId=${user.userId}&pageNum=1">
								<h3>
									<img src="images/order.png"
										style="margin-top: 12px;margin-left: 30px;" alt="" />
								</h3>
							</a>
						</div>
						<div class="cart box_1" style="margin-left:42px; float: left;">
							<a href="shopController/toCheckout?userId=${user.userId}&pageNum=1">
								<h3>
									<img src="images/cart.png" style="margin-top: 12px;" alt="" />
								</h3>
							</a>
						</div>
					</c:if>
					<div class="clearfix"></div>
				</div>
				<div class="clearfix"></div>
			</div>
		</div>
		<div class="container">
			<div class="head-top">
				<div class="col-sm-2 number">
					<span><i class="glyphicon glyphicon-phone"></i>admin@163.com</span>
				</div>
				<div class="col-sm-8 h_menu4">
					<ul class="memenu skyblue">
						<li class=" grid"><a href="newsController/toIndex">首页</a></li>
						<li><a href="javascript:;">雪具</a>
							<div class="mepanel" style="width: 130px; margin-left: 170px;">
								<!-- style="width: 130px; margin-left: 170px;" -->
								<div class="row" style="width: 110px;">
									<!-- style="width: 130px;" -->
									<div class="col1" style="width: 100px;">
										<!-- style="width: 110px;" -->
										<div class="h_nav">
											<h4>雪具</h4>
											<ul>
												<c:forEach items="${types }" var="type">
													<li><a
														href="skingController/toProducts?pageNum=1&type=${type.typeId }">${type.typeName }</a></li>
												</c:forEach>
											</ul>
										</div>
									</div>
								</div>
							</div></li>

						<li><a href="hotelController/findAllList?pageNum=1">酒店</a></li>
						<li>
							<c:choose>
								<c:when test="${user!=null }">
									<a class="color6" href="contact.jsp">联系我们</a>
								</c:when>
								<c:otherwise>
									<a class="color6" href="login.jsp">联系我们</a>
								</c:otherwise>
							</c:choose>						
						</li>
					</ul>
				</div>
				<div class="col-sm-2 search">
					<a class="play-icon popup-with-zoom-anim" href="#small-dialog"><i
						class="glyphicon glyphicon-search"> </i> </a>
				</div>
				<div class="clearfix"></div>
				<!---pop-up-box---->
				<script type="text/javascript" src="js/modernizr.custom.min.js"></script>
				<link href="css/popuo-box.css" rel="stylesheet" type="text/css"
					media="all" />
				<script src="js/jquery.magnific-popup.js" type="text/javascript"></script>
				<div id="small-dialog" class="mfp-hide">
					<div class="search-top">
						<div class="login">
							<input type="submit" value=""> <input type="text"
								value="请输入......" onFocus="this.value = '';"
								onBlur="if (this.value == '') {this.value = '';}">
						</div>
					</div>
				</div>
				<script>
					$(document).ready(function() {
						$('.popup-with-zoom-anim').magnificPopup({
							type : 'inline',
							fixedContentPos : false,
							fixedBgPos : true,
							overflowY : 'auto',
							closeBtnInside : true,
							preloader : false,
							midClick : true,
							removalDelay : 300,
							mainClass : 'my-mfp-zoom-in'
						});

					});
				</script>
			</div>
		</div>
	</div>
	<!--//header-->
	<!---->
	<div class="container">
		<div class="check-out">
			<h1>订单</h1>
			<table>
				<tr>
					<th>产品</th>
					<th>数量</th>
					<th>单价</th>
					<th>开始时间</th>
					<th>结束时间</th>
					<th>总价</th>
					<th>删除</th>
				</tr>
				<c:forEach items="${orderList }" var="order">
					<tr style="height: 150.14px;">
						<td class="ring-in">
							<a href="javascript:;" class="at-in">
								<div>
									<img
										src="imageController/readImage?name=${order.sking.skingImage }"
										class="img-responsive" alt="">
								</div>
							</a>
							<div class="sed">
								<h5>${order.sking.type.typeName }</h5>
								<p>${order.sking.skingName }:${order.sking.skingBrief }</p>
							</div>
							<div class="clearfix"></div>
						</td>
						<td style="width:50px;">${order.orderCount }</td>
						<td style="width:50px;">￥${order.sking.skingCost }</td>
						<td style="width:200.78px;">${order.startDate }</td>
						<td style="width:200.78px;">${order.endDate }</td>
						<td style="width:50px;">￥${order.orderCost }</td>
						<td style="width:50px;"><a
							href="orderController/userDeleteById?id=${order.orderId }"
							class=" to-buy"
							style="margin: 0px; width: 40px;height: 68px;line-height: 60px;">×</a>
						</td>
					</tr>
				</c:forEach>
			</table>
			<a href="newsController/toIndex" class=" to-buy">继续购买</a>
			<div style="margin-left: 450px;">
				<c:if test="${pageNum!=1 }">
					<a href="orderController/getMyOrderList?userId=${user.userId }&pageNum=${pageNum-1}" class=" to-buy">上一页</a>
				</c:if>
				<c:if test="${pageNum<all }">
					<a href="orderController/getMyOrderList?userId=${user.userId }&pageNum=${pageNum+1}" class=" to-buy">下一页</a>
				</c:if>
				<a href="javascript:;" class=" to-buy">第 ${pageNum } 页</a>
				<a href="javascript:;" class=" to-buy">共 ${all } 页</a>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	<!--footer-->
	<div class="footer">
		<div class="footer-bottom" style="border-top: 0px;">
			<p class="footer-class">
				Copyright &copy; 2018.徐州工程学院@李展展.
			</p>
		</div>
	</div>

	<!--//footer-->
</body>
</html>