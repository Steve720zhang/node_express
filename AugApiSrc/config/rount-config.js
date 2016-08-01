// var FileController = require('../controllers/file.server.controller');

module.exports = function(app){
	app.get('/api/file/upload/key', function (req, res, next) {
		res.send('get in config')
		console.log('config--get')

	});
};