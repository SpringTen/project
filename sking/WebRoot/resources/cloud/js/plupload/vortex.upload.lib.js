/* Vortex Upload libary */
/* upload creation */
/* based on plupload 2.1.9 */
/* version : 1.0 */
/* based on plupload */
/* geyy */
/* 2016-06-06 */
/**
 * 上传核心方法
 */
VortexUpload = function(config) {
	config = $.extend(true, {}, VortexUpload.defaults, config);
	this.type = config.type;// 类型 0:先选择后一起上传,1:选择即上传
	this.id = config.id;// id
	this.url = config.url;// 服务器路径
	this.maxsize = config.maxsize;// 每个文件最大值
	this.chunksize=config.chunksize;//每块大小,0表示不启动分块上传
	this.extensions = config.extensions;// 后缀
	this.dropelement=config.dropelement;//拖拽区域(传入id,可以是数组)
	this.params=config.params;//额外传递的参数
	this.complete=config.complete;//成功上传所有文件后触发
	this.singlefile=config.singlefile;//只能上传一个文件
	this.uploader = null;//上传对象
	this.sucessResponseArr = [];//上传每个文件成功返回的信息数组
	this.errorResponseArr = [];//上传每个文件失败返回的信息数组
	this.init();// 初始化
};

/**
 * 初始化
 */
VortexUpload.prototype.init = function() {
	var t = this;
	if (document.getElementById(t.id)) {
		this.uploader = $("#" + t.id).pluploadQueue({
			url : this.url,
			max_file_size : this.maxsize,
			chunk_size : this.chunksize,
			filters : [ {
				extensions : this.extensions
			} ],
			runtimes : "html5,html4",
			drop_element:this.dropelement,
			multipart_params:this.params
		});
		//绑定单个文件上传后成功返回信息
		this.uploader.bind('FileUploaded',function(uploader,file,responseObject){
			//uploader:当前的plupload实例对象
			//file:触发此事件的文件对象
			//responseObject:服务器返回的信息对象{response：服务器返回的文本,responseHeaders：服务器返回的头信息,status：服务器返回的http状态码,比如200}
			var responseObj=$.parseJSON(responseObject.response);
			responseObj=$.extend(true,{},responseObj,{fileName:file.name});
			if(responseObj.result==0){
				t.sucessResponseArr.push(responseObj);
			}else{
				t.errorResponseArr.push(responseObj);
			}
		});
		//绑定上传发生错误时触发
		this.uploader.bind('Error',function(uploader,errObject){
			//uploader:当前的plupload实例对象
			//errObject:服务器返回的信息对象{code：错误代码,file：与该错误相关的文件对象,message：错误信息}
			t.errorResponseArr.push({fileName:errObject.file.name,result:1,errMsg:errObject.message,data:{}});
		});
		if(this.complete){
			//绑定所有上传完成时触发
			this.uploader.bind('UploadComplete',function(uploader,files){
				//uploader:当前的plupload实例对象
				//files:已完成上传的所有文件对象
				t.complete.call(this,t.sucessResponseArr,t.errorResponseArr);
				t.sucessResponseArr=[];
				t.errorResponseArr=[];
			});
		}
		if(this.singlefile){
			//当文件添加到上传队列后触发
			this.uploader.bind('FilesAdded',function(uploader,files){
				//uploader:当前的plupload实例对象
				//files:本次添加到上传队列里的文件对象
				if(files.length>1){
					$.each(files,function(i,ele){
						if(i>0){
							uploader.removeFile(ele);
						}
					});
					alert("不可上传多个文件,只保留第一个文件.");
				}
			});
		}
		if(this.type>0){
			//绑定文件添加到上传队列后触发
			this.uploader.bind('FilesAdded',function(uploader,files){
				//uploader:当前的plupload实例对象
				//files:本次添加到上传队列里的文件对象
				t.strat();
			});
		}
	} else {
		alert("不存在该元素！");
	}
};
/**
 * 开始上传
 */
VortexUpload.prototype.strat=function(){
	this.uploader.start();
}
/**
 * 默认配置
 */
VortexUpload.defaults = {
	type : 0,
	id : 'uploader',
	url : '',
	maxsize : '1gb',
	chunksize:'0',
	singlefile:false,
	extensions : "*",
	dropelement:"",//默认是id+"_filelist"
	params:{}
};