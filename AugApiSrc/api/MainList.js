module.exports = {
	mainlist: function (req, res, next) {
		var pageSize = 10;
		var pageSkip = 0;
		if (req.query.pagesize && req.query.pagesize > 0) pageSize = req.query.pagesize;
		if (req.query.page && req.query.page > 0) pageSkip = (req.query.page - 1) * pageSize;
		req.models.mainlist
			.find({where: {}, limit: pageSize, skip: pageSkip, sort: 'id ASC'})
			.exec(function (err, data) {
				if (err) return next(err)
				return res.json({code: 200, curLength: data.length, list: data})
			})
	},
	add: function (req, res, next) {
		console.log(req.body);
		req.models.mainlist
			.create({
				title: req.body.title,
				contentpre: req.body.content,
				image: req.body.image,
				imgs: req.body.imgs,
				from: req.body.from,
				price: req.body.price,
				time: new Date()
			}, function (err, data) {
				if (err) return next(new Error(err))
				if (data) return res.json({code: 200, info: '操作成功', data: data})
			})
	},
	selectDetail: function (req, res, next) {
		if (!req.body.id) next(new Error('请输入正确的id'))
		req.models.mainlist
			.findOne({id: req.body.id})
			.exec(function (err, data) {
				if (err) return next(err)
				if (data) {
					return res.json({code: 200, data: data})
				} else {
					return next(new Error('查无结果'))
				}
			})
	},
	deleteDetail: function (req, res, next) {
		if (!req.body.id) next(new Error('请输入正确的id'))
		req.models.mainlist
			.destroy({id: req.body.id})
			.exec(function (err, data) {
				console.log(data);
				if (err) return next(err)
				if (data) {
					if (data.length > 0) {
						return res.json({code: 200, info: '已删除', data: data})
					} else {
						return next(new Error('查无结果'))
					}
				} else {
					return next(new Error('查无结果'))
				}
			})
	}
};