var ManageUtils = {
	
	/**
	 * 将json对象自动填充到指定的form中
	 * 
	 * @Param {obj} json对象
	 */
	json2Form : function(obj, formId) {
		if(!obj) {
			return;
		}
		
		var key,value;
		var $ele = null;
		var tagName = null;
		
		var valStr = null;
		var arr = null;
	  
		var processed = false;
		
		for(x in obj) {
			key = x;
			value = obj[x];
			processed = false;
			
			// span元素处理 - begin
			$ele = $("#" + formId + " #" + key);
			
			if($ele && $ele.length > 0) {
				tagName = $ele[0].tagName;
				
				if(tagName == 'SPAN') {
					valStr = '';
					if($.isArray(value)){
						for(var i = 0; i < value.length; i++){
							valStr += value[i] + ",";
						}
						valStr = valStr.substring(0, valStr.length - 1);
					} else {
						valStr = (value == null) ? '' : value;
					}
					
					$ele.text(valStr);
					
					processed = true;
				} 
			}
			// span元素处理 - end
			
			if(processed) {
				continue;
			}
			
			// input元素处理 - begin
			$ele = $("#" + formId + " [name='" + key + "'], [name='" + key + "[]']");
			if(!$ele || $ele.length == 0) {
				continue;
			}
			
			$ele.each( function() {
				tagName = $(this)[0].tagName;
				
				if(tagName=='INPUT') {
					type = $(this).attr('type'); // DOM元素类型
					if(type=='radio') {
						$(this).attr('checked',$(this).val()==value);
					} else if(type=='checkbox') { // checkbox这种多值的数据，要根据json串的格式做相应解析
						//arr = value.split(',');
						arr = value;
						if(arr!=null) {
							for(var i =0;i<arr.length;i++){
								if($(this).val()==arr[i]){
									$(this).attr('checked',true);
									break;
								}
							}
						}
						
					} else {
						$(this).val(value);
					}
				} else if(tagName=='SELECT' || tagName=='TEXTAREA') {
					$(this).val(value);
				} else {
					//nothing to do
				}
			});
			// input元素处理 - end
		}
	}
};
