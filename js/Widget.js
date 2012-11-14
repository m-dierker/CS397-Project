/**
 * Constructor
 */
function Widget(site) {
    this.site = site;

    // Get a new unique ID for the widget
    this.id = this.site.getNewWidgetID();

    // Actually create the div
    var widget = document.createElement('div');
    widget.setAttribute('id', this.id);

    // Put it on the page
    document.body.appendChild(widget);

    // Configure it
    $('#' + this.id).draggable().addClass('widget').width(100).height(100);

    console.log("ID: " + this.id);
}

/**
 * Sets the size of the widget
 */
Widget.prototype.setSize = function(width, height) {
    $('#' + this.id).width(width).height(height);
};
