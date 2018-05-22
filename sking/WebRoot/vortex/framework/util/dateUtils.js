var DateUtils = {
	/**
	 * 获取传入日期的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014-01-01
	 */
	getDateStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseDateStr(date, false);
	},
	/**
	 * 获取传入日期的年月日且带有汉字的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014年01月01日
	 */
	getDateStrHZ : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseDateStr(date, true);
	},
	/**
	 * 获取带有时分秒日期的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 12:15:16
	 */
	getTimeStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseTimeStr(date, false);
	},
	/**
	 * 获取传入时间的时分秒且带有汉字的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 10时42分52秒
	 */
	getTimeStrHZ : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseTimeStr(date, true);
	},
	/**
	 * 获取传入日期的年月日数组
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {Array} 日期的字符串显示[2014,01,01]
	 */
	getDateStrArr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var year = date.getFullYear();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var dateArr = new Array();
		dateArr.push(year);
		dateArr.push(month);
		dateArr.push(day);
		return dateArr;
	},
	/**
	 * 获取传入日期的明天的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014-01-01
	 */
	getTomorrowDateStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal + 24 * 3600 * 1000);
		} else {
			date = new Date(date.getTime() + 24 * 3600 * 1000);
		}
		return DefaultBase.getBaseDateStr(date, false);
	},
	/**
	 * 获取传入日期的明天的带有汉字的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014年01月01日
	 */
	getTomorrowDateStrHZ : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal + 24 * 3600 * 1000);
		} else {
			date = new Date(date.getTime() + 24 * 3600 * 1000);
		}
		return DefaultBase.getBaseDateStr(date, true);
	},
	/**
	 * 获取传入日期的昨天的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014-01-01
	 */
	getYesterdayDateStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal - 24 * 3600 * 1000);
		} else {
			date = new Date(date.getTime() - 24 * 3600 * 1000);
		}
		return DefaultBase.getBaseDateStr(date, false);
	},
	/**
	 * 获取传入日期的昨天的带有汉字的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014年01月01日
	 */
	getYesterdayDateStrHZ : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal - 24 * 3600 * 1000);
		} else {
			date = new Date(date.getTime() - 24 * 3600 * 1000);
		}
		return DefaultBase.getBaseDateStr(date, true);
	},
	/**
	 * 获取带有年月日时分秒日期的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014-01-01 12:15:16
	 */
	getDateTimeStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var dateStr = DefaultBase.getBaseDateStr(date, false);
		var timeStr = DefaultBase.getBaseTimeStr(date, false);
		return dateStr + ' ' + timeStr;
	},
	/**
	 * 获取传入日期的年月日时分秒且带有汉字的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 2014年01月01日10时42分52秒
	 */
	getDateTimeStrHZ : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var dateStr = DefaultBase.getBaseDateStr(date, true);
		var timeStr = DefaultBase.getBaseTimeStr(date, true);
		return dateStr + ' ' + timeStr;
	},
	/**
	 * 获取传入日期的年月日时分秒数组
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {Array} 日期的字符串显示[2014,01,01]
	 */
	getDateTimeStrArr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var year = date.getFullYear();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		var datetimeArr = new Array();
		datetimeArr.push(year);
		datetimeArr.push(month);
		datetimeArr.push(day);
		datetimeArr.push(hour);
		datetimeArr.push(minute);
		datetimeArr.push(second);
		return datetimeArr;
	},
	/**
	 * 获取传入参数为字符串日期的带有年月日的日期
	 * @param {String} dateVal 某一日期(2014-01-02)
	 * @return {String} 日期的字符串显示(2014年01月01日)
	 */
	getDateStrHZByDateStr : function(dateVal) {
		var dateArr = dateVal.split('-');
		return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日';
	},
	/**
	 * 获取传入参数为字符串日期的带有时分秒的日期
	 * @param {String} dateVal 某一时间(10:42:52)
	 * @return {String} 日期的字符串显示(10时42分52秒)
	 */
	getTimeStrHZByDateStr : function(dateVal) {
		var timeArr = dateVal.split(':');
		return timeArr[0] + '时' + timeArr[1] + '分' + timeArr[2] + '秒';
	},
	/**
	 * 获取传入参数为字符串日期的带有年月日时分秒的日期
	 * @param {String} dateVal 某一时间(2014-01-02 10:42:52)
	 * @return {String} 日期的字符串显示(2014年01月01日10时42分52秒)
	 */
	getDateTimeStrHZByDateTimeStr : function(dateVal) {
		var dateArr = dateVal.split(' ').split('-');
		var timeArr = dateVal.split(' ').split(':');
		return dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日' + timeArr[0] + '时'
				+ timeArr[1] + '分' + timeArr[2] + '秒';
	},
	/**
	 * 获取日期的小时分钟的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 日期的字符串显示(12:15)
	 */
	getHourAndMinuteStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		return hour + ':' + minute;
	},
	/**
	 * 获取传入字符串日期的Date类型的日期
	 * @param {String} dateVal 某一时间(2014-01-01)
	 * @return {Date} 返回字符串日期的Date类型
	 */
	getStrToDate : function(dateVal) {
		if (dateVal) {
			var dateArr = dateVal.split('-');
			return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
		}
	},
	/**
	 * 获取传入字符串日期的DateTime类型的日期
	 * @param {String} dateVal 某一时间(2014-01-01 15:15:15)
	 * @return {Date} 返回字符串日期的Date类型
	 */
	getStrToDateTime : function(dateVal) {
		if (dateVal) {
			var dateArr = dateVal.split(' ')[0].split('-');
			var timeArr = dateVal.split(' ')[1].split(':');
			return new Date(dateArr[0], dateArr[1] - 1, dateArr[2], timeArr[0], timeArr[1],
					timeArr[2]);
		}
	},
	/**
	 * 获取传入字符串日期当天的年月日时分秒DateTime类型数组
	 * @param {String} dateVal 某一日期(2014-01-01)
	 * @return {Array} 日期的DateTime类型(2014.01.01 00:00:00-2014.01.01 23:59:59)
	 */
	getDateTimeRange : function(dateVal) {
		var date = dateVal.split("-");
		var startTime = new Date(date[0], date[1] - 1, date[2], 0, 0, 0);
		var endTime = new Date(date[0], date[1] - 1, date[2], 23, 59, 59);
		var result = new Array();
		result.push(startTime);
		result.push(endTime);
		return result;
	},
	/**
	 * 获取传入日期当天的年月日时分秒字符串数组
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {Array} 日期的Date类型(2014.01.01 00:00:00-2014.01.01 23:59:59)
	 */
	getDateTimeRangeStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var dateStr = DefaultBase.getBaseDateStr(date, false);
		var startTime = dateStr + ' 00:00:00';
		var endTime = dateStr + ' 23:59:59';
		var result = new Array();
		result.push(startTime);
		result.push(endTime);
		return result;
	},
	/**
	 * 获取传入日期所属周的第一天和最后一天
	 * @param {String} dateVal:某一星期中的某一天(2014-01-01)
	 * @param {Boolean} isSundayFirst:该星期是否以周日为起始点()
	 * @return {Array} 该周第一天和最后一天的字符串日期
	 */
	getWeekRangeStr : function(dateVal, isSundayFirst) {
		var arr = dateVal.split("-");
		var date = new Date(arr[0], arr[1] - 1, arr[2]);// 月份-1 因为月份从0开始 构造一个Date对象
		var dateOfWeek = date.getDay();// 返回当前日期的在当前周的某一天（0～6--周日到周一）
		var dateOfWeekInt = parseInt(dateOfWeek, 10);// 转换为整型
		var daysToLastDay;
		if (isSundayFirst) {
			daysToLastDay = 6 - dateOfWeekInt;// 当前于周六相差的天数
		} else {
			if (dateOfWeekInt == 0) {// 如果是周日(如果是周一到周六算为一周则加此代码)
				dateOfWeekInt = 7;
			}
			daysToLastDay = 7 - dateOfWeekInt;// 当前于周日相差的天数
		}
		var day = parseInt(arr[2], 10);// 按10进制转换，以免遇到08和09的时候转换成0
		var lastDay = day + daysToLastDay;// 当前日期所处周的最后一天的日期
		var firstDay = lastDay - 6;// 当前日期之前所处周的第一天的日期
		var firstDate = DefaultBase.getBaseDateStr(new Date(arr[0], arr[1] - 1, firstDay), false);
		var lastDate = DefaultBase.getBaseDateStr(new Date(arr[0], arr[1] - 1, lastDay), false);
		var result = new Array();
		result.push(firstDate);
		result.push(lastDate);
		return result;
	},
	/**
	 * 获取传入日期所属周的第一天和最后一天
	 * @param {String} dateVal:某一星期中的某一天(2014-01-01)
	 * @param {Boolean} isDateValStr:该星期是否以周日为起始点(true/false)
	 * @return {String} 星期一/星期二...
	 */
	getWhichDayOfWeek : function(dateVal, isDateValStr) {
		var date = dateVal;
		if (isDateValStr) {
			date = DateUtils.getStrToDate(dateVal);
		}
		var whichDay = date.getDay();// 返回当前日期的在当前周的某一天（0～6--周日到周一）
		if (whichDay == 0) {
			return '星期日';
		} else if (whichDay == 1) {
			return '星期一';
		} else if (whichDay == 2) {
			return '星期二';
		} else if (whichDay == 3) {
			return '星期三';
		} else if (whichDay == 4) {
			return '星期四';
		} else if (whichDay == 5) {
			return '星期五';
		} else if (whichDay == 6) {
			return '星期六';
		}
	},
	/**
	 * 获取传入日期作为最后一天的一周的第一天和最后一天
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {Array} 得到包括该日期往前数七天的数组(只有七天前和今天的日期)
	 */
	getWeekRangeStrEndByToday : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var startDate = DateUtils.getDateStr(date.getTime() - 6 * 3600000 * 24, true);
		var endDate = DefaultBase.getBaseDateStr(date, false);
		var result = new Array();
		result.push(startDate);
		result.push(endDate);
		return result;
	},
	/**
	 * 获取传入日期处于该年的第几周
	 * @param {String/Array} dateArray 日期的字符串(2014-01-01)或数组([2014,01,01])
	 * @param {Boolean} isDateValueArrayType dateVal是否为数组类型
	 * @return {Number} 该周为该年的第几周(2014-01-01为2014的第一周)
	 */
	getWeekInYearCount : function(dateVal, isDateValueArrayType) {
		var dateArray = dateVal;
		if (!isDateValueArrayType) {
			dateArray = dateVal.split('-');
		}
		var firstDayOfYear = new Date(dateArray[0], 0, 1);
		var selectedDay = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
		var temp = selectedDay.getTime() + (firstDayOfYear.getDay() + 1) * 24 * 60 * 60 * 1000;
		var weekCount = (temp - firstDayOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000);
		return Math.ceil(weekCount);
	},
	/**
	 * 获取传入日期的年份和月份的字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @param {Number} amount 需要增加或减少的月份
	 * @return {String} 本月的字符串显示(2014-01)
	 */
	getMonthStr : function(dateVal, isDateValMS, amount) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseMonthStr(date, amount, false);
	},
	/**
	 * 获取传入日期的年份和月份的汉字字符串显示
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @param {Number} amount 需要增加或减少的月份
	 * @return {String} 本月的字符串汉字显示(2014年01月)
	 */
	getMonthStrHZ : function(dateVal, isDateValMS, amount) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		return DefaultBase.getBaseMonthStr(date, 0, true);
	},
	/**
	 * 获取传入日期的年份和月份的汉字字符串显示
	 * @param {Date/Number} dateVal 某一时间
	 * @return {String} 本月的字符串汉字显示(2014年01月)
	 */
	getMonthStrHZByMonthStr : function(dateVal) {
		var dateArr = dateVal.split("-");
		return dateArr[0] + '年' + dateArr[1] + '月';
	},
	/**
	 * 获取传入日期所属月份的第一天和最后一天
	 * @param {String} dateVal:某一月中的某一天(2014-01-01)
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {Array} 该月第一天和最后一天的字符串日期
	 */
	getMonthRangeStr : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var year = date.getFullYear();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1);
		var firstDay = new Date(year, month, 1);
		var lastDay = new Date(year, month, 0);
		var result = new Array();
		result.push(DefaultBase.getBaseDateStr(firstDay, false));
		result.push(DefaultBase.getBaseDateStr(lastDay, false));
		return result;
	},
	/**
	 * 获取传入日期所属月份的第一天和最后一天
	 * @param {String} dateVal:某一月中的某一天(2014-01-01)或某一月(2014-01)
	 * @return {Array} 该月第一天和最后一天的字符串日期
	 */
	getMonthRangeStrByDateStr : function(dateVal) {
		var arr = dateVal.split("-");
		var firstDay = new Date(arr[0], arr[1] - 1, 1);
		var lastDay = new Date(arr[0], arr[1], 0);
		var result = new Array();
		result.push(DefaultBase.getBaseDateStr(firstDay, false));
		result.push(DefaultBase.getBaseDateStr(lastDay, false));
		return result;
	},
	/**
	 * 获取传入的字符串日期所处月份的天数
	 * @param {String} dateVal 某一个月份(2014-03)
	 * @return {Number} 该月的天数
	 */
	getDaysCountOfMonth : function(dateVal) {
		var year = dateVal.substr(0, 4);
		var month = dateVal.substr(5, 2);
		var days = 30;
		if (month == "02") {
			days = 28;
		}
		if ((",01,03,05,07,08,10,12,").indexOf("," + month + ",") > -1) {
			days = 31;
		}
		if (month == "02" && parseInt(year) % 4 == 0
				&& !(parseInt(year) % 100 == 0 && !(parseInt(year) % 400 == 0))) {
			days = 29;
		}
		return days;
	},
	/**
	 * 获取传入日期的年月作为后缀
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 日期的年份和月份(201401)
	 */
	getSuffixOfYearMonth : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1).toString();
		return year + month;
	},
	/**
	 * 获取传入字符串日期的年月作为后缀
	 * @param {String} dateVal 某一时间(2014-01-01)
	 * @return {String} 日期的年份和月份(201401)
	 */
	getSuffixOfYearMonthByDateStr : function(dateVal) {
		var dateArr = dateVal.split('-');
		return dateArr[0] + dateArr[1];
	},
	/**
	 * 获取传入日期的年月日作为后缀
	 * @param {Date/Number} dateVal 某一时间/毫秒数
	 * @param {Boolean} isDateValMS dateVal是否为毫秒
	 * @return {String} 日期的年份和月份及日期(20140101)
	 */
	getSuffixOfYearMonthDay : function(dateVal, isDateValMS) {
		var date = dateVal;
		if (isDateValMS) {
			date = new Date(dateVal);
		}
		var year = date.getFullYear().toString();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1).toString();
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
		return year + month + day;
	},
	/**
	 * 获取传入字符串日期的年月日作为后缀
	 * @param {String} dateVal 某一时间(2014-01-01)
	 * @return {String} 日期的年份和月份及日期(20140101)
	 */
	getSuffixOfYearMonthDayByDateStr : function(dateVal) {
		var dateArr = dateVal.split('-');
		return dateArr[0] + dateArr[1] + dateArr[2];
	},
	/**
	 * 获取传入的两个字符串日期是否在同一天的比较结果
	 * @param {String} startDateTime 开始日期
	 * @param {String} endDateTime 结束日期
	 * @return 如在相同月份返回true,否则返回false
	 */
	isTwoDateTimeInSameDay : function(startDateTime, endDateTime) {
		var startDate = startDateTime.substring(0, 10);
		var endDate = endDateTime.substring(0, 10);
		if (startDate === endDate) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 获取传入的两个字符串日期是否在同一个月份的比较结果
	 * @param {String} startDateTime 开始日期
	 * @param {String} endDateTime 结束日期
	 * @return 如在相同月份返回true,否则返回false
	 */
	isTwoDateTimeInSameMonth : function(startDateTime, endDateTime) {
		var startDateMonth = startDateTime.substring(0, 7);
		var endDateMonth = endDateTime.substring(0, 7);
		if (startDateMonth === endDateMonth) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 获取传入的第二个日期是否大于第一个日期的比较结果
	 * @param {String} startDateTime 开始日期
	 * @param {String} endDateTime 结束日期
	 * @return {Boolean} 如在结束日期大于开始日期返回true,否则返回false
	 */
	isEndDateTimeGTStartDateTime : function(startDateTimeStr, endDateTimeStr) {
		var startDateTime = DateUtils.getStrToDateTime(startDateTimeStr);
		var endDateTime = DateUtils.getStrToDateTime(endDateTimeStr);
		if (endDateTime >= startDateTime) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 获取传入的第二个时间是否大于第一个时间的比较结果
	 * @param {String} firtTime 第一个时间(07:00)
	 * @param {String} secondTime 第二个时间(12:30)
	 * @return {String} 如在第一个时间大于第二个时间返回'GT',小于返回'LT',等于返回'EQ'
	 */
	isFirstTimeGTSecondTime : function(firtTime, secondTime) {
		var firtTimeArr = firtTime.split(':');
		var secondTimeArr = secondTime.split(':');
		if (firtTimeArr[0] > secondTimeArr[0]) {
			return 'GT';
		} else if (firtTimeArr[0] == secondTimeArr[0]) {
			if (firtTimeArr[1] > secondTimeArr[1]) {
				return 'GT';
			} else if (firtTimeArr[1] == secondTimeArr[1]) {
				return 'EQ';
			}
		}
		return 'LT';
	}
};
/**
 * 不要调用本对象，以后会重新定义位置和命名
 */
var DefaultBase = {
	/**
	 * 不要调用此方法
	 * @param {Date} date 某一时间
	 * @param {Boolean} isWithHanZi 返回的值中是否需带有汉字
	 * @return {String} isWithHanZi为true时返回(2014年01月01日)false时返回(2014-01-01)
	 */
	getBaseDateStr : function(date, isWithHanZi) {
		var year = date.getFullYear();
		var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1)
				: (date.getMonth() + 1);
		var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		if (isWithHanZi) {
			return year + '年' + month + '月' + day + '日';
		} else {
			return year + '-' + month + '-' + day;
		}
	},
	/**
	 * 不要调用此方法 Date date 某一时间 *
	 * @param {Date} date 某一时间
	 * @param {Boolean} isWithHanZi 返回的值中是否需带有汉字
	 * @return {String} isWithHanZi为true时返回(10时42分52秒)/false时返回(12:15:16)
	 */
	getBaseTimeStr : function(date, isWithHanZi) {
		var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		if (isWithHanZi) {
			return hour + '时' + minute + '分' + second + '秒';
		} else {
			return hour + ':' + minute + ':' + second;
		}
	},
	/**
	 * 不要调用此方法
	 * @param {Date} date 某一时间
	 * @param {Number} amount 需要增加或减少的月份
	 * @param {Boolean} isWithHanZi 返回的值中是否需带有汉字
	 * @return {String} isWithHanZi为true时返回(10时42分52秒)/false时返回(12:15:16)
	 */
	getBaseMonthStr : function(date, amount, isWithHanZi) {
		var year = date.getFullYear();
		var monthVal = date.getMonth() + amount;
		var dateArr = DateUtils.getDateStrArr(new Date(year, monthVal), false);
		if (isWithHanZi) {
			return dateArr[0] + '年' + dateArr[1] + '月';
		} else {
			return dateArr[0] + '-' + dateArr[1];
		}
	},
	
	/**
	 * 传入两个日期，返回两个日期之间的天数差
	 * */
	DateDiff: function(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式    
        var  aDate,  oDate1,  oDate2,  iDays    
        aDate  =  sDate1.split("-")    
        oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式    
        aDate  =  sDate2.split("-")    
        oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    
        iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数   
        return  iDays + 1   
    }
};