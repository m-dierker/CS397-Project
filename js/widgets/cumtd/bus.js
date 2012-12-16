function Bus() {

    // This MUST be the first line in the constructor
    setupWidget();

    loadStops();
    initialLoadStopsForID("PLAZA");
}

Bus.inherits(Widget);

/**
 * Sets up everything needed for the first load for an ID
 * @param  {string} id the ID of the bus stop
 */
Bus.prototype.initialLoadStopsForID = function(id) {
    clearResults();

    loadStopsForId(id);

    setTimeout(setClickListener, 500);
    setInterval(updateWaitingTimes, 5000);
    // setInterval(updateListing, 60 * 5 * 1000);
}

Bus.prototype.loadStopsForId = function() {
    $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetDeparturesByStop?key=c519e892e46841b8957ef39461faa6fb&stop_id=' + id + '&callback=?', function(data) {

        data['departures'].forEach(function(departure) {
            addResult(departure);
        });
    });
}

Bus.prototype.updateWaitingTimes = function() {
    $('.bus-result').each(function (i) {
        var time = Date.parse($(this).find('.bus-expected').attr('time'));

        var diff = DateDiff.minutesUntil(time);

        var expectedMin = $(this).find('.bus-route-expectedmin');

        // It's possible for the bus system to predict less minutes than the time would say. In that event, we're going to go with the bus system.
        if(parseInt($(expectedMin).text()) > diff) {
            $(this).find('.bus-route-expectedmin').text(diff + " minutes");
        }
    });
}

Bus.prototype.setClickListener = function() {
    // console.log($('.bus-results .bus-result'));
    $('.bus-results .bus-result').click(function() {
        var pulldown = $(this).children('.bus-pulldown');
        if($(pulldown).is(':hidden')) {
            $(pulldown).slideDown();
        } else {
            $(pulldown).slideUp();
        }
    });
}

Bus.prototype.addResult = function(departure) {
    $('.bus-results').append('<div class="bus-result"><span class="bus-route-name">' + departure['headsign'] + '</span><span class="bus-route-expectedmin">' + departure['expected_mins'] + ' minutes</span><div class="bus-pulldown"><div class="bus-route-longname"><strong>Route: </strong><span class="bus-route-colored" style="color: #' + departure['route']['route_color'] +'">' + departure['route']['route_long_name'] + '</span></div><span class="bus-scheduled"><strong>Scheduled:</strong> ' + getFormattedTime(departure['scheduled']) + '</span><span class="bus-expected" time="' + departure['expected'] + '"><strong>Expected:</strong> ' + getFormattedTime(departure['expected']) + '</span></div></div><hr>');
}

Bus.prototype.clearResults = function() {
    $('.bus-results').empty().append('<hr class="top-line">');
}

Bus.prototype.getFormattedTime = function(time) {
    var date = Date.parse(time);
    return date.toString('h:mm tt');
}

Bus.prototype.loadStops = function() {
    $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetStops?key=c519e892e46841b8957ef39461faa6fb&callback=?', function(data) {

        var stops = data['stops'];

        stops.forEach(function(stop) {
            $('body select').append($('<option>', {value: stop['stop_id']}).text(stop['stop_name']));
        });
    });
}
