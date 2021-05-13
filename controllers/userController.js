import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// 그냥 화면에 뿌려줄 회원가입 페이지와 회원가입 정보 입력후 회원가입시 post할 컨트롤러 두개를 만든다.
//  request는 post된 정보를 담은 객체로 담아지고 만약 비밀번호1과 2가 일치하지 않으면 400번 http status code 400번을 뿌려주고 회원가입 화면을 다시 뿌려준다
// 제데로 이루어졌다면 유저정보를 db에 등록하고 유저 로그인이 이루어짐과 동시에 홈화면을 뿌려준다.
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      res.redirect(routes.home);
    }
    // todo : log user in
  }
};

// local
// get방식으로 화면만 뿌려줄 컨트롤러 하나와 post방식으로 로그인이 이루어지면 홈화면으로 전환시키는 컨트롤러 하나
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// GIT-HUB
// 깃헙 로그인 사용자 깃헙으로 보내기 -위의 사용자 정의 로그인 방식 처럼 github로그인 방식을 사용하자
export const githubLogin = passport.authenticate("github");

// githubStrategy callback 컨트롤러
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    // 깃헙 인증정보의 이메일과 db상에 같은 이메일이 있는지 확인하고(기존에 같은 이메일로 가입한 정보가 있는지 확인?)
    // 있으면 그 사용자를 업데이트 하고 없다면 새로운 유저를 생성해서 db에 저장해준다.
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
// 인증이 완료되고 정보를 가지고 돌아오고서 웹에 로그인하게 되는 컨트롤러
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// FACEBOOK
// facebook 로그인 사용자 facebook으로 보내기  깃헙과 비슷하다
export const facebookLogin = passport.authenticate("facebook");

// facebook Strategy callback controller
export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  console.log(accessToken, refreshToken, profile, cb);
};
// facebook 인증 완료후 웹 로그인 하는 컨트롤러
export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

// 현재 로그안된 사용자 프로필 페이지 컨트롤러
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "UserDetail", user: req.user });
};

// 프로필 페이지
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "UserDetail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });

// 로그아웃시 홈화면으로 redirect
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
