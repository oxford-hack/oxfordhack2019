function initialize_countdown(endtime) {
    var countdown_big = "Registrations close in<br /><span id='countdown-days'>0</span> Days, <span id='countdown-hours'>0</span> Hours, <span id='countdown-minutes'>00</span> Minutes, <span id='countdown-seconds'>00</span> Seconds";
    var countdown_small = "Registrations close in<br /><span id='countdown-days'>0</span>d <span id='countdown-hours'>0</span>h <span id='countdown-minutes'>00</span>m <span id='countdown-seconds'>00</span>s";

    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    document.getElementById("countdown").innerHTML = (width < 850) ? countdown_small : countdown_big

    var days = document.getElementById("countdown-days")
    var hours = document.getElementById("countdown-hours")
    var minutes = document.getElementById("countdown-minutes")
    var seconds = document.getElementById("countdown-seconds")

    function do_countdown() {
        var t = get_time_remaining(endtime);
        days.innerHTML = t.days;
        hours.innerHTML = t.hours;
        minutes.innerHTML = ('0' + t.minutes).slice(-2);
        seconds.innerHTML = ('0' + t.seconds).slice(-2);
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
