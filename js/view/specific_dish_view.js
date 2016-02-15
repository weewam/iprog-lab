var SpecificDishView = function($container, model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.$numberOfGuests = $container.find(".number-of-guests");
	this.$numberOfGuests.html(model.getNumberOfGuests());

	var dish = model.getDish(100);
	console.log(dish);


	this.$courseName = $container.find("h1.name");
	this.$courseName.html(dish.name);


	this.$courseDescription = $container.find("p.description");
	this.$courseDescription.html(dish.description);
	
};

