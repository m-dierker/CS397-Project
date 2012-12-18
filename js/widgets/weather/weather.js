function Weather(site, id, db_data) {

    Widget.prototype.setupWidget.call(this, site, id, db_data, 3);

    this.initWeather();

    this.getWeather();
}

Weather.prototype = Object.create(new Widget(), {
    testVar : { value: null}
});

Weather.prototype.initWeather = function() {
    $(this.widget).append('<div class="weather"><img src = ""></img><table class="table table-striped"></table></div>')
};

Weather.prototype.getWeather = function() {
    console.log("getting weather");
    $.ajax({
        url : "http://api.wunderground.com/api/abd4d450a140ae7a/geolookup/conditions/q/IL/Champaign.json",
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            var weatherType = parsed_json['current_observation']['weather'];
            var temp_f = parsed_json['current_observation']['temp_f'];
            var wind = parsed_json['current_observation']['wind_string'];
            var humidity = parsed_json['current_observation']['relative_humidity'];

            this.addWeatherData("Location", location);
            this.addWeatherData("Current Temp", temp_f);
            this.addWeatherData("Current Weather", weatherType);
            this.addWeatherData("Current Wind", wind);
            this.addWeatherData("Current Humidity", humidity);

            $(this.widget).find('img').attr('src', parsed_json['current_observation']['icon_url']);
        }.bind(this)
    });
};

Weather.prototype.addWeatherData = function(itemDesc, itemData) {
    var table = $(this.widget).find('table')[0];
    var rowCount = table.rows.length;
    var rowAdded = table.insertRow(rowCount);
    var numberCell = rowAdded.insertCell(0);
    numberCell.innerHTML = itemDesc;
    var statusCell = rowAdded.insertCell(1);
    statusCell.innerHTML = itemData;
};
