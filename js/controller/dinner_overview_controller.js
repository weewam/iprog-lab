var DinnerOverviewController = function(view, model, mainController) {
	view.$goBack.click(function() {
		mainController.navigateTo("select-dish");
	});
	
	view.$printRecipe.click(function() {
		mainController.navigateTo("dinner-preperation");
	});
	
};
