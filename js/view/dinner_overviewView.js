var Dinner_overviewView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = document.getElementById("numberOfGuests");
	this.nameOfDish = document.getElementById("nameOfDish");
	this.pictureOfDish = document.getElementById("pictureOfDish");
	this.priceOfDish = document.getElementById("priceOfDish");
	this.totalAmountOfMenu = document.getElementById("totalAmountOfMenu");
	
	this.numberOfGuests.textContent = model.getNumberOfGuests();
	
	for (dish in model.getFullMenu()) {
		var element = document.createElement("DIV");
		element.setAttribute("class", "col-lg-3");                               
		document.getElementById("row_overview").appendChild(element);
		var img = document.createElement("IMG");
		img.setAttribute("src", dish.image);
		img.setAttribute("alt", "Image of Food");
		element.appendChild(img);
		var name = document.createElement("H2");
		var tname = document.createTextNode(dish.name);
		name.appendChild(tname);
		element.appendChild(name);
		var price = document.createElement("P");
		var tprice = document.createTextNode(model.getPriceOfDish(dish.id) + " SEK");
		price.appendChild(tprice);
		element.appendChild(price);
	};
	
	//this.totalAmountOfMenu.textContent = model.getTotalMenuPrice();
	
};
