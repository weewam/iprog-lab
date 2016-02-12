var Dinner_preperationView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = document.getElementById("numberOfGuests");
	this.nameOfDish = document.getElementById("nameOfDish");
	this.pictureOfDish = document.getElementById("pictureOfDish");
	this.preperationOfDish = document.getElementById("preperationOfDish");
	this.ingredientsOfDish = document.getElementById("ingredientsOfDish");
	
	this.numberOfGueststextContent = model.getNumberOfGuests();
	
	for (dish in model.getFullMenu()) {
		this.nameOfDish.textContent = dish.name;
		this.pictureOfDish = dish.image;
		this.preperationOfDish.textContent = dish.description;
		this.ingredientsOfDish.textContent = model.getAllIngredientsOfDish();
	};
	
};

