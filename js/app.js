$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	var mainController = new MainController(model);
	
	//And create the needed controllers and views
	var selectDishView = new SelectDishView($("#select-dish"), model);
 	var selectDishController = new SelectDishController(selectDishView, model, mainController);

	var leftSidebarView = new LeftSidebarView($("#left-sidebar"), model);
 	var leftSidebarController = new LeftSidebarController(leftSidebarView, model, mainController);

	var specificDishView = new SpecificDishView($("#specific-dish"), model);
 	var specificDishController = new SpecificDishController(specificDishView, model, mainController);

	var dinner_overviewView = new Dinner_overviewView($("#dinnerOverview"), model);
	var dinner_overviewController = new DinnerOverviewController(dinner_overviewView, model, mainController);
	
	var dinner_preperationView = new Dinner_preperationView($("#dinnerPreperation"), model);
	var dinner_preperationController = new DinnerPreperationController(dinner_preperationView, model, mainController);
	
 	mainController.addView("select-dish", {view: $("#select-dish"), sidebar: true, header: false});
 	mainController.addView("specific-dish", {view: $("#specific-dish"), sidebar: true, header: false});
 	mainController.addView("dinner-overview", {view: $("#dinnerOverview"), sidebar: false, header: true});
 	mainController.addView("dinner-preperation", {view: $("#dinnerPreperation"), sidebar: false, header: true});
 	mainController.load();
});