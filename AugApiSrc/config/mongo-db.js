var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true, poolSize: 20});
var db = new mongodb.Db('zzq', mongodbServer);
var OBid = mongodb.ObjectId;
module.exports = {
	/**
	 * insert接口，插入一条新数据
	 * @param tableName
	 * @param objt
	 */
	insertDb: function (tableName, objt, res) {
		db.open(function () {
			/* Select 'contact' collection */
			db.collection(tableName, function (err, collection) {
				if (err) {
					console.log('connect err!');
					throw err;
				}
				if (!objt.body.title) {
					objt.body.title = '默认标题'
				}
				if (!objt.body.content) {
					objt.body.content = '默认内容'
				}
				collection.insert(objt, function (err, data) {
					if (data) {
						console.log('Successfully Insert into Mongo');
						res.send({rr:1,r:'操作成功'})
					} else {
						console.log('Failed to Insert in Mongo');
						res.send({rr:0,r:'操作失败'})
					}
				});
			});
			db.close();
		})
	},
	/**
	 * list接口，用于显示全部数据的列表接口
	 * @param tableName
	 * @param res
	 * @param skip
	 */
	list: function (tableName, res, skip) {
		db.open(function () {
			db.collection(tableName, function (err, collection) {
				if (err) {
					db.close();
					throw err;
					return;
				}
				collection.find({}, skip, function (err, data) {
					if (err) {
						throw err;
						db.close()
					}
					if (data) {
						data.toArray(function (err, datas) {
							if (err) {
								console.log('err !!')
								throw err;
								return;
							}
							db.close()
							var all = {};
							all.code = 200
							all.currentCount = datas.length
							all.filter = skip
							all.list = datas
							res.send(all);
							console.log('list successsss!')
						})
					}
				})
			})
		})
	},
	/**
	 * 查询接口，用于通过id查询到确切的一条数据
	 * @param tableName
	 * @param res
	 * @param idString
	 */
	selectOne: function (tableName, res, idString) {
		if (!idString || idString.length !== 24) {
			res.send({err: '参数不齐或有误'})
			return;
		}
		db.open(function () {
			db.collection(tableName, function (err, collection) {
				if (err) {
					db.close();
					throw err;
					return;
				}
				var idNow = OBid(idString)
				collection.find({'_id': idNow}, function (err, data) {
					if (err) {
						db.close()
						console.log('err here')
						throw err;
					}
					if (data) {
						data.toArray(function (err, datas) {
							console.log('selectOne!!!\ndatas.length:' + datas.length);
							if (err) {
								console.log('err !!');
								db.close();
								throw err;
								return;
							}
							db.close();
							if (datas.length === 0) {
								res.send({rr: 0,r:'没有这条数据'})
							} else {
								res.send(datas[0]);
							}
						})
					}
				})
			})
		})
	},
	/**
	 * 删除一条数据，通过id定位。
	 * @param tableName
	 * @param res
	 * @param idString
	 */
	deleteOne: function (tableName, res, idString) {
		if (!idString || idString.length !== 24) {
			res.send({err: '参数不齐或有误'})
			return;
		}
		db.open(function () {
			db.collection(tableName, function (err, collection) {
				if (err) {
					db.close();
					throw err;
					return;
				}
				collection.remove({'_id': OBid(idString)}, {justOne: true}, function (err, data) {
					if (data) {
						var oj = data.toJSON();
						console.log('oj:' + oj + '-' + oj.n);
						if (Number(oj.n) === 1) {
							res.send({rr: 1, r: '操作成功'})
						} else {
							res.send({rr: 0, r: '操作失败'})
						}
						db.close()
					}
				})
			})
		})
	},
	/**
	 * 更改一条数据
	 * @param tableName
	 * @param res
	 * @param idString
	 * @param newObj
	 */
	changeOne: function (tableName, res, idString, newObj) {
		if (!idString || idString.length !== 24) {
			res.send({err: '参数不齐或有误'})
			return;
		}
		db.open(function () {
			db.collection(tableName, function (err, collection) {
				if (err) {
					db.close();
					throw err;
					return;
				}
				collection.update({'_id': OBid(idString)}, newObj, function (err, data) {
					if (err) {
						console.log('err change');
						throw err;
					}
					if (data) {
						var oj = data.toJSON();
						if (Number(oj.ok) === 1) {
							res.send({rr: 1, r: '操作成功'});
							db.close();
							return;
						} else {
							res.send({rr: 0, r: '操作失败~'});
							db.close();
							return;
						}
					} else {
						res.send({rr: 0, r: '操作失败!'});
						db.close();
						return;
					}
				})
			})
		})
	}
};