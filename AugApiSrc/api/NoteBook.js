var timeTool = require('../config/time-tool')

var db = require('../DatabaseAbout/mongo-db')

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
	},
	delete: function(req, res){
		console.log('delete:'+req.toString())
		// res.send({r: true, list: [{'1': 'one'}, {'2': 'two'}, {'3': 'three'}]});
		var id = req.query.id;
		db.deleteOne('table', res, id)
	},
	insert: function (req, res) {
		var timeNow = new Date().getTime();

		var theBody = {};
		theBody.body = {
			'title': req.body.title,
			'content': req.body.content,
			'date': timeTool.Format(timeNow, 'yyyy-MM-dd hh:mm:ss')
		};
		theBody.time = timeNow;
		db.insertDb('table', theBody,res);
	},
	list: function (req, res) {
		var skip = {};
		skip.sort = {'time': -1};
		var page = req.query.page;
		var pagesize = req.query.pagesize;
		if (!page) {
			page = 1;
		}
		if (!pagesize) {
			pagesize = 10;
		}

		skip.limit = Number(pagesize);
		skip.skip = Number((page - 1) * pagesize);
		db.list('table', res, skip);
	},


	detail: function (req, res) {
		var id = req.query.id;
		db.selectOne('table', res, id);
	}
};