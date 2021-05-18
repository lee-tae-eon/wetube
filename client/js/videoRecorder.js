const recordContainer = document.querySelector("#jsRecordContainer");
const recordBtn = document.querySelector("#jsRecordBtn");
const videoPreview = document.querySelector("#jsVideoPreview");

let streamObject;
let videoRecorder;

// 녹화된 비디오 데이터를 다운로드 할 함수
const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  // fake click
  link.click();
};
// 화면 끝내는 함수.
const stopStreamVideo = (videoElem) => {
  const streamed = videoElem.srcObject;
  const tracks = streamed.getTracks();

  tracks.forEach((track) => track.stop());
};
// 레코딩 끝내는 함수
const stopRecording = () => {
  videoRecorder.stop();
  stopStreamVideo(videoPreview);
  recordBtn.removeEventListener("click", stopRecording);
  // eslint-disable-next-line no-use-before-define
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};
// 레코딩 시작 함수
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};
// 웹캠 불러오는 함수
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    // video 는 not file  is Object
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    console.log(error);
    recordBtn.innerHTML = "😩 Can't Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
