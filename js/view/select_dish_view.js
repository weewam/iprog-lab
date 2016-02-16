var SelectDishView = function($container, model) {
	var dish = model.getDish(model.getCurrentDish());

	this.$numberOfGuests = $container.find(".number-of-guests");
	this.$numberOfGuests.html(model.getNumberOfGuests());

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

	this.$pictureOfDish = $container.find(".dish img");
	this.$pictureOfDish.attr("src", "images/large-" + dish.image);

	this.$pictureOfDish.one('load',function() {
		$container.removeClass("not-loaded");
    });
};

