var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(require('body-parser').urlencoded({extended: true}));

require('./config/rount-config')(app);

module.exports = app