import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide an Password"],
    unique: true,
  },
  photo: {
    type: String,
    required: [true, "Please Provide a Profile Picture"],
  },
  role: {
    type: String,
    required: [true, "Please Provide a role"],
  },
});

delete mongoose.models.users;
const User = mongoose.model("users", userSchema);

export default User;
