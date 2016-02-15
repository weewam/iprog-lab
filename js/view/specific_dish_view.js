var SpecificDishView = function($container, model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.$numberOfGuests = $container.find(".number-of-guests");
	this.$numberOfGuests.html(model.getNumberOfGuests());

	var dish = model.getDish(100);
	console.log(dish);

	this.$pictureOfDish = $container.find(".dish img");
	this.$pictureOfDish.attr("src", "images/large-" + dish.image);

	this.$courseName = $container.find("h1.name");
	this.$courseName.html(dish.name);

	this.$courseDescription = $container.find("p.description");
	this.$courseDescription.html(dish.description);

	this.$ingredients = $container.find("table.ingredients");
	this.$ingredientsString = "";

	for (x in dish.ingredients) {
		var ingredient = dish.ingredients[x];
		var quantity = "<td><span class='quantity'>" + ingredient.quantity + " "  + ingredient.unit + "</span> " + ingredient.name + "</td>";
		var name = "";
		var cost = "<td class='cost'>" + (ingredient.price * model.getNumberOfGuests()) + "<span class='currency'>kr</span></td>";

		this.$ingredientsString += "<tr class='ingredient'>" + quantity + cost + "</tr>";
	}


		this.$ingredientsString += "<tr class='total-cost'><td>Total cost:</td><td class='cost'>" + model.getPriceOfDish(dish.id) + "<span class='currency'>kr</span></td></tr>";


	this.$ingredients.html(this.$ingredientsString);

	
	
};

