var MainController = function(model) {
	var $header = $("#page-header");
	var $sidebar = $("#left-sidebar");
	var currentView;
	var views = [];

	this.addView = function(name, data) {
		views[name] = data;
	};

	this.navigateTo = function(newView) {
		views[currentView].view.hide();
		views[newView].view.show();

		window.scrollTo(0, 0);

		//Should sidebar be displayed
		if (views[newView].sidebar)
			this.showSidebar();
		else
			this.hideSidebar();

		//Should header be displayed
		if (views[newView].header)
			this.showHeader();
		else
			this.hideHeader();

		currentView = newView;
	};

	this.showHeader = function() {
		$("html").addClass("header-shown");
	};

	this.hideHeader = function() {
		$("html").removeClass("header-shown");
	};

	this.showSidebar = function() {
		$("html").addClass("sidebar-shown");
	};

	this.hideSidebar = function() {
		$("html").removeClass("sidebar-shown");
	};

	this.load = function() {
		for (i in views) {
			views[i].view.hide();
		};

		this.hideHeader();
		this.showSidebar();
		views["select-dish"].view.show();
		currentView = "select-dish";
	}
}