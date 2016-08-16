var Waterline = require('waterline');
var mongoAdapter = require('sails-mongo');
var mysqlAdapter = require('sails-mysql');

var adapters = {
	mongo: mongoAdapter,
	mysql: mysqlAdapter,
	default: 'mongo'
};

var connections = {
	mongo: {
		adapter: 'mongo',
		url: 'mongodb://localhost:27017/zzq'
	},
	mysql: {
		adapter: 'mysql',
		// host: '127.0.0.1',
		// user: 'root',
		// password: '123456',
		// database: 'zzq'
		url: 'mysql://zzq:123456@127.0.0.1:3306/zzq'
	}
};

var User = Waterline.Collection.extend({
	identity: 'user',
	connection: 'mysql',//此参数可决定使用何种数据库（都已跑通）
	schema: true,
	attributes: {
		/**
		 * u:用户名
		 * p:密码
		 * nickname:昵称
		 */
		u: {
			type: 'string',
			required: true,
			maxLength:12,
			minLength:2,
			unique:true
		},
		p: {
			type: 'string',
			required: true,
			maxLength:18,
			minLength:6
		},
		nickname: {
			type: 'string',
			maxLength: 20,
		},
		registerAt:{
			type:'date',
		}
	},
	/**
	 * 这是一个生命周期函数
	 */
	beforeCreate: function (value, cb) {
		value.createTime = new Date();
		console.log('beforeCreate executed!');
		return cb();
	}
});

var orm = new Waterline();

orm.loadCollection(User);

var config = {
	adapters: adapters,
	connections:connections
}

orm.initialize(config,function (err,models) {
	if (err) {
		console.log('ORM connect failed!\n',err);
		return;
	}
	models.collections.user.create({u: '张泽群',p:'123456'},function (err, user) {
		if (err) {
			console.log('ERR:\n',err);
		}
		if (user) {
			console.log('user:'+JSON.stringify(user));
		}
	});
})