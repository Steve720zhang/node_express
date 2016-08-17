var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	//identity:这是主要字段，

	identity: 'mainlist',
	connection: 'mysql',
	schema: true,
	charset: 'utf-8',
	attributes: {
		//  详情主字段正文存储在mongo数据库
		//	主id
		id: {
			type: 'integer',
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		//  相关详情id
		uuid: {
			type: 'string',
			maxLength: 24,
			defaultsTo: ''
		},
		//	文章标题
		title: {
			type: 'string',
			minLength: 1,
			required: true,
			maxLength: 30,
		},
		//	正文内容简讯
		contentpre: {
			type: 'string',
			required: true,
			minLength: 10,
		},
		//	主图
		image: {
			type: 'string',
		},
		// 多图图片url，string类型，逗号分隔。
		imgs: {
			type:'string',
		},
		up: {
			type: 'integer',
			defaultsTo: 0,
		},
		down: {
			type: 'integer',
			defaultsTo: 0,
		},
		from: {
			type: 'string',
		},
		//  发布时间
		time: {
			type: 'date',
		},
		price: {
			type: 'string',
		},
		collect: {
			type: 'integer',
			defaultsTo: 0,
		},
		comment: {
			type: 'integer',
			defaultsTo: 0,
		},
		//  以下两个字段是预留字段
		ElementOne: {
			type: 'string',
		},
		ElementTwo: {
			type: 'string',
		}
	}
});