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
<title>酒店线路</title>
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
<script type="text/javascript"
	src="http://api.map.baidu.com/api?v=2.0&ak=VwYQHmAxk1Rhown0lAhD74BqFoEd2H2f">
	<script type="text/javascript" src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js">
</script>
<script type="text/javascript"
	src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
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
	<!--banner-->
	<div class="products">
		<div class="container">
			<h1>酒店信息</h1>
			<div class="col-md-9" style="width: 100%;">
				<div class="content-top1">
					<div id="allmap" style="width: 100%;height: 700px;"></div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
	
	<script type="text/javascript">
	    // 百度地图API功能
	    var map = new BMap.Map("allmap");
	    map.centerAndZoom("徐州",13);  //初始化地图,设置城市和地图级别。
	    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
	    var pointA = new BMap.Point(117.162943,34.238455);  // 创建点坐标A--云龙湖
	    var pointB = new BMap.Point(${hotelInfo.longitude},${hotelInfo.latitude});  // 创建点坐标B--
	    alert('滑雪场到该酒店距离是：'+(map.getDistance(pointA,pointB)).toFixed(2)+' 米。');  //获取两点距离,保留小数点后两位 
	    var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r-result", autoViewport: true}});
		driving.search(pointA,pointB);
	</script>
	
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