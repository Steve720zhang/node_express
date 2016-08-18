var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	//identity:这是主要字段，
	// 在（req.models.veri.find({}).exec...）
	// 用于操作时标识字段。
	identity: 'admire',
	connection: 'mysql',
	schema: true,
	attributes: {
		// 用户名
		aid: {
			type: 'integer',
			required: true,
			index: true
		},
		uid: {
			type: 'string',
			required: true,
			index: true
		},
		state: {
			type: 'boolean'
		}
	},
});