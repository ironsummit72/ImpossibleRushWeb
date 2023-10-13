const gamesquare = document.getElementById("gamesquare");
const colordot = document.getElementById("colordot");
const info = document.getElementById("info");
gamesquare.style.width="300px"
gamesquare.style.height="300px"
gamesquare.style.background="url('../assets/images/game.png') no-repeat"
let isGameStarted=false;
let isGameOver=undefined;
let gameInterval=null;
let frameIntervalID = null;
let Score=0;
let HighiestScore=undefined;
let Difficulty=2
colordot.style.display="none";
const gamesounds = {
  gameover: "../assets/sounds/gameover.mp3",
  drop: "../assets/sounds/drop.mp3",
  isMuted: false,
};
let Btncount= Math.round(Math.random() * 3+1);
rotateSquare(Btncount);

gamesquare.addEventListener("click", () => {
  if (!isGameStarted){
    startGame();
  }else{
    Btncount++;
    if (Btncount > 4) {
      Btncount = 1;
    }
    rotateSquare(Btncount);
  }


});
function startGame() {
  let randomDots = Math.round(Math.random() * 3 + 1);
  if (!isGameStarted) {
    info.style.display = "none";
    isGameStarted = true;
  } else {
    info.style.display = "block";
  }
  if (!isGameOver) {
    dropDot();
    gameInterval = setInterval(() => {
      randomDots = Math.round(Math.random() * 3 + 1);
      Playsound(gamesounds.isMuted,gamesounds.drop)
      dropDot(randomDots, Difficulty);
      setTimeout(() => {
        countScore(Btncount, randomDots);
      }, 1500);
    }, 1800);
  }
}
function countScore(Btncount,randomDots)
{
  if (Btncount == randomDots) {
    Score++;
  } else {
    isGameOver = true;
    info.style.display = "block";
    info.innerHTML = "Game Over";
    clearInterval(gameInterval);
    Playsound(gamesounds.isMuted,gamesounds.gameover)
  }
}

function Playsound(ismuted, source) {
setTimeout(()=>{
  const audio = document.getElementById("gameover");
  audio.muted = ismuted;
  audio.src = source;
  audio.play();
},1000)
}
function rotateSquare(rotatevalue) {
  switch (rotatevalue) {
    case 1:
      gamesquare.style.transform = `rotate(${0}deg)`;
      gamesquare.className = `gamesquare`;
      info.style.transform = `translateX(0%) translateY(0%) rotate(0deg)`;
      break;
    case 2:
      gamesquare.style.transform = `rotate(${90}deg)`;
      gamesquare.className = `gamesquare-b`;
      info.style.transform = `translateX(0%) translateY(100%) rotate(270deg)`;
      break;
    case 3:
      gamesquare.style.transform = `rotate(${180}deg)`;
      gamesquare.className = `gamesquare-g`;
      info.style.transform = `translateX(-34%) translateY(500%) rotate(180deg)`;
      break;
    case 4:
      gamesquare.style.transform = `rotate(${270}deg)`;
      gamesquare.className = `gamesquare-y`;
      info.style.transform = `translateX(0%) translateY(870%) rotate(90deg)`;
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
  
  let dotposition = colordot.offsetTop;
  clearInterval(frameIntervalID);
  frameIntervalID = setInterval(frame, );
  function frame() {
    if (dotposition>= 450) {
      clearInterval(frameIntervalID)
      colordot.style.display="none";
      colordot.style.top = 5 +"px";
    }
    else{
      
      dotposition+=level;
      colordot.style.top = dotposition +"px";
    }
  }
}
