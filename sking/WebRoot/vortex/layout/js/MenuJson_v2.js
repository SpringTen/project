/*
*Modify by yzq
*Modify on 2016.06.22
*/
MenuJson = function (config){
	config = config || {};
	
	this.menuObj = config.menuObj;
	this.firstMenuId = config.firstMenuId;
	this.secondMenuId = config.secondMenuId;
	this.thirdMenuId = config.thirdMenuId;
	this.filePath = config.filePath;
	
	this.loadFirstMenu();
};

MenuJson.prototype.loadFirstMenu = function (){
	//根据json加载一级标题，并显示	
	var t = this;
	if(t.menuObj != null && t.menuObj.children != null && t.menuObj.children.length > 0){
		for(var i = 0;i<t.menuObj.children.length;i++){
			if(t.menuObj.children[i].children != null && t.menuObj.children[i].children.length > 0){
				if(t.menuObj.children[i].photoIds != null  && t.menuObj.children[i].photoIds != "" && eval(t.menuObj.children[i].photoIds).length > 0){
					$("."+t.firstMenuId).append("<li uri=\'"+t.menuObj.children[i].uri+"\' menuId = "+t.menuObj.children[i].id+"><img src='"+t.filePath+"?id="+eval(t.menuObj.children[i].photoIds)[0].id+"&openmode=inline'><a href='#'><span>"+t.menuObj.children[i].name+"</span></a></li>");
				}else {
					$("."+t.firstMenuId).append("<li uri=\'"+t.menuObj.children[i].uri+"\' menuId = "+t.menuObj.children[i].id+"><a href='#'><span>"+t.menuObj.children[i].name+"</span></a></li>");
				}
			}else {
				if(t.menuObj.children[i].photoIds != null  && eval(t.menuObj.children[i].photoIds).length > 0){
					$("."+t.firstMenuId).append("<li class='no_child' uri=\'"+t.menuObj.children[i].uri+"\' menuId = "+t.menuObj.children[i].id+"><img src='"+t.filePath+"?id="+eval(t.menuObj.children[i].photoIds)[0].id+"&openmode=inline'><a href='#'><span>"+t.menuObj.children[i].name+"</span></a></li>");
				}else {
					$("."+t.firstMenuId).append("<li class='no_child' uri=\'"+t.menuObj.children[i].uri+"\' menuId = "+t.menuObj.children[i].id+"><a href='#'><span>"+t.menuObj.children[i].name+"</span></a></li>");
				}
			}
		}
	}
};

MenuJson.prototype.loadOtherLevelMenu = function (obj , select, parentId){
	//根据点击的一级标题加载其对应的子菜单
	var t = this;
	if(obj.children != null && obj.children.length > 0){
		for(var i = 0;i<obj.children.length;i++){
			if(parentId == obj.children[i].parentId){
				if(obj.children[i].children != null && obj.children[i].children.length > 0){
					var menuLevel = '';
					if(t.secondMenuId == select){
						menuLevel = t.thirdMenuId;
					}
					if(obj.children[i].photoIds != null  && obj.children[i].photoIds != "" && eval(obj.children[i].photoIds).length > 0){
						$("."+select).append("<li uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'><img src='"+t.filePath+"?id="+eval(obj.children[i].photoIds)[0].id+"&openmode=inline'><span>"+obj.children[i].name+"</span></a><ul class="+menuLevel+" parentId="+obj.children[i].id+"></ul></li>");
					}else {
						$("."+select).append("<li uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'><span>"+obj.children[i].name+"</span></a><ul class="+menuLevel+" parentId="+obj.children[i].id+"></ul></li>");
					}
					t.loadOtherLevelMenu(obj.children[i],t.thirdMenuId,obj.children[i].id);
				}else {
					if(obj.children[i].photoIds != null  && obj.children[i].photoIds != "" &&  eval(obj.children[i].photoIds).length > 0){
						$("."+select+"[parentId='"+obj.children[i].parentId+"']").append("<li class='no_child' uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'><img src='"+t.filePath+"?id="+eval(obj.children[i].photoIds)[0].id+"&openmode=inline'><span>"+obj.children[i].name+"</span></a></li>");
					}else {
						$("."+select+"[parentId='"+obj.children[i].parentId+"']").append("<li class='no_child' uri=\'"+obj.children[i].uri+"\' menuId ="+obj.children[i].id+"><a href='#'><span>"+obj.children[i].name+"</span></a></li>");
					}
				}
			}
		}
	}
};
