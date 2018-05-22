<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>管理员登录</title>
    
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
    <script src="js/pintuer.js"></script>
    <script type="text/javascript">
	function login(){
		var name=$("#name").val();
		var pwd=$("#pwd").val();
		var url="adminController/adminLogin?name="+name+"&pwd="+pwd;
		$.get(url,function(data){
			if(data==1){
				window.location.href="adminManage.jsp";
			}else if(data==0){
				alert("用户不存在");
			}else{
				alert("密码错误");
			}
		
		});
	}
	</script>
  </head>
  
  <body>
<div class="bg"></div>
<div class="container">
    <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">           
            </div>         
            <form action="#" method="post">
            <div class="panel loginbox">
                <div class="text-center margin-big padding-big-top"><h1>Login</h1></div>
                <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="text" id="name" class="input input-big" name="name" placeholder="Username" data-validate="required:username·" />
                            <span class="icon icon-user margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="password" id="pwd" class="input input-big" name="password" placeholder="Password" data-validate="required:password" />
                            <span class="icon icon-key margin-small"></span>
                        </div>
                    </div>
                </div>
                <div style="padding:30px;"><input type="button" class="button button-block bg-main text-big input-big" value="Login" onclick="login()"></div>
            </div>
            </form>          
        </div>
    </div>
</div>
</body>
</html>
