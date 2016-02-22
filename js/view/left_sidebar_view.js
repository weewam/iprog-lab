var LeftSidebarView = function($container, model) {
	//Elements
	this.$numberOfGuests = $container.find(".guests input");
	this.$incrementButton = $container.find(".guests .increment");
	this.$decrementButton = $container.find(".guests .decrement");
	this.$totalCost = $container.find(".total-cost .cost");

	//Data
	this.load = function() {
		var menu = model.getFullMenu();

		for (x in menu) {
			var dish = menu[x],
				$course = $container.find(".course[data-course='" + dish.type + "']"),
				$courseName = $course.find(".name"),
				$courseCost = $course.find(".cost");

			$courseName.html(dish.name);
			$courseCost.html(model.getPriceOfDish(dish.id));
		}

		this.$numberOfGuests.val(model.getNumberOfGuests());
		this.$totalCost.html(model.getTotalMenuPrice());
	}

	//Observer
	model.addObserver(this);
	this.update = function(arg) {
		this.load();
	}

	this.load();
};
