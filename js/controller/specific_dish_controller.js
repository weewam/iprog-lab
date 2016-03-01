var SpecificDishController = function(view, model, mainController) {
	view.$addDish.click(function() {
		model.addCurrentDishToMenu();
	});

	view.$backButton.click(function() {
		mainController.navigateTo("select-dish");
	});
}