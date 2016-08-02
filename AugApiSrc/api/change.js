var timeTool = require('../config/time-tool')

var db = require('../config/mongo-db')

module.exports = {
	do: function(req, res){
		var timeNow = new Date().getTime();
		var title = req.body.title;
		var content = req.body.content;

		var theBody = {};
		theBody.body = {
			'title': title,
			'content': content,
			'date': timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss')
		};
		theBody.time = timeNow;
		var id = req.query.id;
		db.changeOne('table', res, id ,theBody)
	}
};