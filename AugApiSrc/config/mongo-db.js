var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true, poolSize: 10});
var db = new mongodb.Db('zzq', mongodbServer);


module.exports = {

	insertDb: function (tableName, objt) {

		db.open(function () {
			/* Select 'contact' collection */
			db.collection(tableName, function (err, collection) {
				if (err) {
					console.log('connect err!')
				}
				collection.insert(objt, function (err, data) {
					if (data) {
						console.log('Successfully Insert');
						db.close();
						return true;
					} else {
						console.log('Failed to Insert');
						db.close();
						return false;
					}
				});

			});
		})
	}

};

// var mongodb = require('mongodb');
//
// var mongodbServer = new mongodb.Server('localhost', 27017, {auto_reconnect: true, poolSize: 10});
//
// exports.dba = mongodbServer;