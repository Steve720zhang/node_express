
module.exports = {
	do: function(req, res, next){
		req.models.veri.find({}).exec(function (err, data) {
			if (err) return next(err);
			return next(data);
		});
	}
};