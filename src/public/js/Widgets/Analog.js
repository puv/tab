// Javascript is used to set the clock to your computer time.

function Start(tz = null) {
    var currentSec = getSecondsToday(tz);

    var seconds = (currentSec / 60) % 1;
    var minutes = (currentSec / 3600) % 1;
    var hours = (currentSec / 43200) % 1;

    setTime(60 * seconds, "second");
    setTime(3600 * minutes, "minute");
    setTime(43200 * hours, "hour");

    function setTime(left, hand) {
        document.getElementsByClassName("clock__" + hand)[0].style.animationDelay = "" + left * -1 + "s";
    }

    function getSecondsToday(tz) {
        let now;

        if (tz) now = new Date(new Date().toLocaleString("en-US", { timeZone: tz }));
        else now = new Date();

        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        let diff = now - today;
        return Math.round(diff / 1000);
    }
}