var express = require('express');
var app = express();

app.use(require('body-parser').urlencoded({extended: true}))

require('./config/rount-config')(app);

module.exports = app