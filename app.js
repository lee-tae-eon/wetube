// babel을 설치하고 바뀐 임포트 형태 (파이썬과 같다.)
import express from "express";
import morgan from "morgan"; // logging기능을 갖는 미들웨어 접속 정보나 status~~등등
import helmet from "helmet"; // 보안 기능을 하는 미들웨어
import cookieParser from "cookie-parser"; // cookie의 유저정보를 저장 for handle session
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("hello people");

const handleProfile = (req, res) => res.send("You are on my profile");

// middleware사용
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

// route 설정.
app.get("/", handleHome);

app.get("/profile", handleProfile);
// use의 의미는 누군가 /user에 접속하면 userRouter를 전부 사용하겠다는 의미
// /user에 접속하면 userRouter의 root에 접속하게 되고 user index를 보여준다.
app.use("/user", userRouter);

export default app;
