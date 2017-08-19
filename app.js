var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var logger = require('./logger');
app.use(logger);

app.use(express.static('public'));

var blocks = {
	'Fixed':'Fastened securely in position', 
	'Movable':'Capable of being moved', 
	'Rotating':'Moving in a circle around its center'
};

var locations = {
	'Fixed':'First Floor', 
	'Movable': 'Second Floor', 
	'Rotating':'Penthouse'
};

app.param('name', function(request, response, next){
	var name = request.params.name;
	var block =  name[0].toUpperCase() + name.slice(1).toLowerCase();

	request.blockName = block;

	next();
});

app.get('/blocks', function(request, response){
	if(request.query.limit >= 0){
		response.json(Object.keys(blocks.slice(0, request.query.limit)));
	} else {
		response.json(Object.keys(blocks));
	}
});

app.post('/blocks', parseUrlencoded, function(request, response){
	var newBlock = request.body;
	blocks[newBlock.name] = newBlock.description;

	response.status(201).json(newBlock.name);
});


app.get('/blocks/:name', function(request, response){
	var descripton = blocks[request.blockName];
	if(!descripton){
		response.status(404).json("No description found for " +request.params.name);
	} else {
		response.json(descripton);
	}
});

app.get('/locations/:name', function(request, response){
	var descripton = locations[request.blockName];
	if(!descripton){
		response.status(404).json("No description found for " +request.params.name);
	} else {
		response.json(descripton);
	}
});


app.listen(3000, function(){
	console.log('Listening on port 3000');
});