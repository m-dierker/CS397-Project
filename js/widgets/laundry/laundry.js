function Laundry(site, id, db_data) {

    Widget.prototype.setupWidget.call(this, site, id, db_data, 2);

    this.initLaundry();

    if(db_data['selectedHall'] !== undefined) {
        this.loadHall(db_data['selectedHall']);
    }
}

Laundry.prototype = Object.create(new Widget(), {
    testVar : { value: null}
});

Laundry.prototype.initLaundry = function() {
    $(this.widget).append('<div class="laundry"><select class="hallSelect"><option value="Forbes">Forbes</option><option value="Nugent">Nugent</option><option value="Snyder">Snyder</option></select><table class="table table-striped"><tr><th>Machine Number</th><th>Machine Status</th></tr></table></div>');

    setTimeout(this.setupSelectChangeListener.bind(this), 500);
};

Laundry.prototype.setupSelectChangeListener = function() {
    $(this.widget).find('select').change(function(e) {
        this.loadHall($(e.srcElement).val());
    }.bind(this));
};

Laundry.prototype.clearTable = function() {
    $(this.widget).find('table tr').remove();
};

Laundry.prototype.loadHall = function(hall) {

    this.mem['selectedHall'] = hall;

    $(this.widget).find('select').val(hall);

    this.clearTable();

    this.updateWidgetIn(1000);

    console.log(hall);

    $.ajax("/php/rest/gethalllaundry.php?&hall=" + hall + '&callback=?', {
        success: function(data) {
            $.each(data, function(key, value) {
              this.addMachine(key, value);
            }.bind(this));

            this.setToCorrectSize();

        }.bind(this),
        type: 'GET'
    });
};

Laundry.prototype.addMachine = function(machineNumber, machineStatus) {
    var table = $(this.widget).find('table')[0];
    var rowCount = table.rows.length;
    var rowAdded = table.insertRow(rowCount);
    var numberCell = rowAdded.insertCell(0);
    numberCell.innerHTML = machineNumber;
    var statusCell = rowAdded.insertCell(1);
    statusCell.innerHTML = machineStatus;
};
