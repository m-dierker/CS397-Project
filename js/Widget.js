/**
 * Construct a widget given a bunch of data about that widget. This could either have just the site (new widget), or all of the parameters (loaded from the DB).
 */
function Widget() {

}

Widget.prototype.setupWidget = function(site, id, db_data, type) {
    this.site = site;

    if(db_data['WidgetDesktop'] === undefined) {
        this.desktop = site.desktop;
    } else {
        this.desktop = db_data['WidgetDesktop'];
    }

    this.widgetType = type;

    var newWidget = false;
    this.widgetAdded = false;

    // Blank Widget Memory
    this.mem = {};


    var x;
    var y;
    var width;
    var height;

    if(id === undefined) {
        // We could just be constructing with a site, so this should fill in defaults (this is a new widget as opposed to one from the DB)

        newWidget = true;

        id = this.site.getNewWidgetID();
        this.hasID = false;

        x = 50;
        y = 50;

    } else { // loading from the DB
        this.hasID = true;

        x = db_data['WidgetX'];
        y = db_data['WidgetY'];
        width = db_data['WidgetWidth'];
        height = db_data['WidgetHeight'];

        this.setSize(width, height);
    }

    this.id = id;

    var widget = document.createElement('div');
    widget.setAttribute('id', this.id);
    this.widget = widget;

    document.body.appendChild(widget);

    this.makeDivWidget();

    this.setPosition({left: x, top: y});

    this.makeResizeable();
    this.makeDraggable();
    setTimeout(this.addScrollListener.bind(this), 500);

    if (newWidget) {
        // Need to let the DOM settle first
        this.updateWidgetIn(1000);
    }
};

/**
 * There's a very annoying bug with JQuery UI and scrolling. If you click the scrollbar, the window gets stuck to the mouse, and there's no way to get it off. So you can scroll, and as you move the mouse afterwards, the widget went with it. This is problematic for obvious reasons. So every time the user scrolls, we have to completely destroy the draggable stuff and re-add it 50ms (random number that works) later. This is really annoying, but the only workarounds suggested are to only allow dragging of the title bar. But we don't have a title bar. So this is stupid but it works.
 */
Widget.prototype.addScrollListener = function() {
    $(this.widget).find('.bus-results').scroll(function() {

        $(this.widget).draggable("destroy");

        if(this.draggableEnableTimer !== null) {
            clearTimeout(this.draggableEnableTimer);
        }

        this.draggableEnableTimer = setTimeout(this.makeDraggable.bind(this), 20);
    }.bind(this));
};

/**
 * Makes the widget's div fit to be a widget
 */
Widget.prototype.makeDivWidget = function() {
    $(this.widget).addClass('widget').css('position','absolute');
};

/**
 * Enables resizing and adds a resize listener to the widget
 */
Widget.prototype.makeResizeable = function() {
    $(this.widget).resizable().resize(function() {
        this.saveSize();
        // update on resize
        this.updateWidgetIn(100);
    }.bind(this));

    // Add the click listener to the resize handle after it's gone through the DOM
    setTimeout(function() {
        $(this.widget).find('div.ui-icon-gripsmall-diagonal-se').dblclick(function() {
            bootbox.confirm("Would you like to delete this widget?", function(confirmed) {
                if(confirmed) {
                    this.deleteWidget();
                }
            }.bind(this));
        }.bind(this));
    }.bind(this), 250);
};

Widget.prototype.deleteWidget = function() {
    $(this.widget).remove();

    $.ajax('/php/db/deletewidget.php?id=' + this.id, {
        success: function() {
            alertify.success('Widget deleted');
        }
    });

    this.cleanup();


};

/**
 * This can be overriden in a child class to end setIntervals and such
 */
Widget.prototype.cleanup = function() {

}

/**
 * Makes all the widgets on the page draggable. Should be called when a new widget is added or removed
 */
Widget.prototype.makeDraggable = function() {
    $(this.widget).draggable({
        stack: '.widget',
        start: function() {
            $(this).addClass('noclick');
        },
        drag: function() {
            // this.updateWidgetIn(50);
        }.bind(this),
        stop: function(e) {
            this.updateWidgetIn(50);
        }.bind(this),
        distance: 30
    });
};

/**
 * Since we can't update the widget immediately (to protect the database from a bunch of requests on a resize), we'll schedule the event and execute it only if more events don't come in
 * @param  {int} ms the number of milliseconds to execute the DB update in
 */
Widget.prototype.updateWidgetIn = function(ms) {
    // Clear old event
    if(this.updateWidgetTime != null) {
        clearTimeout(this.updateWidgetTime);
    }

    this.updateWidgetTime = setTimeout(this.updateWidget.bind(this), ms);
}

/**
 * Called repeatedly when the widget is updated, and will send updated parameters to the database
 */
Widget.prototype.updateWidget = function() {

    if(this.desktop != this.site.desktop) {
        console.log("Cancelling because background update");
        return;
    }

    if(this.fetchingID) {
        this.updateWidgetIn(500);
        return;
    }

    if(this.updateWidgetTime != null) {
        this.updateWidgetTime = null;
    }

    if(!this.hasID) {
        this.fetchingID = true;
        // Add a new widget
        var url = '/php/db/addwidget.php?WidgetType=' + this.widgetType + '&WidgetDesktop=' + this.desktop + '&OwnerToken=' + FB.getAuthResponse()['accessToken'] + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight() + this.getWidgetMemForURL();
        console.log("adding by hitting " + url);
        $.ajax(url, {
                success: function(data) {
                    data = JSON.parse(data);
                    this.setID(data['_id']['$id']);
                    this.hasID = true;
                    this.fetchingID = false;
                    console.log("Added new widget");
                }.bind(this)
            });



    } else {
        var url = '/php/db/updatewidget.php?id=' + this.id + '&OwnerToken=' + FB.getAuthResponse()['accessToken'] + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight() + this.getWidgetMemForURL();
        console.log("updating by hitting" + url);
        $.ajax(url, {
                success: function(data) {
                    console.log("Successful AJAX update for widget ID " + this.id);
                }.bind(this)
            });
    }
}


Widget.prototype.getWidgetMemForURL = function() {
    var ret = '';
    for (var prop in this.mem) {
        ret += '&' + prop + '=' + this.mem[prop];
    }
    return ret;
};


Widget.prototype.setID = function(newID) {
    $(this.widget).attr('id', newID);
    this.id = newID;
}

Widget.prototype.getWidth = function() {
    return $(this.widget).width();
};

Widget.prototype.getHeight = function() {
    var height = $(this.widget).height();
    console.log("Height is " + height);
    return height;
};

Widget.prototype.getX = function() {
    return $(this.widget).offset()['left'];
};

Widget.prototype.getY = function() {
    return $(this.widget).offset()['top'];
};

Widget.prototype.saveSize = function() {
    this._width = this.getWidth();
    this._height = this.getHeight();
};

/**
 * Sets the size of the widget
 */
Widget.prototype.setSize = function(width, height) {
    console.log("Setting size to " + width + " x " + height);
    this._width = width;
    this._height = height;
    $(this.widget).width(width).height(height);
};

/**
 * Can be called after an append() statement that changes the widget size
 */
Widget.prototype.setToCorrectSize = function() {
    this.setSize(this._width, this._height);
};
Widget.prototype.setPosition = function(data) {
    $(this.widget).offset(data);
};
