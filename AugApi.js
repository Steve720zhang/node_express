var express = require('express');
var app = express();


module.exports = function () {


	require('./AugApiSrc/api/insert')(app);


};
var server = app.listen(8081, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})