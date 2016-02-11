var Dinner_preperationView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find("#numberOfGuests");
	this.nameOfDish = container.find("#nameOfDish");
	this.pictureOfDish = container.find("#pictureOfDish");
	this.priceOfDish = container.find("#priceOfDish");
	this.totalAmountOfMenu = container.find("#totalAmountOfMenu");
	
	this.numberOfGuests.html("5");
	this.nameOfDish.html("LASAGNE");
};

