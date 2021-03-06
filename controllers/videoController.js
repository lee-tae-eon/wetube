import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

const fs = require("fs");

// home controller--------------------------------------------------------
// render함수의 첫번째 인자는 template이고 두번째인자는 template에 추가할 정보가 담긴 객체
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "home", videos: [] });
  }
};

// search controller--------------------------------------------------------
export const search = async (req, res) => {
  // local변수를 렌더링하여 템플릿에 사용하도록 하자
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }

  // const videos = await Video.find({});
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// video upload controller--------------------------------------------------------
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });

  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// video detail controller--------------------------------------------------------
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    // populate() - 객체를 가지고 오는 함수, Object Id타입에만 쓸 수 있다.
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// video edit controller--------------------------------------------------------
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    // await Video.findOneAndUpdate({ $set: { id, title, description } });
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// video delete controller--------------------------------------------------------
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const filePath = await Video.findOne(
    { _id: id },
    { _id: false, fileUrl: true }
  );
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await User.findOneAndUpdate({ videos: id }, { $pull: { videos: id } });
      await Video.findOneAndRemove({ _id: id });
      await fs.unlink(filePath.fileUrl, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

// Register video view
export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404);
  }
  video.views += 1;
  await video.save();
  return res.status(200);
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  const video = await Video.findById(id).populate("creator");

  if (!video) {
    return res.sendStatus(404);
  }
  const newComment = await Comment.create({
    text: comment,
    creator: user.name,
  });
  video.comments.push(newComment);
  video.save();
  console.log(newComment.createAt.toLocaleString());
  return res.status(200).json({
    commentAuthor: user.name,
    commentDate: newComment.createAt.toLocaleString(),
  });
};
