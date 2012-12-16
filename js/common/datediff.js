var DateDiff = {

    minutesUntil: function(date) {
        var now = new Date();
        return DateDiff.inMinutes(now, date);
    },

    /**
     * Returns the difference in minutes between two given times
     * @param  {Date} d1 the first time (earlier)
     * @param  {Date} d2 the second time (later)
     * @return {int} The difference in minutes between the two times
     */
    inMinutes: function(d1, d2) {
        var t1 = d1.getTime();
        var t2 = d2.getTime();

        return parseInt((t2-t1) / (1000 * 60));
    }
}
