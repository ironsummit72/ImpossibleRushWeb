const gamesquare = document.getElementById("gamesquare");
const colordot = document.getElementById("colordot");
const info = document.getElementById("info");
const playpause=document.getElementById('playpause')
const darkmode=document.getElementById('darkmode')
const playsound=document.getElementById('playsound')
const currentscore=document.getElementById('currentscore')
const highiestscore=document.getElementById('highiestscore')
gamesquare.style.width="300px"
gamesquare.style.height="300px"
let fullpath=window.location.href;
let path=fullpath.substring(0,fullpath.lastIndexOf('/'))
let absolutepath=path+'/assets/images/game.png'
gamesquare.style.background=`url(${absolutepath}) no-repeat`
colordot.style.display="none";
playpause.style.display="none";
let isGameStarted=false;
let isGameOver=undefined;
let gameInterval=null;
let frameIntervalID = null;
let Score=0;
let HighiestScore=undefined;
let Difficulty=2
let gameData=undefined
let gameSpeeds={
  Countscoretime:1500,
  Gameintervaltime:1800,
  Playsoundime:1000,
  Dropspeed:0.8
}
const timeReducer = (Difficulty = 0) => {
  switch (Difficulty) {
    case 1:
      gameSpeeds.Countscoretime = 1000;
      gameSpeeds.Gameintervaltime = 1200;
      gameSpeeds.Playsoundime = 700;
      gameSpeeds.Dropspeed = 1.1;
      break;
    case 2:
      gameSpeeds.Countscoretime = 700;
      gameSpeeds.Gameintervaltime = 1000;
      gameSpeeds.Playsoundime = 500;
      gameSpeeds.Dropspeed = 1.2;
      break;
    case 3:
      gameSpeeds.Countscoretime = 600;
      gameSpeeds.Gameintervaltime = 1000;
      gameSpeeds.Playsoundime = 500;
      gameSpeeds.Dropspeed = 1.3;
      break;
    default:
      gameSpeeds.Countscoretime = 1500;
      gameSpeeds.Gameintervaltime = 1800;
      gameSpeeds.Playsoundime = 1000;
      gameSpeeds.Dropspeed = 1;
  }
};
gameData=getGameData()
const gamesounds = {
  gameover: `${path}/assets/sounds/gameover.mp3`,
  drop: `${path}/assets/sounds/drop.mp3`,
  isMuted: gameData.isMuted,
};
HighiestScore = gameData.HighiestScore;
highiestscore.innerHTML = `Highiest Score ${HighiestScore}`;
currentscore.innerHTML = `Score ${Score}`;
if (gamesounds.isMuted) {
  playsound.style.backgroundImage = `url(${path}/assets/icons/volumeoff.png`;
} else {
  playsound.style.backgroundImage = `url(${path}/assets/icons/volumeup.png`;
}
let darkMode = gameData.isDarkMode;
if (darkMode) {
  document.body.style.background = "#090743";
  document.body.style.color = "white";
} else {
  document.body.style.background = "white";
  document.body.style.color = "black";
}
  darkmode.addEventListener("click", () => {
    if (darkMode) {
      setGameDarkMode(false);
      document.body.style.background = "white";
      document.body.style.color = "black";
    } else {
      setGameDarkMode(true);
      document.body.style.background = "#090743";
      document.body.style.color = "white";
    }
  });
  
  
  
  let Btncount= Math.round(Math.random() * 3+1);
  rotateSquare(Btncount);
  
  gamesquare.addEventListener("click", () => {
    if (!isGameStarted) {
      startGame();
    } else {
      Btncount++;
      if (Btncount > 4) {
        Btncount = 1;
      }
      rotateSquare(Btncount);
    }
  });
  
  playsound.addEventListener("click", () => {
    if (gamesounds.isMuted) {
      setGameSound(false);
      gamesounds.isMuted = false;
      playsound.style.backgroundImage = `url(${path}/assets/icons/volumeup.png`;
    } else {
      setGameSound(true);
      gamesounds.isMuted = true;
      playsound.style.backgroundImage = `url(${path}/assets/icons/volumeoff.png`;
    }
  });


