const gamesquare = document.getElementById("gamesquare");
const colordot = document.getElementById("colordot");
gamesquare.style.width="300px"
gamesquare.style.height="300px"
gamesquare.style.background="url('../assets/images/game.png') no-repeat"
let isGameStarted=false;
let isGameOver=undefined;
colordot.style.display="none";
const gamesounds = {
  gameover: "../assets/sounds/gameover.mp3",
  drop: "../assets/sounds/drop.mp3",
  isMuted: false,
};
let count = Math.round(Math.random() * 4);
rotateSquare(count);

gamesquare.addEventListener("click", () => {
  if (!isGameStarted) {
    isGameStarted = true;
  } else {
    count++;
    rotateSquare(count);
    if (count >= 4) {
      count = 0;
    }
  }
});

function Playsound(ismuted, source) {
  const audio = document.getElementById("gameover");
  audio.muted = ismuted;
  audio.src = source;
  audio.play();
}
function rotateSquare(rotatevalue) {
  switch (rotatevalue) {
    case 1:
      gamesquare.style.transform = `rotate(${0}deg)`;
      gamesquare.className = `gamesquare`;
      break;
    case 2:
      gamesquare.style.transform = `rotate(${90}deg)`;
      gamesquare.className = `gamesquare-b`;
      break;
    case 3:
      gamesquare.style.transform = `rotate(${180}deg)`;
      gamesquare.className = `gamesquare-g`;
      break;
    case 4:
      gamesquare.style.transform = `rotate(${270}deg)`;
      gamesquare.className = `gamesquare-y`;
      break;
  }

}

function dropDot(colorNumber,level) {
  colordot.style.display="block";
  switch (colorNumber){
    case 1:colordot.style.backgroundColor='red'
    break;
    case 2:colordot.style.backgroundColor='blue'
    break;
    case 3:colordot.style.backgroundColor='#07f93d'
    break;
    case 4:colordot.style.backgroundColor='yellow'
    break;
  }
  let id = null;
  let dotposition = colordot.offsetTop;
  clearInterval(id);
  id = setInterval(frame, );
  function frame() {
    if (dotposition>= 450) {
      clearInterval(id)
      colordot.style.display="none";
      colordot.style.top = 5 +"px";
    }
    else{
      dotposition+=level;
      colordot.style.top = dotposition +"px";
    }
  }
}
