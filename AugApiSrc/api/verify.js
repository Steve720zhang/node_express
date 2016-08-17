var timeTool = require('../config/time-tool')
var mongodb = require('mongodb');
var db = require('../DatabaseAbout/mongo-db')

module.exports = {
	login: function (req, res, next) {
		if (!req.body.u || req.body.u === '') {
			res.send({rr: 0, r: '请输入用户名'})
			return
		}
		if (!req.body.p || req.body.p === '') {
			res.send({rr: 0, r: '请输入密码'})
			return
		}
		req.models.veri.findOne({u: req.body.u}).exec(function (err, data) {
			if (err) return next(err);
			if (data) {
				if (String(data.p) === req.body.p) {
					return res.json({code: 200, data: data});
				} else {
					return next(new Error('账号或密码错误'))
				}
			}
			return next(new Error('此账号没有注册'));
		});
	},
	registry: function (req, res, next) {
		if (!req.body.u || req.body.u === '') {
			res.send({rr: 0, r: '请输入用户名'})
			return
		}
		if (!req.body.p || req.body.p === '') {
			res.send({rr: 0, r: '请输入密码'})
			return
		}
		var nickyname = null;
		if (!req.body.nickname || req.body.nickname === '') {
			nickyname = (new Buffer('' + new Date().getTime())).toString('base64');
		} else {
			nickyname = req.body.nickname;
		}
		var info = {
			u: req.body.u,
			p: req.body.p,
			nickname: nickyname
		}
		console.log('API:  registry!\ninfo:' + JSON.stringify(info));
		req.models.veri.create(info).exec(function (err, data) {
			if (err) return next(new Error('帐号已经存在或其他信息不规范'));
			if (data) {
				return res.json(data);
			} else {
				return next(new Error('帐号已经存在或其他信息不规范'))
			}
		});
	},
	info: function (req, res, next) {
		if (!req.body.t || req.body.t === '') {
			res.send({rr: 0, r: '请输入token'})
			return
		}
		//解base64
		var tt = new Buffer(req.body.t, 'base64').toString()
		console.log('id:',tt);
		if (tt.length != 24) return next(new Error('id格式有误'))
		req.models.veri.findOne({'_id': mongodb.ObjectId(tt)}).exec(function (err, data) {
			if (err) return next(new Error('查无信息'))
			return res.json({code: 200, data: data})
		});
	}
};