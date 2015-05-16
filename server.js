
var express = require('express');
var app = express();

// Creating ESlint stream
var LintStream = require('jslint').LintStream;
var options = {
    "edition": "latest",
    "length": 100
}
linter = new LintStream(options);


app.get('/', function(req, res){
	var fileName, fileContents;
	fileContents = req.query.code;
	linter.write({file: fileName, body: fileContents});

	linter.on('data', function (chunk, encoding, callback) {
	    assert.deepEqual(chunk.file, fileName);
	    console.log(chunk.linted	)
	    errors = chunk.linted
	});
	res.send(errors);


});

app.listen(3000);
