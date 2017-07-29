(function($){
	function populateRoom(){
		let roomSelect = $('#editable-select');
		$.getJSON('/room-list', function(result){
			result.rooms.forEach(room => {
				$('#editable-select').editableSelect('add', capitalizeFirstLetter(room));
			})
		})
	}

	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	populateRoom();

	$('#joinRoomForm').submit(function(){
		if($('#name').val() == '' || $('#editable-select').val() == ''){
			alert('Please make sure the two input are not empty');
			return false;
		}
	})

	$('#editable-select').editableSelect({
		effects: 'slide',
		duration: 200,
	});
})(jQuery);