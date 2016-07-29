
module.exports = function (app) {
	app.get('/insert/do', function (req, res, next) {
		req.result = {r: true};
		return next();
	});
}