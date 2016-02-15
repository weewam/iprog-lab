var LeftSidebarView = function($container, model) {
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.$numberOfGuests = $container.find(".guests input");
	this.$numberOfGuests.val(model.getNumberOfGuests());

	var menu = model.getFullMenu();
	for (x in menu) {
		var dish = menu[x],
			$course = $container.find(".course[data-course='" + dish.type + "']"),
			$courseName = $course.find(".name"),
			$courseCost = $course.find(".cost");

		$courseName.html(dish.name);
		$courseCost.html("100");
	}

	this.$totalCost = $container.find(".total-cost .cost");
	this.$totalCost.html(model.getTotalMenuPrice());


	
	
};

