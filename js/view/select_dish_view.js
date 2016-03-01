var SelectDishView = function($container, model) {
	this.$dishesContainer = $container.find("#dishes");
	this.$searchField = $container.find("input[name='search']");
	this.$searchButton = $container.find("input[name='submit']");
	this.$courseSelector = $container.find("input[name='course']");

	//Dish has been added to the menu.
	this.addDishes = function(dishes) {
		this.dishesString = "";

		for (var i = 0; i < dishes.length; i++) {
			var dish = dishes[i];

			var dishImage = '<figure><img src="' + dish.ImageURL + '"></figure>',
				dishText = '<div class="text"><h3>' + dish.Title + '</h3></div>';

			this.dishesString += '<div class="dish" data-id="' + dish.RecipeID + '" data-course="' + dish.Category + '">' + dishImage + dishText + '</div>';
		};

		$container.removeClass("not-loaded");
		this.$dishesContainer.html(this.dishesString);
	}

	//Observer code
	model.addObserver(this);
	this.update = function(type, data) {
		if (type === "updated-all-dishes") {
			this.addDishes(data);
		};

		if (type === "no-search-result") {
			$container.addClass("show-error");
			this.$dishesContainer.html("<div class='error'><span>No search result</span><p>Try searching for something else ...</p></div>");
		};

		if (type === "connection-error") {
			$container.addClass("show-error");
			this.$dishesContainer.html("<div class='error'><span>Connection error</span><p>Try again soon...</p></div>");
		};

		if (type === "searching-for-dishes") {
			$container.addClass("not-loaded");
			this.$dishesContainer.html('<div class="loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div><span>Loading dish</span></div>');
		};
	}

	model.getAllDishes(model.getCurrentFilter(), model.getSearchString());
};

