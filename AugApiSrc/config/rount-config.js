var InsertController = require('../api/insert');
var DeleteController = require('../api/delete');
var ListController = require('../api/list');
var ChangeController = require('../api/change');

module.exports = function(app){
	app.post('/api/insert', InsertController.do);
	//title:(text)标题 content:(text)内容

	app.get('/api/delete', DeleteController.do);
	//id:(int)id

	app.post('/api/change', ChangeController.do);
	//id:(int,GET形式)id title:(text,POST形式)标题 content:(text,POST形式)内容

	app.get('/api/list', ListController.list);
	//page:(int)当前页数 pagesize:(int)每页容量

	app.get('/api/detail', ListController.detail);
	//id:(int)id
};