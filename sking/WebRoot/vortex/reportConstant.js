var reportConstant = {
	cityName : "徐州市",
	cityCode : "001001015",
	cityUnit : "环境卫生管理处",
	// 对应每个报表的备注信息
	zyqsDailyReportMemo:"备注：n"
						+ "    1、每天24:00生成日报表；n"
						+ "    2、系统默认速度超过30公里/时的点为经过车辆产生，不计入本考核表；n"      
						+ "    3、规定速度：均速小于等于20公里/时；n"
						//+ "    4、机扫车规定时间：上午03:00至07:00；冲洗规定作业时间：每年3月1日—12月31日，23：00-2：00；洒水规定作业时间：每年5月1日—10月31日，9:00—15:00n"
						+ "    4、绿色代表数据正常，红色代表数据异常。",
	zyqsWeeklyReportMemo:"备注：n"
						+ "    1、系统默认速度超过30公里/时的点为经过车辆产生，不计入本考核表；n"      
						+ "    2、规定速度：均速小于等于20公里/时；n"
						+ "    3、机扫车规定时间：上午03:00至07:00；冲洗规定作业时间：每年3月1日—12月31日，23：00-2：00；洒水规定作业时间：每年5月1日—10月31日，9:00—15:00n"
						+ "    4、绿色代表数据正常，红色代表数据异常。",
	zyqsDailyTotalReportMemo:"备注：n"
						+ "    1、系统默认速度超过30公里/时的点为经过车辆产生，不计入本考核表；n"      
						+ "    2、规定速度：均速小于等于20公里/时；n"
						+ "    3、黑色代表数据正常，红色代表数据异常。",
	/** 报表中的备注信息是否加载自数据库，默认false表示取自本js */
	isLoadZyqsRemarks : false,
	rbb : 'rbb',// 日报表
	bdkhxb : 'bdkhxb',// 标段考核详表
	zhzbb : 'zhzbb',// 周汇总报表
	yhzbb : 'yhzbb',// 月汇总报表
	getReportRemarks : function(reportCode) {
		if (reportCode == reportConstant.rbb) {
			return reportConstant.zyqsDailyReportMemo;
		} else if (reportCode == reportConstant.bdkhxb) {
			return reportConstant.zyqsDailyReportMemo;
		} else if (reportCode == reportConstant.zhzbb) {
			return reportConstant.zyqsWeeklyReportMemo;
		} else if (reportCode == reportConstant.yhzbb) {
			return reportConstant.zyqsDailyTotalReportMemo;
		}
	}
};