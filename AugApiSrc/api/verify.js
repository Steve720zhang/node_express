var timeTool = require('../config/time-tool')

var db = require('../config/mongo-db')

module.exports = {
	login: function(req, res){
		if (!req.body.u || req.body.u === '') {
			res.send({rr:0,r:'请输入用户名'})
			return
		}
		if (!req.body.p || req.body.p === '') {
			res.send({rr:0,r:'请输入密码'})
			return
		}
		var info = {
			u: req.body.u,
			p: req.body.p
		}
		console.log('API:  login!\ninfo:'+JSON.stringify(info));
		db.login('veri', info, res)
	},
	registry: function (req, res) {
		if (!req.body.u || req.body.u === '') {
			res.send({rr:0,r:'请输入用户名'})
			return
		}
		if (!req.body.p || req.body.p === '') {
			res.send({rr:0,r:'请输入密码'})
			return
		}
		var nickyname =null;
		if (!req.body.nickname || req.body.nickname === '') {
			nickyname = (new Buffer(''+new Date().getTime())).toString('base64');
		} else {
			nickyname = req.body.nickname;
		}
		var info = {
			u: req.body.u,
			p: req.body.p,
			nickname: nickyname
		}
		console.log('API:  registry!\ninfo:'+JSON.stringify(info));
		db.register('veri', info, res)
	},
	info: function (req, res) {
		if (!req.body.t || req.body.t === '') {
			res.send({rr:0,r:'请输入token'})
			return
		}
		//解base64
		var tt = new Buffer(req.body.t,'base64').toString()
		db.userInfo('veri',tt , res)
	}
};