import passport from "passport";
import User from "./models/User";

// createStrategy()는 이미 구성된 passport-local의 localStrategy를 생성
passport.use(User.createStrategy());

// serialize user.id
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
