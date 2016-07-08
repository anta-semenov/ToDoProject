var webpack = require('webpack')
var config = require('./webpack.prod')

webpack(config, function (err, stats) {
	console.log(stats.errors); // по завершению, выводим всю статистику
});
