const gamesquare = document.getElementById("gamesquare");
const gamesounds = {
  gameover: "../assets/sounds/gameover.mp3",
  drop: "../assets/sounds/drop.mp3",
  isMuted: false,
};
let count = Math.round(Math.random() * 4);
rotateSquare(count);

gamesquare.addEventListener("click", () => {
  count++;
  rotateSquare(count);

  if (count >= 4) {
    count = 0;
  }
});

function Playsound(ismuted, source) {
  const audio = document.getElementById("gameover");
  audio.muted = ismuted;
  audio.src = source;
  audio.play();
}
function rotateSquare(rotatevalue) {
  if (rotatevalue === 1) {
    gamesquare.style.transform = `rotate(${0}deg)`;
    gamesquare.className = `gamesquare`;
  } else if (rotatevalue === 2) {
    gamesquare.style.transform = `rotate(${90}deg)`;
    gamesquare.className = `gamesquare-b`;
  } else if (rotatevalue === 3) {
    gamesquare.style.transform = `rotate(${180}deg)`;
    gamesquare.className = `gamesquare-g`;
  } else if (rotatevalue === 4) {
    gamesquare.style.transform = `rotate(${270}deg)`;
    gamesquare.className = `gamesquare-y`;
  }
 
}
