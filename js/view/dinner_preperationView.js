var Dinner_preperationView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = document.getElementById("numberOfGuests");
	this.nameOfDish = document.getElementById("nameOfDish");
	this.pictureOfDish = document.getElementById("pictureOfDish");
	this.preperationOfDish = document.getElementById("preperationOfDish");
	this.ingredientsOfDish = document.getElementById("ingredientsOfDish");
	
	this.numberOfGueststextContent = model.getNumberOfGuests();
	
	if (document.getElementById("row_preperation") != null) {
		var menu = model.getFullMenu();
		for (x in menu) {
			var dish = menu[x];
	
			var imgDiv = document.createElement("DIV");
			imgDiv.setAttribute("class", "col-md-3");                               
			document.getElementById("row_preperation").appendChild(imgDiv);
			var img = document.createElement("IMG");
			img.setAttribute("src", "images/" + dish.image);
			img.setAttribute("alt", "Image of Food");
			imgDiv.appendChild(img);
			
			var nameDiv = document.createElement("DIV");
			nameDiv.setAttribute("class", "col-md-4");                               
			document.getElementById("row_preperation").appendChild(nameDiv);
			var name = document.createElement("H2");
			name.setAttribute("class", "featurette-heading");
			var tname = document.createTextNode(dish.name);
			name.appendChild(tname);
			nameDiv.appendChild(name);
			var ingredientsDiv = document.createElement("p");
			var ingredients = document.createTextNode(model.getAllIngredientsOfDish(dish.id));
			ingredientsDiv.appendChild(ingredients);
			nameDiv.appendChild(ingredientsDiv);
			
			preperationDiv = document.createElement("DIV");
			preperationDiv.setAttribute("class", "col-md-5");                               
			document.getElementById("row_preperation").appendChild(preperationDiv);
			var preperationTitle = document.createElement("H3");
			var tpreperationTitle = document.createTextNode("Preperation");
			preperationTitle.appendChild(tpreperationTitle);
			preperationDiv.appendChild(preperationTitle);
			var preperation = document.createElement("P");
			var tpreperation = document.createTextNode(dish.description);
			preperation.appendChild(tpreperation);
			preperationDiv.appendChild(preperation);
		};
	};
	
};

