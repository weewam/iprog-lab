var SpecificDishView = function($container, model) {
	//Elements
	this.$addDish = $container.find(".add-dish");
	this.$courseName = $container.find("h1.name");
	this.$pictureOfDish = $container.find(".dish img");
	this.$ingredients = $container.find("table.ingredients");
	this.$courseDescription = $container.find("p.description");
	this.$numberOfGuests = $container.find(".number-of-guests");

	//Data
	var dish = model.getDish(model.getCurrentDish());
	var ingredientsString = "";
	for (x in dish.ingredients) {
		var ingredient = dish.ingredients[x],
			quantity = "<td><span class='quantity'>" + ingredient.quantity + " "  + ingredient.unit + "</span> " + ingredient.name + "</td>",
			cost = "<td class='cost'>" + (ingredient.price * model.getNumberOfGuests()) + "<span class='currency'>kr</span></td>";

		ingredientsString += "<tr class='ingredient'>" + quantity + cost + "</tr>";
	}
	ingredientsString += "<tr class='total-cost'><td>Total cost:</td><td class='cost'>" + model.getPriceOfDish(dish.id) + "<span class='currency'>kr</span></td></tr>";
	
	this.$courseName.html(dish.name);
	this.$ingredients.html(ingredientsString);
	this.$courseDescription.html(dish.description);
	this.$numberOfGuests.html(model.getNumberOfGuests());

	this.$pictureOfDish.attr("src", "images/large-" + dish.image);
	this.$pictureOfDish.one('load',function() {
		$container.removeClass("not-loaded");
    });

	//Observer code
	model.addObserver(this);
	this.update = function(arg) {
		this.$numberOfGuests.html(model.getNumberOfGuests());
		ingredientsString = "";

		for (x in dish.ingredients) {
			var ingredient = dish.ingredients[x];
			var quantity = "<td><span class='quantity'>" + ingredient.quantity + " "  + ingredient.unit + "</span> " + ingredient.name + "</td>";
			var name = "";
			var cost = "<td class='cost'>" + (ingredient.price * model.getNumberOfGuests()) + "<span class='currency'>kr</span></td>";

			ingredientsString += "<tr class='ingredient'>" + quantity + cost + "</tr>";
		}

		ingredientsString += "<tr class='total-cost'><td>Total cost:</td><td class='cost'>" + model.getPriceOfDish(dish.id) + "<span class='currency'>kr</span></td></tr>";
		this.$ingredients.html(ingredientsString);
	}
};

