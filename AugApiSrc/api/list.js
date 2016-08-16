var timeTool = require('../config/time-tool')

var db = require('../DatabaseAbout/mongo-db')
module.exports = {
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