
var express = require('express');
var app = express();

// Creating ESlint stream
var linter = require("eslint").linter;
var linterConf = { rules: { "semi": 1, "no-empty": 1, "no-empty-class": 1, "no-obj-calls": 1, "no-regex-spaces": 1, "no-undef": 1, "no-undefined": 1, "comma-spacing": 1, "comma-style": 1, "consistent-this": 1 , "camelcase": 1, "indent": 1, "space-in-brackets": 1} };

app.get('/', function(req, res){
	res.send('is working');
});

app.get('/code', function(req, res){
	code = req.query.code;
	var messages = linter.verify(code, linterConf);
	res.send(messages);
});

app.listen(3000);
