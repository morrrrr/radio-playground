var player = document.getElementById("player");
var button = document.getElementById("play-button");

function togglePlay() {
    if (player.paused) {
        player.play();
        button.src = "/resources/pause.svg";
    } else {
        player.pause();
        button.src = "/resources/play.svg";
    }
};