window.onload = function() {

    function loadStopsForID(id) {
        clearResults();
        $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetDeparturesByStop?key=c519e892e46841b8957ef39461faa6fb&stop_id=' + id + '&callback=?', function(data) {

            data['departures'].forEach(function(departure) {
                addResult(departure['headsign'], departure['expected_mins'], departure['route']);
            });
        });
    }

    function addResult(headsign, expected_mins, route) {
        $('.bus-results').append('<div class="bus-result"><span class="bus-route-name">' + headsign + '</span><span class="bus-route-expectedmin">' + expected_mins + ' minutes</span><hr></div>');
    }

    function clearResults() {
        $('.bus-results').empty();
    }

    $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetStops?key=c519e892e46841b8957ef39461faa6fb&callback=?', function(data) {

        var stops = data['stops'];

        stops.forEach(function(stop) {
            $('body select').append($('<option>', {value: stop['stop_id']}).text(stop['stop_name']));
        });

    });

    $('body select').change(function() {
        loadStopsForID($('body select').val());
    });
}
