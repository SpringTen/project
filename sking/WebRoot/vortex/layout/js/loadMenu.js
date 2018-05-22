var menuJson = "";
function load(userId, businessSystemCode){
	$.ajax({
		url : "/cloud/management/rest/menu/getmenujsonbyurl.read",
		type: "post",
		data : {
			"userId" : userId,
			"businessSystemCode" : businessSystemCode
		},
		dataType : "json",
		success: function (rst){
			menuJson = JSON.parse(rst.data);
			var config = {
				menuObj : menuJson,
				firstMenuId: "firstMenu",
				secondMenuId: "secondMenu",
				thirdMenuId: "thirdMenu"
			};
			var menu = new MenuJson(config);
			
			$(".firstMenu").children("li").on("click", function(){
		        $(".secondMenu").html("");
		        if(menuJson.children != null && menuJson.children.length > 0){
				    for(var i = 0;i<menuJson.children.length;i++){
				        if ($(this).attr("menuId") == menuJson.children[i].id) {
				        	menu.loadOtherLevelMenu(menuJson.children[i],"secondMenu",menuJson.children[i].id);
				        }
				    };
				    clickEvent();
				};
		    });
		},
		error: function (rst){
			console.log(rst);
		}
	});
	return menuJson;
};

function clickEvent(){
  $(".no_child").on("click", function () {
    $("#contentFrame").attr("src",$(this).attr("uri"));
  });
  
  $(".secondMenu>li>a").on("click", function (){
	$(this).next("ul").toggleClass("expander");
  });
}