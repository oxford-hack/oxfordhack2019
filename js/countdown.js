function initialize_countdown(endtime) {
    var countdown_big = "Hacking begins in<br /><span id='countdown-days'>0</span> Day<span id='countdown-days-s'>s</span>, <span id='countdown-hours'>0</span> Hour<span id='countdown-hours-s'>s</span>, <span id='countdown-minutes'>00</span> Minute<span id='countdown-minutes-s'>s</span>, <span id='countdown-seconds'>00</span> Second<span id='countdown-seconds-s'>s</span>";
    var countdown_small = "Registrations close in<br /><span id='countdown-days'>0</span>d <span id='countdown-hours'>0</span>h <span id='countdown-minutes'>00</span>m <span id='countdown-seconds'>00</span>s";

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    var small = width < 850
    document.getElementById("countdown").innerHTML = small ? countdown_small : countdown_big

    var days = document.getElementById("countdown-days")
    var hours = document.getElementById("countdown-hours")
    var minutes = document.getElementById("countdown-minutes")
    var seconds = document.getElementById("countdown-seconds")
    var dayss = document.getElementById("countdown-days-s")
    var hourss = document.getElementById("countdown-hours-s")
    var minutess = document.getElementById("countdown-minutes-s")
    var secondss = document.getElementById("countdown-seconds-s")

    function do_countdown() {
        var t = get_time_remaining(endtime);
        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);
        if (!small) {
            dayss.innerHTML = (t.days == 1) ? '' : 's';
            hourss.innerHTML = (t.hours == 1) ? '' : 's';
            minutess.innerHTML = (t.minutes == 1) ? '' : 's';
            secondss.innerHTML = (t.seconds == 1) ? '' : 's';
        }
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    var timeinterval = setInterval(do_countdown, 1000);
    do_countdown();
}

function get_time_remaining(endtime){
    var t = Math.max(Date.parse(endtime) - Date.parse(new Date()), 0);
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
