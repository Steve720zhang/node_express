module.exports = {

	Format: function (time, fmt) { //author: meizz
		var tt = new Date(time)
		var o = {
			"M+": tt.getMonth() + 1, //月份
			"d+": tt.getDate(), //日
			"h+": tt.getHours(), //小时
			"m+": tt.getMinutes(), //分
			"s+": tt.getSeconds(), //秒
			"q+": Math.floor((tt.getMonth() + 3) / 3), //季度
			"S": tt.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (tt.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
};