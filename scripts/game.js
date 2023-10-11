const play = document.getElementById("play");
const gamesounds = {
  gameover: "../assets/sounds/gameover.mp3",
  drop: "../assets/sounds/drop.mp3",
  isMuted:false
};

play.addEventListener("click", () => {
  Playsound(gamesounds.isMuted, gamesounds.drop);
  
});

function Playsound(ismuted, source) {
  const audio = document.getElementById("gameover");
  audio.muted = ismuted;
  audio.src = source;
  audio.play();
}
