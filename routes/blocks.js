var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
	'Fixed':'Fastened securely in position', 
	'Movable':'Capable of being moved', 
	'Rotating':'Moving in a circle around its center'
};

router.route('/')
    .get(function(request, response){
		if(request.query.limit >= 0){
			response.json(Object.keys(blocks.slice(0, request.query.limit)));
		} else {
			response.json(Object.keys(blocks));
		}
	})
	.post(parseUrlencoded, function(request, response){
		var newBlock = request.body;
		blocks[newBlock.name] = newBlock.description;

		response.status(201).json(newBlock.name);
	});

router.route('/:name')
    .all(function(request, response, next){
        var name = request.params.name;
        var block =  name[0].toUpperCase() + name.slice(1).toLowerCase();

        request.blockName = block;

        next();
    })
    .delete(function(request, response){
		delete blocks[request.blockName];
		// Se colocar só status, ao invés de sendStatus o jquery não entende e não faz a ação do done.
		response.sendStatus(200);
	})
	.get(function(request, response){
		var descripton = blocks[request.blockName];
		if(!descripton){
			response.status(404).json("No description found for " +request.params.name);
		} else {
			response.json(descripton);
		}
	});

module.exports = router;