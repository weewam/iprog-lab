$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	model.addDishToMenu(1);
	model.addDishToMenu(100);
	model.addDishToMenu(200);
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"), model);
	var dinner_overviewView = new Dinner_overviewView($("#dinnerOverview"), model);
	var dinner_preperationView = new Dinner_preperationView($("#dinnerPreperation"), model);

});