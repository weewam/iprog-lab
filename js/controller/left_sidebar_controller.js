var LeftSidebarController = function(view, model, mainController) {
	view.$incrementButton.click(function() {
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.$decrementButton.click(function() {
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});
	
	view.$confirmMenuButton.click(function() {
		mainController.navigateTo("dinner-overview")
	});
}