/**
 * Construct a widget given a bunch of data about that widget. This could either have just the site (new widget), or all of the parameters (loaded from the DB).
 */
function Widget() {

}

Widget.prototype.setupWidget = function(site, id, db_data, type) {
    this.site = site;

    this.widgetType = type;

    var newWidget = false;

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

    if (newWidget) {
        this.updateWidget();
    }
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
        // update on resize
        this.updateWidgetIn(100);
    }.bind(this));
};

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
            this.updateWidgetIn(100);
        }.bind(this),
        stop: function(e) {
            this.updateWidgetIn(100);
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

    if(this.updateWidgetTime != null) {
        this.updateWidgetTime = null;
    }

    if(!this.hasID) {
        // Add a new widget
        $.ajax('/php/db/addwidget.php?WidgetType=' + this.widgetType + '&OwnerID=' + this.site.ownerID + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight() + this.getWidgetMemForURL(), {
                success: function(data) {
                    data = JSON.parse(data);
                    this.setID(data['_id']['$id']);
                }.bind(this)
            });


        this.hasID = true;
    } else {
        $.ajax('/php/db/updatewidget.php?id=' + this.id + '&OwnerID=' + this.site.ownerID + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight() + this.getWidgetMemForURL(), {
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
    return $(this.widget).height();
};

Widget.prototype.getX = function() {
    return $(this.widget).offset()['left'];
};

Widget.prototype.getY = function() {
    return $(this.widget).offset()['top'];
};

/**
 * Sets the size of the widget
 */
Widget.prototype.setSize = function(width, height) {
    $(this.widget).width(width).height(height);
};

Widget.prototype.setPosition = function(data) {
    $(this.widget).offset(data);
};
