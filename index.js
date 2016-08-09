var app = require('./AugApiSrc/app')

var server = app.listen(9017, function () {

	var host = server.address().address
	var port = server.address().port

	console.log("应用实例，访问地址为 http://%s:%s", host, port)

})