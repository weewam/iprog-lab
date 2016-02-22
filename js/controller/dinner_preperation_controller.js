var DinnerPreperationController = function(view, model, mainController) {
	view.$goBack.click(function() {
		mainController.navigateTo("select-dish");
	});
};