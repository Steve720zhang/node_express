var timeTool = require('../config/time-tool')

var db = require('../DatabaseAbout/mongo-db')
// var mysql = require('../config/mysql-db')

module.exports = {
	do: function (req, res) {
		var timeNow = new Date().getTime();

		console.log('\nApi: -->INSERT<--\n' + 'title:' + req.body.title + "\ncontent:" + req.body.content + '\ntime:' + timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss'));

		var theBody = {};
		theBody.body = {
			'title': req.body.title,
			'content': req.body.content,
			'date': timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss')
		};
		theBody.time = timeNow;
		db.insertDb('table', theBody,res);
	}
};