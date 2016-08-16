var mysql = require('mysql');

var TEST_DATABASE = 'zzq';
var TEST_TABLE = 'zzqmain';

//创建连接

module.exports = {
	queryDb: function (tableName) {
		var client = this.connectDb();
		client.query('SELECT * FROM ' + tableName,
			function selectCb(err, results) {
				if (err) {
					throw err;
				}
				if (results) {
					for (var i = 0; i < results.length; i++) {
						console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].age);
					}
				}
				client.close();
				client.end();
			}
		)
	},
	exeDb: function (SQLString,tableName) {
		if (!tableName) tableName = TEST_TABLE;

		var client = this.connectDb();
		client.query(SQLString,
		function selectCb(err, results) {
			if (err) {
				throw err;
			}
			if (results) {

			}
			client.close();
			client.end();
		})
	},
	connectDb: function (tableName) {
		var client = mysql.createConnection({
			host: '127.0.0.1',
			user: 'root',
			password: '123456',
			database: 'zzq'
		})
		client.connect();
		return client;
	}

}
