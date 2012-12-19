function Notepad(site, id, db_data) {

    Widget.prototype.setupWidget.call(this, site, id, db_data, 4);

    this.initNotepad();

    if(db_data['text'] !== undefined) {
        this.setText(db_data['text']);
    }
}

Notepad.prototype = Object.create(new Widget(), {
    testVar : { value: null}
});

Notepad.prototype.initNotepad = function() {
    $(this.widget).append('<textarea></textarea>');

    setTimeout(function() {
        $(this.widget).find('textarea').bind('input propertychange', function() {
            this.mem['text'] = $(this.widget).find('textarea').val();
            this.updateWidget();
            console.log("Hitting DB");
        }.bind(this))
    }.bind(this), 300);
};

Notepad.prototype.setText = function(text) {
    $(this.widget).find('textarea').val(text);
};
