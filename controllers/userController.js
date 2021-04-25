import routes from "../routes";

// 그냥 화면에 뿌려줄 회원가입 페이지와 회원가입 정보 입력후 회원가입시 post할 컨트롤러 두개를 만든다.
//  request는 post된 정보를 담은 객체로 담아지고 만약 비밀번호1과 2가 일치하지 않으면 400번 http status code 400번을 뿌려주고 회원가입 화면을 다시 뿌려준다
// 제데로 이루어졌다면 유저정보를 db에 등록하고 유저 로그인이 이루어짐과 동시에 홈화면을 뿌려준다.
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // todo : register user
    // todo : log user in
    res.redirect(routes.home);
  }
};
// get방식으로 화면만 뿌려줄 컨트롤러 하나와 post방식으로 로그인이 이루어지면 홈화면으로 전환시키는 컨트롤러 하나
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};
// 로그아웃시 홈화면으로 redirect
export const logout = (req, res) => {
  // todo: log out process
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "UserDetail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });
