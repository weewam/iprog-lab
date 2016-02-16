$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	model.addDishToMenu(1);
	model.addDishToMenu(100);
	model.addDishToMenu(200);
	
	//And create the needed controllers and views
	var left_side_bar = new LeftSidebarView($("#left-sidebar"), model);
	var specific_dish_view = new SpecificDishView($("#specific-dish"), model);
	var select_dish_view = new SelectDishView($("#select-dish"), model);


	var exampleView = new ExampleView($("#exampleView"), model);
	var dinner_overviewView = new Dinner_overviewView($("#dinnerOverview"), model);
	var dinner_preperationView = new Dinner_preperationView($("#dinnerPreperation"), model);

});