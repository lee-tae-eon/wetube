import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos); /* app.js에 이미 라우터 설정이 되었기에 삭제 */
// upload도 마찬가지로 get과 post라우터로 구분해줬고 두방식으로 연결되는 라우터 설정을 해준다.
// 업로드
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
// 업데이트
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
// 삭제
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
// 상세페이지
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
