(function() {
	GisUtils = {
		findNearest : findNearest,
		format10To16 : format10To16//颜色10进制转16进制
	};
	function format10To16(color10) {
		if (typeof color10 == "number") {// 判断是否为数字,若是,则进行字符串转化
			var hexColor = color10;
			var hexColorStr = hexColor.toString(16);// 将10进制数转换为16进制
			if (hexColorStr.length < 6) {// 不足6位补0
				var n = 6 - hexColorStr.length;
				for ( var i = 0; i < n; i++) {
					hexColorStr = "0" + hexColorStr;
				}
			}
			return "#" + hexColorStr;
		} else if (typeof color10 == "string") {// 判断是否为字符串,若是,则进行rgb转码
			if (color10 == "red") {
				color10 = "#FF0000";
			} else if (color10 == "green") {
				color10 = "#00FF00"
			} else if (color10 == "blue") {
				color10 = "#0000FF";
			}
			return color10;
		}
	};

	var EARTH_RADIUS = 6378.137;

	function findNearest(arr, x, y, gis) {
		var errorStandard = 0.0005 * gis.getScale();
		var numArr = new Array();
		for ( var i = 0; i < arr.length; i++) {
			// 下一个要判断的经纬度
			var pointX = arr[i][0];
			var pointY = arr[i][1];
			if (Math.abs(pointX - x) < errorStandard
					&& Math.abs(pointY - y) < errorStandard) {
				numArr.push(arr[i]);
			}
		}
		if (numArr.length == 0) {
			return null;
		} else if (numArr.length == 1) {
			return numArr[0];
		} else if (numArr.length > 1) {
			var nearestPointNumber = [];
			// 最近距离，由于最先不知道具体的，所以设为负数
			var spaceNearest = -1;
			// 对所有点判断是否是最短距离的点
			for ( var j = 0; j < numArr.length; j++) {
				// 下一个要判断的经纬度
				var pointX = parseFloat(numArr[j][0]);
				var pointY = parseFloat(numArr[j][1]);

				// 当前点和鼠标点击点的距离
				var spaceTwoPoint = getTwoPointDistance(x, y, pointX, pointY);
				// 获取最短距离
				if (spaceNearest == -1 || spaceTwoPoint <= spaceNearest) {
					spaceNearest = spaceTwoPoint;
					nearestPointNumber = numArr[j];
				}
			}
			return nearestPointNumber;
		}

	}
	function rad(d) {
		return d * Math.PI / 180.0;
	}
	function getTwoPointDistance(lng1, lat1, lng2, lat2) {
		var radLat1 = rad(lat1);
		var radLat2 = rad(lat2);
		var a = radLat1 - radLat2;
		var b = rad(lng1) - rad(lng2);
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
				+ Math.cos(radLat1) * Math.cos(radLat2)
				* Math.pow(Math.sin(b / 2), 2)));
		s = s * EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;
		return s;
	}
})();