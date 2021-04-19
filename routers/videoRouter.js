import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  editVideo,
  upload,
  videoDetail,
  videos,
} from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.get(routes.home, videos); /* app.js에 이미 라우터 설정이 되었기에 삭제 */
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail, videoDetail);

export default videoRouter;
