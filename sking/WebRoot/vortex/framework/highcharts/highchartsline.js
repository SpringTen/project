HighChartsLine = function(config) {
	config = config || {};

	this.chartId = config.chartId;
	config = $.extend({}, HighChartsLine.defaults, config);

	this.options = config;
	this.init();
};
HighChartsLine.prototype.init = function() {
	var t = this;
	t.initChart(t.options);
};
HighChartsLine.prototype.initChart = function(config) {
	var t = this;
	$('#' + t.chartId).highcharts({
        title: {
            text: config.chartTitle,
            x: -20 //center
        },
        xAxis: {
        	title: {
                text: config.xTitle
            },
            categories: config.categories
        },
        yAxis: {
            title: {
                text: config.yTitle
            },
            lineColor: config.yLineColor,
            lineWidth: config.yLineWidth,
            plotLines: [{
            	id: config.plotLineId,
                value: config.plotLineValue,
                width: config.plotLineWidth,
                color: config.plotLineColor
            }],
            min: config.yMin
        },
        tooltip: {
            formatter: function() {
            	var content = '';
            	if(config.xTitle){
            		content += config.xTitle + '：';
            	}
            	content += this.x +'<br/>';
            	if(config.yTitle){
            		content += config.yTitle + '：';
            	}
            	content += round(this.y,2) + config.valueSuffix;
                return content;
        	}
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    formatter: function(){
                    	return round(this.y,2);
                    }
                },
                enableMouseTracking: true
            }
        },
        credits: {
            enabled: false
        },
        exporting:{ 
             enabled: false //用来设置是否显示‘打印’,'导出'等功能按钮，不设置时默认为显示 
        },
        series: config.series
    });
};
HighChartsLine.prototype.destroy = function(){
	var t = this;
	$('#' + t.chartId).highcharts().destroy();
};
HighChartsLine.prototype.setSize = function(width, height){
	var t = this;
	$('#' + t.chartId).highcharts().setSize(width, height);
};
HighChartsLine.prototype.getChart = function(){
	var t = this;
	return $('#' + t.chartId).highcharts();
};
HighChartsLine.prototype.removePlotLine = function(plotLineId){
	var t = this;
	var _plotLineId = null;
	if(plotLineId != 'undefined'){
		_plotLineId = plotLineId;
	}else{
		_plotLineId = t.defaults.plotLineId;
	}
	t.getChart().yAxis[0].removePlotLine(_plotLineId);
};
HighChartsLine.prototype.addPlotLine = function(config){
	var t = this;
	config = config || {};
	config = $.extend({}, HighChartsLine.defaults, config);
	t.getChart().yAxis[0].removePlotLine(config.plotLineId);
	t.getChart().yAxis[0].addPlotLine({
		id: config.plotLineId,
        value: config.plotLineValue,
        width: config.plotLineWidth,
        color: config.plotLineColor
	});
};
HighChartsLine.defaults = {
	chartTitle: '',
	xTitle: '',
	yTitle: '',
	yLineColor: '#08a3e4',
	yLineWidth: 1,
	yMin: 0,
	valueSuffix: '',
	plotLineId: 'plotline',
	plotLineValue: 0,
	plotLineWidth: 1,
	plotLineColor: '#FF0000'

};
