import express from "express";
import routes from "../routes";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import {
  getChangePassword,
  getEditProfile,
  postChangePassword,
  postEditProfile,
  userDetail,
} from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get(routes.home, users);  /* app.js에 이미 라우터 설정이 되었기에 삭제 */
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
