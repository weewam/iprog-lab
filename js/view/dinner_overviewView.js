var Dinner_overviewView = function ($container, model) {
	//Elements
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$totalAmountOfMenu = $container.find("#totalAmountOfMenu");
	this.$goBack = $container.find("#headerButton");
	this.$printRecipe = $container.find("#printButton");
	
	//Data
	this.$numberOfGuests.html(model.getNumberOfGuests());
	this.$totalAmountOfMenu.html(model.getTotalMenuPrice());
	this.$menu = $container.find("#row_overview");
	
	this.load = function() {
		this.$menuString = "";
		var menu = model.getFullMenu();
		x = 0;
		i = 0;
		
		while (x < 3) {
			var dish = menu[i];
			
			if (dish != null) {
				if (dish.type == 'starter' && x == 0 || dish.type == 'main dish' && x == 1 || dish.type == 'dessert' && x == 2) {
					var row = "<div class='col-lg-3'>"; 
					var img = "<img src='images/" + dish.image + "' alt='Image of Food' id='overImg'>";                          
					var name = "<h3 id='nameDish'>" + dish.name + "</h3>";					
					var price = "<p id='priceDish'>" + model.getPriceOfDish(dish.id) + " SEK</p>";
					this.$menuString += row + img + name + price + "</div>";
					i++;
				} else {
					var row = "<div class='col-lg-3'><div id='notChosen' class='alert alert-info' role='alert'><p>No dish is chosen</p></div></div>";
					this.$menuString += row;
				}
			} else {
				var row = "<div class='col-lg-3'><div id='notChosen' class='alert alert-info' role='alert'><p>No dish is chosen</p></div></div>";
				this.$menuString += row;
			}
			x++;
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
