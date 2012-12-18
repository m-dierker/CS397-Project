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
        this.onLogin(response);
    } else {
        this.onLogout(response);
    }
};

/**
 * Called when the user is logged in and has connected to the app
 */
Site.prototype.onLogin = function(response) {
    this.ownerID = response.authResponse.userID;

    this.getExistingWidgets();

    this.setupDashboard();
}

/**
 * Widgets are setup, so time to show them to the user
 */
Site.prototype.finishLoading = function() {
    $('#facebook-loader').hide();
    $("#facebook-login").fadeOut();

    $('#controls').fadeIn();
};

/**
 * Called if the user is logged out, or has not connected to the app
 */
Site.prototype.onLogout = function(response) {
    $('#facebook-loader').hide();
    $('#controls').hide();

    this.ownerID = 0;

    this.clearWidgets();

    // This prevents the scrollbar from showing up because of two of the vertically aligned divs show at the same time
    setTimeout(this.showLoginButton, 100);
};

Site.prototype.getExistingWidgets = function() {

    if (this.widgetsRequested) {
        return;
    }

    this.widgetsRequested = true;

    $.ajax({
        url: '/php/db/getuserswidgets.php?id=' + this.ownerID,
        success: function(data) {
            console.log("Loading User Widgets");
            console.log(data);
            data = JSON.parse(data);
            data.forEach(function(widget) {
                this.addExistingWidget(widget);
            }.bind(this));

            this.finishLoading();
        }.bind(this)
    });
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
    FB.getLoginStatus(this.onAuthChange.bind(this));
};

/**
 * Adds a new widget (so the user clicked the button, not from the DB)
 */
Site.prototype.addBlankWidget = function() {
    console.log("adding widget");
    // var widget = new Widget(this);
    widget.setSize(500,200);

    this.pushWidget(widget);
};

/**
 * Adds a brand new widget with a given type
 * @param {int} type The type of widget to add
 */
Site.prototype.addNewWidgetWithType = function(type) {
    type = parseInt(type);

    var widget;

    switch(type) {
        case 1: // bus widget
            widget = new Bus(this, undefined, {});
            widget.setSize(500, 500);
            break;
        default:
            console.log("Invalid widget type specified: " + type);
    }

    this.pushWidget(widget);

};

/**
 * Adds an existing widget given a widget object from an AJAX request
 * @param {object} widget an object containing the DB request
 */
Site.prototype.addExistingWidget = function(data) {
    var type = parseInt(data['WidgetType']);
    var id = data['_id']['$id'];

    var widget;

    switch(type) {
        case 1: // bus widget
            widget = new Bus(this, id, data, type);
            break;
        default:
            console.log("Invalid widget type specified: " + type);
    }

    this.pushWidget(widget);
};

/**
 * Adds a new widget to the widget list
 * @param  {object} widget The new widget object
 */
Site.prototype.pushWidget = function(widget) {
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

    if (this.dashboardSetup) {
        return;
    }

    console.log("Setting up dashboard");

    this.dashboardSetup = true;

    // Hidden controls come in when the add widget button is hovered n
    $('#add-widget-button').hover(function() {

        $('#controls-hidden').show("slide", {direction: "down"}, 200);

    }, function() {});

    // and they fade out when #controls is no longer hovered
    $('#controls').hover(function() {}, function() {
        $('#controls-hidden').hide("slide", {direction: "down"}, 200);
    });

    // Hook all buttons adding a widget given a type
    $('#controls a.add-widget').click(function(e) {
        var type = $(e.target || e.srcElement).attr("widget-type");
        this.addNewWidgetWithType(type);
    }.bind(this));

    $('#logout-button').click(this.logout.bind(this));
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
