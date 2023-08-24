import mongoose from "mongoose";

const GoalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  }
},{timestamps: true})

const Goal = mongoose.model("Goal", GoalSchema);
export default Goal