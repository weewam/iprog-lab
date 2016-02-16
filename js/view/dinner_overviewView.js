var Dinner_overviewView = function ($container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$numberOfGuests.html(model.getNumberOfGuests());
	
	this.$totalAmountOfMenu = $container.find("#totalAmountOfMenu");
	this.$totalAmountOfMenu.html(model.getTotalMenuPrice());
	
	this.$menu = $container.find("#row_overview");
	this.$menuString = "";
	var menu = model.getFullMenu();
	for (x in menu) {
		var dish = menu[x];
	
		var row = "<div class='col-lg-3'>"; 
		var img = "<img src='images/" + dish.image + "' alt='Image of Food' id='overImg'>";                          
		var name = "<h3 id='nameDish'>" + dish.name + "</h3>";
		var price = "<p id='priceDish'>" + model.getPriceOfDish(dish.id) + " SEK</p>";
	
		this.$menuString += row + img + name + price + "</div>";
	};
		
	this.$menu.html(this.$menuString);
};
