var Dinner_preperationView = function ($container, model) {
	
	//Elements
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$menu = $container.find("#row_preperation");
	this.$goBack = $container.find("#headerButton");
	
	//Data
	this.$numberOfGuests.html(model.getNumberOfGuests());
	
	this.load = function() {
		this.$menuString = "";
		var menu = model.getFullMenu();
		
		if (menu.length != 0) {
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
			console.log("menu is not empty");
		} else {
			var row = "<div class='col-md-3'><h2>Dish Name</h2><p id='notChosenPrep'>No dish is chosen</p></div>";
			var preperation = "<div class='col-md-5'><h3>Preperation</h3></div>";
			this.$menuString += row + preperation;
			console.log("menu is empty");
		};
		this.$menu.html(this.$menuString);
	};
	
	//Observer code
	model.addObserver(this);
	this.update = function(arg) {
		this.$numberOfGuests.html(model.getNumberOfGuests());
		this.load();
	};
	
	this.load();
};

