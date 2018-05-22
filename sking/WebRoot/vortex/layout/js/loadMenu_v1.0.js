function loadFirstMenu(menu) {
	if(menu != null && menu.children != null && menu.children.length > 0){
		for(var i = 0;i<menu.children.length;i++){
			if(menu.children[i].children != null && menu.children[i].children.length > 0){
				$(".firstMenu").append("<li uri=\'"+menu.children[i].uri+"\' menuId = "+menu.children[i].id+"><a href='#'>"+menu.children[i].name+"</a></li>");
			}else {
				$(".firstMenu").append("<li class='no_child' uri=\'"+menu.children[i].uri+"\' menuId = "+menu.children[i].id+"><a href='#'>"+menu.children[i].name+"</a></li>");
			}
		}
	}
};

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
			loadFirstMenu(JSON.parse(rst.data));
			menuJson = JSON.parse(rst.data);
			
			$(".firstMenu").children("li").on("click", function(){
		        $(".secondMenu").html("");
		        if(menuJson.children != null && menuJson.children.length > 0){
				    for(var i = 0;i<menuJson.children.length;i++){
				        if ($(this).attr("menuId") == menuJson.children[i].id) {
				            loadMenu(menuJson.children[i],"secondMenu",menuJson.children[i].id);
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

function loadMenu(obj , select, parentId){
	if(obj.children != null && obj.children.length > 0){
		for(var i = 0;i<obj.children.length;i++){
			if(parentId == obj.children[i].parentId){
				if(obj.children[i].children != null && obj.children[i].children.length > 0){
					var menuLevel = '';
					if("secondMenu" == select){
						menuLevel = "thirdMenu";
					}
					$("."+select).append("<li uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'>"+obj.children[i].name+"</a><ul class="+menuLevel+" parentId="+obj.children[i].id+"></ul></li>");
					loadMenu(obj.children[i],"thirdMenu",obj.children[i].id);
				}else {
					$("."+select+"[parentId='"+obj.children[i].parentId+"']").append("<li class='no_child' uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'>"+obj.children[i].name+"</a></li>");
				}
			}
		}
	}
};