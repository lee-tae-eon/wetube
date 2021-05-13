import passport from "passport";
import GithubStrategy from "passport-github";
import KakaotalkStrategy from "passport-kakao";
import {
  githubLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

// createStrategy()는 이미 구성된 passport-local의 localStrategy를 생성
passport.use(User.createStrategy());

// github Strategy생성
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// 카카오 startegy 생성

passport.use(
  new KakaotalkStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
