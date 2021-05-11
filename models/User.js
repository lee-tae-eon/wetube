import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  //소셜 계정 스키마
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
