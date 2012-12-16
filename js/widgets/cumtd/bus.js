window.onload = function() {
    $.getJSON('http://developer.cumtd.com/api/v2.1/json/GetStops?key=c519e892e46841b8957ef39461faa6fb&callback=?', function(data) {

        var stops = data['stops'];

        stops.forEach(function(stop) {
            $('body select').append($('<option>', {value: stop['stop_id']}).text(stop['stop_name']));
            });


    });

    $('body select').change(function() {

    });
}
