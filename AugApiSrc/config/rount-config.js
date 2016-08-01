var InsertController = require('../api/insert');
var DeleteController = require('../api/delete');
var ListController = require('../api/list');
var ChangeController = require('../api/change');

module.exports = function(app){
	app.post('/api/insert', InsertController.do);
	app.get('/api/delete', DeleteController.do);
	app.post('/api/change', ChangeController.do);

	app.get('/api/list', ListController.list);
	app.get('/api/detail', ListController.detail);
};