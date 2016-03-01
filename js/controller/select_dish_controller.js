var SelectDishController = function(view, model, mainController) {
	view.$dishesContainer.on("click", ".dish", function() {
		var dishID = $(this).data("id");

		if (dishID !== model.getCurrentDish().id) {
			model.getDish(dishID);
		};

		mainController.navigateTo("specific-dish");
	});

	view.$searchButton.click(function() {
		model.setSearchString(view.$searchField.val());
		model.getAllDishes(model.getCurrentFilter(), model.getSearchString());
	});

	view.$courseSelector.change(function() {
		model.setCurrentFilter(view.$courseSelector.filter(":checked").val());
		model.getAllDishes(model.getCurrentFilter(), model.getSearchString());
	});
}