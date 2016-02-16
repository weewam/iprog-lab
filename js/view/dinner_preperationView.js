var Dinner_preperationView = function ($container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$numberOfGuests.html(model.getNumberOfGuests());
	
	this.$menu = $container.find("#row_preperation");
	this.$menuString = "";
	
	var menu = model.getFullMenu();
	for (x in menu) {
		var dish = menu[x];
	
		var row = "<div class='row'><div class='col-md-3'>";                       
		var img = "<img src='images/" + dish.image + "' alt='Image of Food' id='prepImg'></div>";    		
		var name = "<div class='col-md-4'><h2>" + dish.name + "</h2>";
        
        var ingredients = "<table>";
        for (i in model.getAllIngredientsOfDish(dish.id)) {     	
        	ingredients += "<tr><td>" + model.getAllIngredientsOfDish(dish.id)[i] + "</td></tr>";
        }
                          
		var preperation = "<div class='col-md-5'><h3>Preperation</h3><p>" + dish.description + "</p></div>";	
	
		this.$menuString += row + img + name + ingredients + "</table></div>" + preperation + "</div>";	
		};
	
	this.$menu.html(this.$menuString);
};

