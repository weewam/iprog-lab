var Dinner_overviewView = function ($container, model) {
	//Elements
	this.$numberOfGuests = $container.find("#numberOfGuests");
	this.$totalAmountOfMenu = $container.find("#totalAmountOfMenu");
	this.$goBack = $container.find("#headerButton");
	this.$printRecipe = $container.find("#printButton");
	
	//Data
	this.$numberOfGuests.html(model.getNumberOfGuests());
	this.$totalAmountOfMenu.html(model.getTotalMenuPrice());
	this.$menu = $container.find("#row_overview");
	
	this.load = function() {
		this.$menuString = "";
		var menu = model.getFullMenu();

		for (x in menu) {
			var dish = menu[x];
			$course = $container.find(".dish[data-course='" + dish.type + "']");
			$courseName = $course.find("#nameDish");
			$coursePrice = $course.find("#priceDish");
			$courseFigure = $course.find("figure");
			$courseImage = $course.find("#overImg");

			$course.removeClass("none-chosen");
			
			$courseFigure.show();
			$courseName.html(dish.name);
			$coursePrice.html(model.getPriceOfDish(dish.id));
			$courseImage.attr("src", "images/" + dish.image);
		};
		
	};
	
	//Observer code
	model.addObserver(this);
	this.update = function(arg) {
		this.$numberOfGuests.html(model.getNumberOfGuests());
		this.$totalAmountOfMenu.html(model.getTotalMenuPrice());
		this.load();
	};
	
	this.load();
};
