// babel을 설치하고 바뀐 임포트 형태 (파이썬과 같다.)
import express from "express";
import morgan from "morgan"; // logging기능을 갖는 미들웨어 접속 정보나 status~~등등
import helmet from "helmet"; // 보안 기능을 하는 미들웨어
import cookieParser from "cookie-parser"; // cookie의 유저정보를 저장 for handle session
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// middleware사용
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads/"));
app.use("/assets", express.static("assets/"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
