var LeftSidebarView = function($container, model) {
	//Elements
	this.$numberOfGuests = $container.find(".guests input");
	this.$incrementButton = $container.find(".guests .increment");
	this.$decrementButton = $container.find(".guests .decrement");
	this.$totalCost = $container.find(".total-cost .cost");
	this.$confirmMenuButton = $container.find("#confirmMenu");

	//Dish has been added to the menu.
	this.addDish = function(dish) {
		var	$courseName = $container.find(".course[data-course='" + dish.category + "'] .name");
		$courseName.html(dish.name);

		this.updateCost();
	}

	//Cost has been updated in some way.
	this.updateCost = function() {
		var menu = model.getFullMenu(),
			totalCost = 0;

		for (x in menu) {
			var dish = menu[x],
				cost = model.getPriceOfDish(dish);

			var $courseCost = $container.find(".course[data-course='" + dish.category + "'] .cost");
			$courseCost.html(cost);

			totalCost += cost;
		};

		this.$totalCost.html(totalCost);
	}

	//Observer
	model.addObserver(this);
	this.update = function(type, data) {
		if (type === "changed-number-of-guests") {
			this.$numberOfGuests.val(data);
			this.updateCost();
		}

		if (type === "added-dish-to-menu") {
			this.addDish(data);
		};
	}

	//Initial load
	this.$numberOfGuests.val(model.getNumberOfGuests());
	this.$totalCost.html(model.getPriceofMenu());
};
