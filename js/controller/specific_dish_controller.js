var SpecificDishController = function(view, model ) {
	view.$addDish.click(function() {
		model.addDishToMenu(model.getCurrentDish());
	});
}