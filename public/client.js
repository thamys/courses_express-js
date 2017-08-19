$(function(){
	$.get('/blocks',appendToList);

	function appendToList(blocks) {
		var list = [];
		for(var i in blocks){
			var block = blocks[i];
			var content = '<a href="/blocks/' + block + '">' + block + '</a>';
			list.push($('<li>', {html: content}));
		}
		$('.block-list').append(list);
	}

	$('form').on('submit', function(event){
		event.preventDefault();
		var form = $(this);
		var blockData = form.serialize();

		$.ajax({
			type: 'POST',
			url: '/blocks',
			data: blockData
		}).done(function(blockName){
			appendToList([blockName]);
			form.trigger('reset');
		});
	});
});