function countScore(Btncount, randomDots) {
  if (Btncount == randomDots) {
    Playsound(gamesounds.isMuted, gamesounds.drop);
    Score++;
    currentscore.innerHTML = `Score ${Score}`;
    if (Score >= HighiestScore) {
      HighiestScore = Score;
      setGameHighiestScoreData(HighiestScore);
      highiestscore.innerHTML = `Highiest Score ${HighiestScore}`;
    }
    if (Score < 6) {
      timeReducer(1);
    } else if (Score > 7) {
      timeReducer(2);
    } else if (Score > 10) {
      timeReducer(3);
    }
  } else {
    isGameOver = true;
    info.style.display = "block";
    info.innerHTML = "Game Over";
    playpause.style.display = "none";
    clearInterval(gameInterval);
    Playsound(gamesounds.isMuted, gamesounds.gameover);
  }
}
function startGame() {
  let randomDots = Math.round(Math.random() * 3 + 1);
  if (!isGameStarted) {
    info.style.display = "none";
    isGameStarted = true;
  } else {
    info.style.display = "block";
  }
  if (!isGameOver && isGameStarted) {
    playpause.style.display = "block";
    dropDot();
    gameInterval = setInterval(() => {
      randomDots = Math.round(Math.random() * 3 + 1);
      dropDot(randomDots);
      setTimeout(() => {
        countScore(Btncount, randomDots);
      }, gameSpeeds.Countscoretime);
    }, gameSpeeds.Gameintervaltime);
  }
}

function Playsound(ismuted, source) {
  setTimeout(()=>{
    const audio = document.getElementById("gameover");
    audio.muted = ismuted;
    audio.src = source;
    audio.play();
  },gameSpeeds.Playsoundime)
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

function dropDot(colorNumber) {
  colordot.style.display = "block";
  switch (colorNumber) {
    case 1:
      colordot.style.backgroundColor = "red";
      break;
    case 2:
      colordot.style.backgroundColor = "blue";
      break;
    case 3:
      colordot.style.backgroundColor = "#07f93d";
      break;
    case 4:
      colordot.style.backgroundColor = "yellow";
      break;
  }

  let dotposition = colordot.offsetTop;
  clearInterval(frameIntervalID);
  frameIntervalID = setInterval(frame, 10);
  function frame() {
    if (dotposition >= 65) {
      clearInterval(frameIntervalID);
      colordot.style.display = "none";
      colordot.style.top = 2 + "%";
    } else {
      dotposition += gameSpeeds.Dropspeed;
      colordot.style.top = dotposition + "%";
    }
  }
}

function setGameData() {
  let localObj = {
    HighiestScore: 0,
    isMuted: false,
    isDarkMode: false,
  };
  localStorage.setItem("ImpossibleRush", JSON.stringify(localObj));
}
function getGameData() {
  let localdata = localStorage.getItem("ImpossibleRush");
  if (localdata === null) {
    setGameData();
  } else {
    return JSON.parse(localdata);
  }
}
function setGameSound(sound = true) {
  let gameData = JSON.parse(localStorage.getItem("ImpossibleRush"));
  gameData.isMuted = sound;
  localStorage.setItem("ImpossibleRush", JSON.stringify(gameData));
}
function setGameHighiestScoreData(HighiestScore)
{
  let gameData = JSON.parse(localStorage.getItem("ImpossibleRush"));
  gameData.HighiestScore = HighiestScore;
  localStorage.setItem("ImpossibleRush", JSON.stringify(gameData));
}
function setGameDarkMode(dark=false)
{
  let gameData = JSON.parse(localStorage.getItem("ImpossibleRush"));
  gameData.isDarkMode = dark;
  localStorage.setItem("ImpossibleRush", JSON.stringify(gameData));
}