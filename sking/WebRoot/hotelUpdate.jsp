<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<meta http-equiv="Cache-Control" content="no-store"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<link rel="icon" href="resources/images/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="/resources/images/favicon.ico" type="image/x-icon"/>
<link rel="bookmark" href="resources/images/favicon.ico" type="image/x-icon"/>
<!-- ICON End -->	
<link rel="stylesheet" type="text/css" href="resources/js/jquery/easyui/1.3.6/themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="resources/js/jquery/easyui/1.3.6/themes/icon.css">
<script type="text/javascript" src="resources/js/jquery/jquery-1.8.3.min.js"></script>
 
<script type="text/javascript" src="resources/js/jquery/easyui/1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="resources/js/jquery/easyui/1.3.6/locale/easyui-lang-zh_CN.js"></script>
<!-- qtip2 -->
<link rel="stylesheet" type="text/css" href="resources/js/jquery/qtip2/2.1.1/jquery.qtip.css">
<script type="text/javascript" src="resources/js/jquery/qtip2/2.1.1/jquery.qtip.min.js"></script>
<!-- jquery-noInput -->
<link href="resources/js/jquery/jquery-noInput/0.0.1/jquery-noInput.min.css" type="text/css" rel="stylesheet"/>
<script type="text/javascript" src="resources/js/jquery/jquery-noInput/0.0.1/jquery-noinput.min.js"></script>
<!-- bootstrap -->
<link href="resources/js/bootstrap/2.3.2/css/bootstrap.css" type="text/css" rel="stylesheet" />
<link href="resources/js/bootstrap/2.3.2/css/bootstrap-responsive.css" type="text/css" rel="stylesheet" />
<script src="resources/js/bootstrap/2.3.2/js/bootstrap.min.js" type="text/javascript"></script>
<!-- page css -->
<link href="resources/themes/vortex/css/page.css" type="text/css" rel="stylesheet" />
<link href="resources/themes/vortex.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="resources/file/css/show.css">
<%-- <%@include file="/common/commonjs.jsp"%> --%>
<script type="text/javascript" src="vortex/framework/easyui/extension/util.js"></script>
<script type="text/javascript" src="vortex/framework/constant.js"></script>
<script type="text/javascript" src="vortex/framework/util/global.js"></script>
<script type="text/javascript" src="vortex/framework/util/event.js"></script>
<script type="text/javascript" src="vortex/framework/util/easyuiValidate.js"></script>
<script type="text/javascript" src="vortex/framework/util/VortexUtil.js"></script>
<script type="text/javascript" src="vortex/framework/util/MapUtil.js"></script>
<script type="text/javascript" src="vortex/framework/util/dateUtils.js"></script>
<script type="text/javascript" src="vortex/framework/util/ScriptSynchLoaderMgr.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/CharacterUtil.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/uuid.js"></script>
<script type="text/javascript"
	src="vortex/framework/util/Function.js"></script>	
<script type="text/javascript" src="vortex/uploadFile/uploadFile.js"></script>
<script type="text/javascript" src="vortex/framework/util/GridColumnMenu.js"></script>
<script type="text/javascript" src="vortex/framework/tree/Tree.js"></script>
<script type="text/javascript" src="vortex/framework/ajaxform/jqueryajaxform.js"></script>
<script type="text/javascript" src="vortex/framework/autocomplete/jqueryautocomplete.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/extension/jquery.datagrid.extend.js"></script>
<script type="text/javascript" src="vortex/framework/datagrid/easyuidatagrid.js"></script>
<script type="text/javascript" src="vortex/framework/datagrid/DataGridExport.js"></script>
<script type="text/javascript" src="vortex/framework/dynamicform/DynamicForm.js"></script>
<script type="text/javascript" src="vortex/framework/jquery/plugins/mask/mask.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/window/windowControl.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/plugins/datagrid-bufferview.js"></script>
<script type="text/javascript" src="vortex/framework/easyui/plugins/datagrid-detailview.js"></script>
<script type="text/javascript" src="vortex/popup.js"></script>
<script type="text/javascript" src="resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.pack.js"></script>
<script type="text/javascript" src="resources/js/jquery/json/json2.js"></script>
<script type="text/javascript" src="vortex/reportConstant.js"></script>
<link rel="stylesheet" type="text/css" href="resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.css" media="screen" />
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=VwYQHmAxk1Rhown0lAhD74BqFoEd2H2f">
<script type="text/javascript">

