<%
	String vortexUpload_path = request.getContextPath();
	String vortexUpload_basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ vortexUpload_path;
%>

<!-- fancybox 查看原图使用-->
<link rel="stylesheet" type="text/css" ref="../resources/js/jquery/fancyBox/2.1.5/source/jquery.fancybox.css" />
<!-- plupload -->