import express from "express";
import passport from "passport";
import routes from "../routes";
import { onlyPublic, onlyPrivate } from "../middlewares";
import {
  postJoin,
  getJoin,
  logout,
  postLogin,
  getLogin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();
// post와 get방식의 차이를 잘 이해하고 사용하자.
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

// github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);

// facebook
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureRedirect: routes.login,
  }),
  postFacebookLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
