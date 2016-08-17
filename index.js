var app = require('./AugApiSrc/core/express');
var waterline = require('./AugApiSrc/core/waterline');

// 先进行 waterline 的初始化，再执行 express 实例的监听
waterline.orm.initialize(waterline.wlconfig, function(err, models){
	if(err) {
		console.log('waterline initialize failed, err:', err);
		return;
	}
	// 将 waterline 的数据集合附加到 express 实例中
	app.set('models', models.collections);

	app.listen(9017, function(){
		console.log('app started, listening on port: ', '9017');
	});
});