</script>
</head>
<body class="easyui-layout" id="main_layout" data-options="fit:true">
	<div data-options="region:'north',border:false"
		style="height: 35px; overflow: hidden;">
		<div class="vnav vnavfont vnavsize">酒店信息管理 &gt; 修改酒店信息</div>
		<div class="vsep"></div>
	</div>
	<div data-options="region:'center',border:false">
		<form action="hotelController/hotelUpdate" method="post" id="form" enctype="multipart/form-data">
			<div style="margin-top: 5px; padding-left: 0px; padding-right: 0px;">
				<input type="text" style="display: none;" name="hotelId" value="${hotel.hotelId }">
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vtb">
					<tr>
						<td class="vtbtralignR" style="width: 30%">
							<input type="file" name="file"  onchange="javascript:loadImage(this);">
							<input type="text" style="display: none;" name="hotelImage" value="${hotel.hotelImage }">
						</td>
						<td class="vtbtralignL" style="width: 70%">
							<img id="img" src="imageController/readImage?name=${hotel.hotelImage }"  style="width: 80%;height: 200px;margin-bottom: 20px;">
						</td>
					</tr>
					
					<tr>
						<td class="vtbtralignR" style="width: 25%">名称：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<input type="text" style="width:200px; height: 30px;" name="hotelName" value="${hotel.hotelName }" class="vinput" placeholder="请输入名称">
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR"style="width: 25%">介绍：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<textarea name="hotelBrief" style="width: 60%;height: 300px">${hotel.hotelBrief }</textarea>
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR" style="width: 25%">地址：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<input type="text" style="width:200px; height: 30px;" value="${hotel.hotelAddress}" id="hotelAddress" name="hotelAddress" class="vinput" placeholder="请输入名称">
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR" style="width: 25%">经度：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<input type="text" style="width:200px; height: 30px;" value="${hotel.longitude }" id="longitude" name="longitude" class="vinput" placeholder="请输入名称">
						</td>
					</tr>
					<tr>
						<td class="vtbtralignR" style="width: 25%">纬度：
						</td>
						<td class="vtbtralignL" style="width: 70%">&nbsp;
							<input type="text" style="width:200px; height: 30px;" value="${hotel.latitude }" id="latitude" name="latitude" class="vinput" placeholder="请输入名称">
						</td>
					</tr>
				</table>
			</div>
		</form>
		<div id="allmap" style="width: 100%;height: 60%"></div>
	</div>
	<div data-options="region:'south',border:false" style="height: 30px; background: #e5eff8; overflow: hidden;" align="center">
		<a href="hotelList" class="btn">返回</a> 
		<a class="btn btn-success" onclick="javascript:$('#form').submit();">保存</a>
	</div>
</body>
<script type="text/javascript">
	// 百度地图API功能
	var map = new BMap.Map("allmap");            
	map.centerAndZoom("徐州",10);           
	//单击获取点击的经纬度
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
	var geoc = new BMap.Geocoder(); 
	var new_point = new BMap.Point($("#longitude").val(),$("#latitude").val());
	var marker = new BMap.Marker(new_point);  // 创建标注
	map.addOverlay(marker);              // 将标注添加到地图中
	map.panTo(new_point);  
	map.addEventListener("click",function(e){
		$("#longitude").val(e.point.lng);
		$("#latitude").val(e.point.lat);
		var pt = e.point;
		geoc.getLocation(pt, function(rs){
			var addComp = rs.addressComponents;
			$("#hotelAddress").val(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
		});    
		map.clearOverlays();
		new_point = new BMap.Point(e.point.lng,e.point.lat);
		marker = new BMap.Marker(new_point);  // 创建标注
		map.addOverlay(marker);              // 将标注添加到地图中
		map.panTo(new_point);  
	});
	function getObjectURL(file) {  
		  var url = null ;   
		  // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
		  if (window.createObjectURL!=undefined) { // basic  
		    url = window.createObjectURL(file) ;  
		  } else if (window.URL!=undefined) { // mozilla(firefox)  
		    url = window.URL.createObjectURL(file) ;  
		  } else if (window.webkitURL!=undefined) { // webkit or chrome  
		    url = window.webkitURL.createObjectURL(file) ;  
		  }  
		  return url ;  
	}
	function loadImage(obj){  
		  // getObjectURL是自定义的函数，见下面  
		  // this.files[0]代表的是选择的文件资源的第一个，因为上面写了 multiple="multiple" 就表示上传文件可能不止一个  
		  // ，但是这里只读取第一个   
		  var objUrl = getObjectURL(obj.files[0]) ;  
		  if (objUrl) {  
		    // 在这里修改图片的地址属性  
		    $("#img").attr("src", objUrl) ;  
		  }  
	}
</script>
</html>