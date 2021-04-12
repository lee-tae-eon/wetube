// render함수의 첫번째 인자는 template이고 두번째인자는 template에 추가할 정보가 담긴 객체
export const home = (req, res) => res.render("home", { pageTitle: "home" });

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy });
};

export const videos = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "VideoDetail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "EditVideo" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "DeleteVideo" });
