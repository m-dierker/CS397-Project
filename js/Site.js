 /**
 * Constructor
 */
function Site() {
    this.widgets = new Array();

    if(window.fbInitialized) {
        this.setupFacebook();
    }
}

/**
 * Called when someone is logged in or logged out
 */
Site.prototype.onAuthChange = function(response) {
    if(response.status === 'connected') {
        this.onLogin();
    } else {
        this.onLogout();
    }
};

/**
 * Called when the user is logged in and has connected to the app
 */
Site.prototype.onLogin = function(response) {
    $('#facebook-loader').hide();
    $("#facebook-login").fadeOut();

    this.setupDashboard();
}

/**
 * Called if the user is logged out, or has not connected to the app
 */
Site.prototype.onLogout = function(response) {
    $('#facebook-loader').hide();
    $('#controls').hide();

    this.clearWidgets();

    // This prevents the scrollbar from showing up because of two of the vertically aligned divs show at the same time
    setTimeout(this.showLoginButton, 100);
};

/**
 * Hides all widgets
 */
Site.prototype.hideAllWidgets = function() {
    for(var i = 0; i < this.widgets.length; i++) {
        $(this.widgets[i]).hide();
    }
}

/**
 * Clear the widgets by hiding all the widgets, and making a new array (to completely clear all widgets)
 */
Site.prototype.clearWidgets = function() {
    this.hideAllWidgets();
    this.widgets = new Array();
}

Site.prototype.showLoginButton = function() {
    $("#facebook-login").fadeIn();
}

/**
 * Sets up facebook things
 * @return {[type]} [description]
 */
Site.prototype.setupFacebook = function() {

    // Listener - This should also trigger it now.
    FB.Event.subscribe('auth.authResponseChange', this.onAuthChange.bind(this));

    // Trigger it now
    // FB.getLoginStatus(this.onAuthChange.bind(this));
};


Site.prototype.addWidget = function() {
    console.log("adding widget");
    var widget = new Widget(this);
    widget.setSize(500,200);

    this.widgets.push(widget);
};

/**
 * Logout the user
 */
Site.prototype.logout = function() {
    FB.logout();
}


/**
 * Sets up the control listeners, shows things relevant, will load widgets, etc. Called on login.
 */
Site.prototype.setupDashboard = function() {
    console.log("setting up dashboard");
    $('#add-widget-button').click(this.addWidget.bind(this));
    $('#logout-button').click(this.logout.bind(this));

    $('#controls').fadeIn();
};

/**
 * Returns a String with a new unique ID for a widget
 */
Site.prototype.getNewWidgetID = function() {
    return GUID();
};

/**
 * Initialization code
 */
window.onload = function() {
    var site = new Site();
    window.site = site;
}
