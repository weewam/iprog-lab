var SpecificDishController = function(view, model, mainController) {
	view.$addDish.click(function() {
		model.addDishToMenu(model.getCurrentDish());
	});

	view.$backButton.click(function() {
		mainController.navigateTo("select-dish");
	});
}