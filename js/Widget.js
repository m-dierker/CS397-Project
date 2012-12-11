/**
 * Constructor for a new widget with no ID
 */
function Widget(site) {
    this.site = site;

    // Get a temporary unique ID for the widget
    this.id = this.site.getNewWidgetID();
    this.hasID = false;

    // Actually create the div
    var widget = document.createElement('div');
    widget.setAttribute('id', this.id);

    // Put it on the page
    document.body.appendChild(widget);

    // Configure it
    this.makeDivWidget();

    this.setSize(100, 100);
    this.setPosition({top: 50, left: 20})

    this.addResizeListener();

    this.makeAllDraggable();

    this.updateWidget();
}

/**
 * Construct a widget given a bunch of data about that widget (from the DB)
 */
function Widget(site, id, x, y, width, height, type) {
    this.site = site;

    var widget = document.createElement('div');
    widget.setAttribute('id', this.id);

    document.body.appendChild(widget);

    this.makeDivWidget();

    this.id = id;
    this.hasID = true;

    this.setSize(width, height);

    this.setPosition({left: x, top: y});

    this.addResizeListener();

    this.makeAllDraggable();
}

/**
 * Makes the widget's div fit to be a widget
 */
Widget.prototype.makeDivWidget = function() {
    $('#' + this.id).addClass('widget').resizable().css('position','absolute');
};

/**
 * Adds a resize listener to the widget
 */
Widget.prototype.addResizeListener = function() {
    $('#' + this.id).resize(function() {
        // update on resize
        this.updateWidget();
    }.bind(this));
};

/**
 * Makes all the widgets on the page draggable. Should be called when a new widget is added or removed
 */
Widget.prototype.makeAllDraggable = function() {
    $('.widget').draggable({stack: '.widget'});
};

/**
 * Called repeatedly when the widget is updated, and will send updated parameters to the database
 */
Widget.prototype.updateWidget = function() {
    if(!this.hasID) {
        $.ajax('/php/db/addwidget.php?WidgetType=0&OwnerID=' + this.site.ownerID + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight(), {
                success: function(data) {
                    data = JSON.parse(data);
                    this.setID(data['_id']['$id']);
                    console.log("Successful AJAX add");
                }.bind(this)
            });


        this.hasID = true;
    }

    $.ajax('/php/db/updatewidget.php?id=' + this.id +  '&WidgetType=0&OwnerID=' + this.site.ownerID + '&WidgetX=' + this.getX() + '&WidgetY=' + this.getY() + '&WidgetWidth=' + this.getWidth() + '&WidgetHeight=' + this.getHeight(), {
                success: function(data) {
                    console.log("Successful AJAX update");
                }.bind(this)
            });
}




Widget.prototype.setID = function(newID) {
    $('#' + this.id).attr('id', newID);
    this.id = newID;
}

Widget.prototype.getWidth = function() {
    return $('#' + this.id).width();
};

Widget.prototype.getHeight = function() {
    return $('#' + this.id).height();
};

Widget.prototype.getX = function() {
    return $('#' + this.id).offset()['left'];
};

Widget.prototype.getY = function() {
    return $('#' + this.id).offset()['top'];
};

/**
 * Sets the size of the widget
 */
Widget.prototype.setSize = function(width, height) {
    $('#' + this.id).width(width).height(height);
};

Widget.prototype.setPosition = function(data) {
    $('#' + this.id).offset(data);
};
