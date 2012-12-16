window.onload = function() {

    function loadStopsForID(id) {
        clearResults();
        $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetDeparturesByStop?key=c519e892e46841b8957ef39461faa6fb&stop_id=' + id + '&callback=?', function(data) {

            data['departures'].forEach(function(departure) {
                addResult(departure);
            });
        });
    }

    function addResult(departure) {
        $('.bus-results').append('<div class="bus-result"><span class="bus-route-name">' + departure['headsign'] + '</span><span class="bus-route-expectedmin">' + departure['expected_mins'] + ' minutes</span><div class="bus-pulldown"><div class="bus-route-longname"><strong>Route: </strong><span class="bus-route-colored" style="color: #' + departure['route']['route_color'] +'">' + departure['route_long_name'] + '</span></div><span class="bus-scheduled"><strong>Scheduled:</strong> ' + getFormattedTime(departure['scheduled']) + '</span><span class="bus-expected"><strong>Expected:</strong> ' + getFormattedTime(departure['expected']) + '</span></div></div><hr>');
    }

    function clearResults() {
        $('.bus-results').empty().append('<hr class="top-line">');
    }

    function getFormattedTime(time) {
        // var date = Date.parse(time);
        // time = '2012-12-16T12:12:00-06:00';
        time = 'today';
        var date = Date.parse(time);
        console.log(date);

        return date.toString('h:mm tt');

    }

    function loadStops() {
        $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetStops?key=c519e892e46841b8957ef39461faa6fb&callback=?', function(data) {

        var stops = data['stops'];

        stops.forEach(function(stop) {
            $('body select').append($('<option>', {value: stop['stop_id']}).text(stop['stop_name']));
        });

    });
    }

    loadStops();
    loadStopsForID("PLAZA");

    $('body select').change(function() {
        loadStopsForID($('body select').val());
    });

    $('.bus-results .bus-result').click(function() {
        console.log("click");
        var pulldown = $(this).children('.bus-pulldown');
        if($(pulldown).is(':hidden')) {
            $(pulldown).slideDown();
        } else {
            $(pulldown).slideUp();
        }
    });
}
