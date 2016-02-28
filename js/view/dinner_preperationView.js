var Dinner_preperationView = function ($container, model) {
	//Elements
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$menu = $container.find(".dishes");
	this.$goBack = $container.find("#headerButton");
	
	//Data
	this.$numberOfGuests.html(model.getNumberOfGuests());
	
	this.load = function() {
		this.$menuString = "";
		var menu = model.getFullMenu();
		
		if (menu.length != 0) {
			for (x in menu) {
				var dish = menu[x];

				var img = "<figure><img src='images/large/" + dish.image + "' alt='Image of Food' id='prepImg'><h2>" + dish.name + "</h2></figure>";    		

				var preperation = "<p>" + dish.description + "</p>";
		        
		        var ingredientList = "";
		        for (i in model.getAllIngredientsOfDish(dish.id)) {     	
		        	ingredientList += "<li>" + model.getAllIngredientsOfDish(dish.id)[i] + "</li>";
		        }

		        var ingredients = "<h3>Ingredients</h3><ul class='group'>" + ingredientList + "</ul>";
			
				this.$menuString += "<div class='dine'>" + img + "<div class='content'>" + preperation + ingredients + "</div></div>";
			};
		} else {
			this.$menuString = "<h1 id='notChosenPrep'>No dishes is chosen</h1>";
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

