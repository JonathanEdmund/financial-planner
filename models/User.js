import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("user", userSchema);

export default User;
