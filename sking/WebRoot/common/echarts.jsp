<%
	String echartsjs_path = request.getContextPath();
	String echartsjs_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ echartsjs_path;
%>
<script src="../resources/js/echarts/baidu/2.2.7/build/dist/echarts-all.js"></script>
