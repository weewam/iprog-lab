$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var leftSidebarView = new LeftSidebarView($("#left-sidebar"), model);
 	var leftSidebarController = new LeftSidebarController(leftSidebarView, model);

	var specificDishView = new SpecificDishView($("#specific-dish"), model);
 	var specificDishController = new SpecificDishController(specificDishView, model);

	var selectDishView = new SelectDishView($("#select-dish"), model);
 	var selectDishController = new SelectDishController(selectDishView, model);

	var exampleView = new ExampleView($("#exampleView"), model);
	var dinner_overviewView = new Dinner_overviewView($("#dinnerOverview"), model);
	var dinner_preperationView = new Dinner_preperationView($("#dinnerPreperation"), model);

});