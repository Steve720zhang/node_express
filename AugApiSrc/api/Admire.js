
module.exports = {
	up: function (req, res, next) {
		var tt = new Buffer(req.body.t, 'base64').toString();
		req.models.admire.findOne({aid: req.body.aid, uid: tt}).exec(function (err, data) {
			if (err) return next(err);
			console.log('data:\n' + JSON.stringify(data));
			if (data) {
				if (data.state) {
					return res.json({code: 500, data: '您已经赞过了！'})
				} else {
					//  由踩到赞
					req.models.admire.update(data, {state: true}).exec(function (err2, data2) {
						if (err2) return next(err2);
						return res.json({code: 200, data: '已赞'})
					})
				}
			} else {
				req.models.admire.create({aid: req.body.aid, uid: tt, state: true}, function (err, data) {
					if (err) return next(err);
					return res.json(data)
				})
			}
		})
	},
	down: function (req, res, next) {
		var tt = new Buffer(req.body.t, 'base64').toString();
		req.models.admire.findOne({aid: req.body.aid, uid: tt}).exec(function (err, data) {
			if (err) return next(err);
			console.log('data:\n' + JSON.stringify(data));
			if (data) {
				if (!data.state) {
					return res.json({code: 500, data: '您已经踩过了！'})
				} else {
					//  由踩到赞
					req.models.admire.update(data, {state: false}).exec(function (err2, data2) {
						if (err2) return next(err2);
						return res.json({code: 200, data: '已踩！'})
					})
				}
			} else {
				req.models.admire.create({aid: req.body.aid, uid: tt, state: false}, function (err, data) {
					if (err) return next(err);
					return res.json(data)
				})
			}
		})
	},
	upcount: function (req, res, next) {
		req.models.admire.find({aid: req.body.id, state: true}).exec(function (err, data) {
			if (err) return next(err);
			if (data) {
				res.json({code: 200, count: data.length})
			}
		})
	},
	downcount: function (req, res, next) {
		req.models.admire.find({aid: req.body.id, state: false}).exec(function (err, data) {
			if (err) return next(err);
			if (data) {
				res.json({code: 200, count: data.length})
			}
		})
	}
};