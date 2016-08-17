var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
	//identity:这是主要字段，
	// 在（req.models.veri.find({}).exec...）
	// 用于操作时标识字段。
	identity: 'maincontent',
	connection: 'mongo',
	schema: true,
	attributes: {
		cid: {
			type: 'integer',
			index: true,
			required: true
		},
		content: {
			type: 'string',
			required: true
		}
	}
});