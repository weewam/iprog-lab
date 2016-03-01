var Dinner_overviewView = function ($container, model) {
	//Elements
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$totalAmountOfMenu = $container.find("#totalAmountOfMenu");
	this.$goBack = $container.find("#headerButton");
	this.$printRecipe = $container.find("#printButton");
	
	//Data
	this.addDish = function(data) {
		var dish = data;

		var	$course = $container.find(".dish[data-course='" + dish.category + "']"),
			$courseName = $course.find("#nameDish"),
			$coursePrice = $course.find("#priceDish"),
			$courseFigure = $course.find("figure"),
			$courseImage = $course.find("#overImg");

		$course.removeClass("none-chosen");
		$courseFigure.show();

		$courseName.html(dish.name);
		$courseImage.attr("src", dish.image);
		$coursePrice.html(model.getPriceOfSelectedDish(dish.category));

		this.updateCost();
	};

	this.updateCost = function() {
		var menu = model.getFullMenu(),
			totalCost = 0;

		for (x in menu) {
			var dish = menu[x],
				cost = model.getPriceOfDish(dish);

			var $courseCost = $container.find(".dish[data-course='" + dish.category + "'] #priceDish");
			$courseCost.html(cost);

			totalCost += cost;
		};

		this.$totalAmountOfMenu.html(totalCost);
	}
	
	//Observer code
	model.addObserver(this);
	this.update = function(type, data) {
		if (type === "changed-number-of-guests") {
			this.$numberOfGuests.html(data);
			this.updateCost();
		}

		if (type === "added-dish-to-menu") {
			this.addDish(data);
		};
	};

	//Initial load
	this.$numberOfGuests.html(model.getNumberOfGuests());
	this.$totalAmountOfMenu.html(model.getPriceofMenu());
};
