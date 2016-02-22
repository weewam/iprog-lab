var SelectDishController = function(view, model) {
	view.$searchField.keyup(function() {
		model.setSearchString(view.$searchField.val());
	});

	view.$searchButton.click(function() {
		model.setSearchString(view.$searchField.val());
	});

	view.$courseSelector.change(function() {
		model.setCurrentFilter(view.$courseSelector.filter(":checked").val());
	});
	
}