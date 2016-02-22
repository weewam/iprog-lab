var SelectDishController = function(view, model, mainController) {
	view.$dishesContainer.on("click", ".dish", function() {
		var dishID = $(this).data("id");

		model.setCurrentDish(dishID);
		mainController.navigateTo("specific-dish");
	});

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