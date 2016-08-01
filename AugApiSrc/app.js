var express = require('express');
var app = express();

require('./config/rount-config')(app);

module.exports = app