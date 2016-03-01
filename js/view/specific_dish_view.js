var SpecificDishView = function($container, model) {
	//Elements
	this.$addDish = $container.find(".add-dish");
	this.$courseName = $container.find("h1.name");
	this.$backButton = $container.find(".back.button");
	this.$pictureOfDish = $container.find(".dish img");
	this.$ingredients = $container.find("table.ingredients");
	this.$courseDescription = $container.find("p.description");
	this.$courseInstructions = $container.find("p.instructions");
	this.$numberOfGuests = $container.find(".number-of-guests");

	//Loads a new dish
	this.loadDish = function(dish) {
		this.$courseName.html(dish.name);
		this.$courseDescription.html(dish.description);
		this.$courseInstructions.html(dish.instructions);

		this.loadIngredients();

		this.$pictureOfDish.attr("src", dish.image);
		this.$pictureOfDish.one('load',function() {
			$container.removeClass("not-loaded");
	    });
	}

	//Loads the ingredients of said dish
	//Reloads the ingredients when needed
	this.loadIngredients = function() {
		var ingredients = model.getIngredientsOfCurrentDish();
		
		var ingredientsString = "";
		for (x in ingredients) {
			var ingredient = ingredients[x];

			var	quantity = "<td><span class='quantity'>" + ingredient.amount + "</span> " + ingredient.name + "</td>",
				cost = "<td class='cost'>" + ingredient.cost + "<span class='currency'>kr</span></td>";

			ingredientsString += "<tr class='ingredient'>" + quantity + cost + "</tr>";
		}
		ingredientsString += "<tr class='total-cost'><td>Total cost:</td><td class='cost'>" + model.getPriceOfCurrentDish() + "<span class='currency'>kr</span></td></tr>";

		this.$ingredients.html(ingredientsString);
	}

	//Observer code
	model.addObserver(this);
	this.update = function(type, data) {
		if (type === "changed-number-of-guests") {
			this.$numberOfGuests.html(data);
			this.loadIngredients();
		}

		if (type === "loading-new-dish") {
			$container.addClass("not-loaded");
			$container.removeClass("no-connection");
		};

		if (type === "connection-error") {
			$container.removeClass("not-loaded");
			$container.addClass("show-error");
		};

		if (type === "updated-specific-dish") {
			this.loadDish(data);
		};
	}

	//Initial load
	this.$numberOfGuests.html(model.getNumberOfGuests());
};

