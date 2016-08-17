var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	//identity:这是主要字段，
	// 在（req.models.veri.find({}).exec...）
	// 用于操作时标识字段。
	identity: 'veri',
	connection: 'mongo',
	schema: true,
	attributes: {
		// 用户名
		u: {
			type: 'string',
			required: true,
			unique: true
		},
		// 密码
		p: {
			type: 'string'
		},
		//昵称
		nickname: {
			type: 'string'
		}
	}
});