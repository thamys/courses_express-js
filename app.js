var express = require('express');
var app = express();

app.get('/', function(request, response){
	response.sendfile(__dirname + '/public/index.html');
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});