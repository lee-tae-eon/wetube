import express from "express";
import {
  postJoin,
  getJoin,
  logout,
  postLogin,
  getLogin,
} from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();
// post와 get방식의 차이를 잘 이해하고 사용하자.
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.join, getJoin);

globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.login, getLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

export default globalRouter;
