const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const screenPlay = document.querySelector("#jsScreenPlay");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolumeRange");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

//
function handleScreenClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    screenPlay.innerHTML = '<i class="fas fa-pause"></i>';
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    screenPlay.style.opacity = "0";
  } else {
    videoPlayer.pause();
    screenPlay.innerHTML = '<i class="fas fa-play"></i>';
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    screenPlay.style.color = "white";
    screenPlay.style.opacity = "0.6";
  }
}

// video play button event
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    screenPlay.innerHTML = '<i class="fas fa-pause"></i>';
    screenPlay.style.opacity = "0";
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    screenPlay.innerHTML = '<i class="fas fa-play"></i>';
    screenPlay.style.color = "white";
    screenPlay.style.opacity = "0.6";
  }
}
// play with space bar
// space bar prevent default function;
function removeWindowPreventKey(e) {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
  }
}
function handlePlayKeyUp(event) {
  const key = event.code;
  if (key === "Space") {
    handleScreenClick();
  }
}
function mouseLeaveVideo() {
  window.removeEventListener("keydown", removeWindowPreventKey);
  // eslint-disable-next-line no-use-before-define
  videoPlayer.removeEventListener("mouseover", mouseOnVideo);
  document.removeEventListener("keyup", handlePlayKeyUp);
  // eslint-disable-next-line no-use-before-define
  videoPlayer.addEventListener("mouseover", mouseOnVideo);
}

function mouseOnVideo() {
  window.addEventListener("keydown", removeWindowPreventKey);
  videoPlayer.addEventListener("mouseleave", mouseLeaveVideo);
  document.addEventListener("keyup", handlePlayKeyUp);
}

// video sound button event
function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

// video screen size button event
function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  // eslint-disable-next-line no-use-before-define
  fullScreenBtn.addEventListener("click", makeFullScreen);
  fullScreenBtn.removeEventListener("click", exitFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
function makeFullScreen() {
  // requestFullscreen?????? ??????????????? webkit????????? ??????. firefox??? ?????????.
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", makeFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
  const secondNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondNumber / 3600);
  let minutes = Math.floor((secondNumber - hours * 3600) / 60);
  let totalSeconds = secondNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};
function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  // setInterval(getCurrentTime, 1000);
  videoPlayer.addEventListener("timeupdate", getCurrentTime);
}

function handleVideoEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}
function handleVolumeDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  videoPlayer.addEventListener("click", handleScreenClick);
  videoPlayer.addEventListener("mouseover", mouseOnVideo);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", makeFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleVideoEnded);
  volumeRange.addEventListener("input", handleVolumeDrag);
}

if (videoContainer) {
  init();
}
