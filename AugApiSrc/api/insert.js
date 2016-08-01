var timeTool = require('../config/time-tool')

var db = require('../config/mongo-db')

module.exports = {
	do: function (req, res) {
		var timeNow = new Date().getTime();
		console.log('\nApi: -->INSERT<--\ntitle:' + req.body.title + "\ncontent:" + req.body.content + '\ntime:' + timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss'));
		var theBody = {};
		theBody.rr = true;
		theBody.body = {
			'title': req.body.title,
			'content': req.body.content,
			'time': timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss')
		};
		var consequence = db.insertDb('table', theBody);
		theBody.r = consequence;
		res.send(theBody);
	}
};