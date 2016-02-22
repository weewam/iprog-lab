var SpecificDishView = function($container, model) {
	//Elements
	this.$addDish = $container.find(".add-dish");
	this.$courseName = $container.find("h1.name");
	this.$backButton = $container.find(".back.button");
	this.$pictureOfDish = $container.find(".dish img");
	this.$ingredients = $container.find("table.ingredients");
	this.$courseDescription = $container.find("p.description");
	this.$numberOfGuests = $container.find(".number-of-guests");

	//Data
	this.load = function(dish) {
		this.$pictureOfDish.attr("src", "images/large/" + dish.image);
		this.$pictureOfDish.one('load',function() {
			$container.removeClass("not-loaded");
	    });

		this.$courseName.html(dish.name);
		this.$courseDescription.html(dish.description);


		this.$numberOfGuests.html(model.getNumberOfGuests());
		var ingredientsString = "";
		for (x in dish.ingredients) {
			var ingredient = dish.ingredients[x],
				quantity = "<td><span class='quantity'>" + ingredient.quantity + " "  + ingredient.unit + "</span> " + ingredient.name + "</td>",
				cost = "<td class='cost'>" + (ingredient.price * model.getNumberOfGuests()) + "<span class='currency'>kr</span></td>";

			ingredientsString += "<tr class='ingredient'>" + quantity + cost + "</tr>";
		}
		ingredientsString += "<tr class='total-cost'><td>Total cost:</td><td class='cost'>" + model.getPriceOfDish(dish.id) + "<span class='currency'>kr</span></td></tr>";
		this.$ingredients.html(ingredientsString);
	}

	//Observer code
	model.addObserver(this);
	this.update = function(arg) {
		this.load(model.getDish(model.getCurrentDish()));
	}

	this.load(model.getDish(model.getCurrentDish()));
};

