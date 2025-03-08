import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../auth/generateToken.js";
import getUserInfo from "../util/getUserInfo.js";
import Token from "./Token.js";
const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  wordsCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Word" }], // Palabras adivinadas
  createdAt: { type: Date, default: Date.now },
});
userShema.pre("save", function (next) {
  const document = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  }
});
userShema.methods.commparePassword = async (password, hash) => {
  const same = await bcrypt.compare(password, hash);
  return same;
};

userShema.statics.exists = async function (username, email) {
  return (
    (await this.model("User").findOne({ $or: [{ email }, { username }] })) !==
    null
  );
};
userShema.methods.createAccessToken = (user) => {
  return generateAccessToken(getUserInfo(user));
};
userShema.methods.createRefreshToken = async (user) => {
  const refreshToken = generateRefreshToken(getUserInfo(user));
  try{
    await new Token({token: refreshToken}).save();
    return refreshToken
  }
  catch(error){
    console.log(error)
    next();
  }
};
export default mongoose.model("User", userShema);
