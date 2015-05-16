
var express = require('express');
var app = express();

// Creating jslint stream
var LintStream = require('jslint').LintStream;
var options = {
    "edition": "latest",
    "length": 100
}

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
