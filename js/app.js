$(function() {
	//We instantiate our model
	var model = new DinnerModel();
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"), model);
	var dinner_overviewView = new Dinner_overviewView($("#dinner_overviewView"), model);
	var dinner_preperationView = new Dinner_preperationView($("#dinner_preperationView"), model);

});