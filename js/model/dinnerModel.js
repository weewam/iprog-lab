//DinnerModel Object constructor
var DinnerModel = function() {
	//Observer code
	var observers = [];

	this.addObserver = function(observer) {
		observers.push(observer);
	};

	this.notifyObservers = function(type, data)  {
		for(var i = 0; i < observers.length; i++) {
			observers[i].update(type, data);
		}	
	};

	var numberOfGuests = 1;

	var searchString = "";
	var filterString = "main";

	var dishesInMenu = {
		"Appetizers": null, 
		"Main Dish": null, 
		"Desserts": null
	};

	var currentDish = {
		'id':100,
		'name':'',
		'type':'',
		'image':'',
		'description':'',
		'ingredients':[]
	};

	//Update number of guests
	this.setNumberOfGuests = function(num) {
		numberOfGuests = num;
		this.notifyObservers("changed-number-of-guests", numberOfGuests);
	};

	this.getNumberOfGuests = function() {
		return numberOfGuests; 
	};



	//Update search string
	this.setSearchString = function(string) {
		if (string !== searchString) {
			searchString = string;
		};
	};

	this.getSearchString = function() {
		return searchString;
	};



	//Update filter
	this.setCurrentFilter = function(filter) {
		if (filter !== filterString) {
			filterString = filter;
		};
	};

	this.getCurrentFilter = function() {
		return filterString;
	};



	//Gets dishes
	//Gets current dish
	this.getCurrentDish = function() {
		return currentDish; 
	};

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		var menu = this.getFullMenu();

		for (x in menu) {
			if (menu[x].category === type) {
				return menu[x];
			}
		};

		return null;
	};

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		var dishes = [];
		
		for (x in dishesInMenu) {
			var dish = dishesInMenu[x];

			if (dish !== null) {
				dishes.push(dish);
			};
		};

		return dishes;
	};



	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addCurrentDishToMenu = function() {
		dishesInMenu[currentDish.category] = this.getCurrentDish();
		this.notifyObservers("added-dish-to-menu", this.getCurrentDish());
	}


	
	//Price stuff
	//Calculates the price by multiplying the quantity with the number of guests
	this.getPriceOfDish = function(dish) {
		if (this.getNumberOfGuests() == 0) {
			return 0;
		};

		var sum = 0,
			ingredients = dish.ingredients;

		for (x in ingredients) {
			var ingredient = ingredients[x]
			sum += ingredient.Quantity;
		};
		
		return Math.round(sum * this.getNumberOfGuests());
	};

	//Gets the price of the current dish
	this.getPriceOfCurrentDish = function() {
		return this.getPriceOfDish(this.getCurrentDish());
	};

	//Gets the price of a selected course(category)
	this.getPriceOfSelectedDish = function(type) {
		return this.getPriceOfDish(this.getSelectedDish(type));
	};

	//Gets the price of the entire menu
	this.getPriceofMenu = function() {
		var menu = this.getFullMenu(),
			sum = 0;

		for(x in menu) {
			sum += this.getPriceOfDish(menu[x])
		}

		return sum;
	}



	//Ingredient stuff
	//Gets the ingredients of a dish
	this.getIngredientsOfDish = function(dish) {
		ingredients = [];
		
		for (x in dish.ingredients) {
			var ingredient = dish.ingredients[x];

			var cost = Math.ceil(ingredient.Quantity) * this.getNumberOfGuests(),
				amount = (ingredient.Unit === null) ? cost : cost + " " + ingredient.Unit;

			ingredients.push({  name : ingredient.Name, amount : amount, cost : cost  });
		};

		return ingredients;
	};

	this.getIngredientsOfCurrentDish = function() {
		return this.getIngredientsOfDish(this.getCurrentDish());
	};

	this.getIngredientsOfSelectedDish = function(type) {
		return this.getIngredientsOfDish(this.getSelectedDish(type));
	};

	//Gets all ingredients for the dishes on the menu;
	this.getIngredientsOfMenu = function() {
		var menu = this.getFullMenu(),
			ingredients = [];
		
		for (x in menu) {
			var dish = menu[x];
			ingredients.push(this.getIngredientsOfDish(dish));
		};

		return ingredients;
	}

	//AJAX
	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	this.getAllDishes = function (course, search) {
		var that = this,
			response = false;

		that.notifyObservers("searching-for-dishes");

		var searchString = (search === "") ? course : search + " " + course;

		$.getJSON("http://api.bigoven.com/recipes", { api_key : "8vtk7KykflO5IzB96kb0mpot0sU40096", pg : 1, rpp : 10, any_kw : searchString }, function(data) {
			response = true;

			if (data.Results && data.Results.length > 0) {
				that.notifyObservers("updated-all-dishes", data.Results);
			} else {
				that.notifyObservers("no-search-result", data.Results);
			}
		});

		setTimeout(function() {
			if(!response) {
				that.notifyObservers("connection-error");
			}
		}, 5000);
	};

	//function that returns a dish of specific ID
	this.getDish = function (id) {
		var that = this,
			response = false;

		that.notifyObservers("loading-new-dish");

		$.getJSON("http://api.bigoven.com/recipe/" + id, { api_key : "r02x0R09O76JMCMc4nuM0PJXawUHpBUL" }, function(data) {
			response = true;

			currentDish = {
				'id': data.RecipeID,
				'name': data.Title,
				'category': data.Category,
				'image': data.ImageURL,
				'description': data.Description,
				'instructions' : data.Instructions,
				'ingredients' : data.Ingredients
			};

			that.notifyObservers("updated-specific-dish", currentDish);
		});

		setTimeout(function() {
			if(!response) {
				that.notifyObservers("connection-error");
			}
		}, 5000);
	};


	// the dishes variable contains an array of all the 
	// dishes in the database. each dish has id, name, type,
	// image (name of the image file), description and
	// array of ingredients. Each ingredient has name, 
	// quantity (a number), price (a number) and unit (string 
	// defining the unit i.e. "g", "slices", "ml". Unit
	// can sometimes be empty like in the example of eggs where
	// you just say "5 eggs" and not "5 pieces of eggs" or anything else.
	var dishes = [{
		'id':1,
		'name':'French toast',
		'type':'starter',
		'image':'toast.jpg',
		'description':"In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
		'ingredients':[{ 
			'name':'eggs',
			'quantity':0.5,
			'unit':'',
			'price':10
			},{
			'name':'milk',
			'quantity':30,
			'unit':'ml',
			'price':6
			},{
			'name':'brown sugar',
			'quantity':7,
			'unit':'g',
			'price':1
			},{
			'name':'ground nutmeg',
			'quantity':0.5,
			'unit':'g',
			'price':12
			},{
			'name':'white bread',
			'quantity':2,
			'unit':'slices',
			'price':2
			}]
		},{
		'id':2,
		'name':'Sourdough Starter',
		'type':'starter',
		'image':'sourdough.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'active dry yeast',
			'quantity':0.5,
			'unit':'g',
			'price':4
			},{
			'name':'warm water',
			'quantity':30,
			'unit':'ml',
			'price':0
			},{
			'name':'all-purpose flour',
			'quantity':15,
			'unit':'g',
			'price':2
			}]
		},{
		'id':3,
		'name':'Baked Brie with Peaches',
		'type':'starter',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'round Brie cheese',
			'quantity':10,
			'unit':'g',
			'price':8
			},{
			'name':'raspberry preserves',
			'quantity':15,
			'unit':'g',
			'price':10
			},{
			'name':'peaches',
			'quantity':1,
			'unit':'',
			'price':4
			}]
		},{
		'id':100,
		'name':'Meat balls',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
		'ingredients':[{ 
			'name':'extra lean ground beef',
			'quantity':115,
			'unit':'g',
			'price':20
			},{
			'name':'sea salt',
			'quantity':0.7,
			'unit':'g',
			'price':3
			},{
			'name':'small onion, diced',
			'quantity':0.25,
			'unit':'',
			'price':2
			},{
			'name':'garlic salt',
			'quantity':0.7,
			'unit':'g',
			'price':2
			},{
			'name':'Italian seasoning',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'dried oregano',
			'quantity':0.3,
			'unit':'g',
			'price':3
			},{
			'name':'crushed red pepper flakes',
			'quantity':0.6,
			'unit':'g',
			'price':3
			},{
			'name':'Worcestershire sauce',
			'quantity':6,
			'unit':'ml',
			'price':7
			},{
			'name':'milk',
			'quantity':20,
			'unit':'ml',
			'price':4
			},{
			'name':'grated Parmesan cheese',
			'quantity':5,
			'unit':'g',
			'price':8
			},{
			'name':'seasoned bread crumbs',
			'quantity':15,
			'unit':'g',
			'price':4
			}]
		},{
		'id':101,
		'name':'MD 2',
		'type':'main dish',
		'image':'bakedbrie.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':15,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':10,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':102,
		'name':'MD 3',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':2,
			'unit':'pieces',
			'price':8
			},{
			'name':'ingredient 2',
			'quantity':10,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':5,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':103,
		'name':'MD 4',
		'type':'main dish',
		'image':'meatballs.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ingredient 1',
			'quantity':1,
			'unit':'pieces',
			'price':4
			},{
			'name':'ingredient 2',
			'quantity':12,
			'unit':'g',
			'price':7
			},{
			'name':'ingredient 3',
			'quantity':6,
			'unit':'ml',
			'price':4
			}]
		},{
		'id':200,
		'name':'Chocolat Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':201,
		'name':'Vanilla Ice cream',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		},{
		'id':202,
		'name':'Strawberry',
		'type':'dessert',
		'image':'icecream.jpg',
		'description':"Here is how you make it... Lore ipsum...",
		'ingredients':[{ 
			'name':'ice cream',
			'quantity':100,
			'unit':'ml',
			'price':6
			}]
		}
	];
};