// babel을 설치하고 바뀐 임포트 형태 (파이썬과 같다.)
import express from "express";
import morgan from "morgan"; // logging기능을 갖는 미들웨어 접속 정보나 status~~등등
import helmet from "helmet"; // 보안 기능을 하는 미들웨어
import cookieParser from "cookie-parser"; // cookie의 유저정보를 저장 for handle session
// import bodyParser from "body-parser"; //form 데이터를 서버로 받아와 활용 가능
// require는 node모듈을 어디선가 가져오는 것 이경우엔 express라는 폴더에서 가져온다
// 만약 못찾으면 node_modules 폴더에서 찾아온다.
// const express = require("express");
// 다음으로 어플리케이션을 만든다. 변수 app에 express를 실행해서 담는다.
const app = express();

const PORT = 4000;
// collback 함수
const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("hello people");

// es6의 const 변수 선언 ( 기존 함수 선언 방식과 기능이 같다 )
// => arrow function
const handleProfile = (req, res) => res.send("You are on my profile");

// middleware는 연결을 끊을 수 있다. send함수 사용시
// const middleware = (req, res, next) => {
//   res.send(`not happening`);
// }

// middleware사용
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

// route 설정.
app.get("/", handleHome);

app.get("/profile", handleProfile);

//  start명령을 줄때 마다 index.js를 실행 할 수 있도록
//  package.json에 scripts 엔트리를 만들어주고 start명령어를 작성해 준다.
// 터미널에서 npm start라고 치면 서버가 구동된다.
app.listen(PORT, handleListening);
