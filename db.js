import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/we-tube", {
  userNewUrlParser: true,
  userFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = (error) => console.log(`⛔️ ERR on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
