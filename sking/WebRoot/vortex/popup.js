var popup = {
	uploadFile: function(params,callback){
		var url = path + '/vortexfile/clientUploadFile/upload.html';
		if (params){
			url = url + '?' + $.param(params);
		}
		var width = 760;
		var height = 530;
		return popVortexWindow(url, width, height,"附件上传",callback);
	},
	uploadFileNew: function(params){
		var url = path + '/vortexfile/clientUploadFile/upload.html';
		if (params){
			params.uploadUrl = path+'/vortexfile/clientUploadFile/save??code=' + (params.code ? params.code : '');
			url = url + '?' + $.param(params);
		}
		var width = 760;
		var height = 530;
		var result = popwin(url, width, height);
		if(result){
			for(var i=0;i<result.length;i++){
				var response = $.parseJSON(result[i].response);
				return response;
			}
		}else{
			return {success : false};
		}
	}
};

