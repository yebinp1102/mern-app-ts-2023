import mongoose from "mongoose";

export const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{timestamps: true})

const User = mongoose.model('User', UserSchema);
export default User;