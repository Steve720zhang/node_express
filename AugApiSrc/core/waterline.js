var Waterline = require('waterline');
var mongoAdapter = require('sails-mongo');
var mysqlAdapter = require('sails-mysql');

var User = require('../schema/server.login.js');
var MainContent = require('../schema/server.maincontent');
var MainList = require('../schema/server.mainlist');
var Admire = require('../schema/Admire');

var wlconfig = {
	adapters: {
		mongo: mongoAdapter,
		mysql: mysqlAdapter,
		default: 'mongo'
	},
	connections: {
		mongo: {
			adapter: 'mongo',
			url: 'mongodb://localhost:27017/zzq'
		},
		mysql: {
			adapter: 'mysql',
			url: 'mysql://zzq:123456@127.0.0.1:3306/zzq'
		}
	}
};

var orm = new Waterline();
//collections记录：
//mongo: veri(用户表) maincontent(主列表正文全文)
//mysql: mainlist(主列表无全文)
orm.loadCollection(User);
orm.loadCollection(MainContent);
orm.loadCollection(MainList);
orm.loadCollection(Admire);

exports.wlconfig = wlconfig;
exports.orm = orm;
