import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  editVideo,
  getUpload,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos); /* app.js에 이미 라우터 설정이 되었기에 삭제 */
// upload도 마찬가지로 get과 post라우터로 구분해줬고 두방식으로 연결되는 라우터 설정을 해준다.
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
