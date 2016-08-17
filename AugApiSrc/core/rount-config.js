
var InsertController = require('../api/insert');
var DeleteController = require('../api/delete');
var ListController = require('../api/list');
var ChangeController = require('../api/change');
var VerifyController = require('../api/verify');

var WaterLineTest = require('../api/VerifyUsers');
var MainList = require('../api/MainList');

module.exports = function(app){
	//  记事本增删改查：新建  删除  编辑  列表  详情
	app.route('/api/insert').post(InsertController.do);
	//title:(text)标题 content:(text)内容
	app.route('/api/delete').get(DeleteController.do);
	//id:(int)id
	app.route('/api/change').post(ChangeController.do);
	//id:(int,GET形式)id title:(text,POST形式)标题 content:(text,POST形式)内容
	app.route('/api/list').get(ListController.list);
	//page:(int)当前页数 pagesize:(int)每页容量
	app.route('/api/detail').get(ListController.detail);
	//id:(int)id

	//  登录  注册  详细信息
	app.route('/api/login').post(VerifyController.login);
	app.route('/api/registry').post(VerifyController.registry);
	app.route('/api/user/info').post(VerifyController.info);

	//测试用
	app.route('/api/user/waterlineTest').post(WaterLineTest.do);

	//  mainlist相关：list add detail
	app.route('/api/mainlist').get(MainList.mainlist);
	app.route('/api/mainlist/add').post(MainList.add);
	app.route('/api/mainlist/select').post(MainList.selectDetail);
	app.route('/api/mainlist/delete').post(MainList.deleteDetail);
};