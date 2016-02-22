var SelectDishView = function($container, model) {
	this.$dishesContainer = $container.find("#dishes");
	this.$searchField = $container.find("input[name='search']");
	this.$searchButton = $container.find("input[name='submit']");
	this.$courseSelector = $container.find("input[name='course']");

	this.load = function() {
		this.dishesString = "";
		var dishes = model.getAllDishes(model.getCurrentFilter(), model.getSearchString());

		for (var i = 0; i < dishes.length; i++) {
			var dish = dishes[i];

			var dishImage = '<figure><img src="images/' + dish.image + '"></figure>';
			var dishText = '<div class="text">\
								<h3>' + dish.name + '</h3>\
								<p>' + dish.description + '</p>\
							</div>';

			this.dishesString += '<div class="dish" data-id="' + dish.id + '">' + dishImage + dishText + '</div>';
		};

		this.$dishesContainer.html(this.dishesString);
	}

	//Observer code
	model.addObserver(this);
	this.update = function(arg) {
		this.load();
	}
	
	this.load();
};

