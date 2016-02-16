var SelectDishView = function($container, model) {
	$container.removeClass("not-loaded");


	this.$dishes = $container.find("#dishes");
	this.dishesString = "";


	var dishes = model.getAllDishes(model.getCurrentFilter(), model.getSearchString());

	for (var i = 0; i < dishes.length; i++) {
		var dish = dishes[i];

		console.log(dish);

		var dishImage = '<figure><img src="images/' + dish.image + '"></figure>';


		var dishText = '<div class="text">\
							<h3>' + dish.name + '</h3>\
							<p>' + dish.description + '</p>\
						</div>';
		this.dishesString += '<div class="dish">' + dishImage + dishText + '</div>';
	};


	for (x in dishes) {
	};

	this.$dishes.html(this.dishesString);
};

