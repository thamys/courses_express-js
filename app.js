var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = {
	'Fixed':'Fastened securely in position', 
	'Movable':'Capable of being moved', 
	'Rotating':'Moving in a circle around its center'
};

app.get('/blocks', function(request, response){
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	if(request.query.limit >= 0){
		response.json(blocks.slice(0, request.query.limit));
	} else {
		response.json(blocks);
	}
});


app.get('/blocks/:name', function(request, response){
	var name = request.params.name;
	var block =  name[0].toUpperCase() + name.slice(1).toLowerCase();

	var descripton = blocks[block];
	if(!descripton){
		response.status(404).json("No description found for " +request.params.name);
	} else {
		response.json(descripton);
	}
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});