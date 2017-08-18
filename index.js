var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.write('Hello Wordl');
	response.end();
	// This two function above are the same thing that "response.send"
});

app.get('/blocks', function(request, response){
	var blocks = ['Fixed', 'Movble', 'Rotating'];
	response.send(blocks);
});

app.get('/parts', function(request, response){
	response.redirect(301, "/blocks");
});


app.listen(3000, function(){
	console.log('Listening on port 3000');
});