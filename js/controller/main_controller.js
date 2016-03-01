var MainController = function(model) {
	var $header = $("#page-header");
	var $sidebar = $("#left-sidebar");
	var currentView;
	var views = [];

	this.addView = function(name, data) {
		views[name] = data;
	};

	this.navigateTo = function(newView) {
		var that = this;


		views[currentView].view.removeClass("shown");
		setTimeout(function() {
			views[currentView].view.hide();
			views[newView].view.show();

			setTimeout(function() {
				//Should sidebar be displayed
				if (views[newView].sidebar) {
					that.showSidebar();
				} else {
					that.hideSidebar();
				}

				//Should header be displayed
				if (views[newView].header) {
					that.showHeader();
				} else {
					that.hideHeader();
				}

				views[newView].view.addClass("shown");
				window.scrollTo(0, 0);
				currentView = newView;
			}, 50);
		}, 200);
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