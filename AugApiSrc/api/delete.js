var timeTool = require('../config/time-tool')

var db = require('../DatabaseAbout/mongo-db')

module.exports = {
	do: function(req, res){
		console.log('delete:'+req.toString())
		// res.send({r: true, list: [{'1': 'one'}, {'2': 'two'}, {'3': 'three'}]});
		var id = req.query.id;
		db.deleteOne('table', res, id)


	}
};